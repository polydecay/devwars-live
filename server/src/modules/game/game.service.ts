import { Game } from './game.model';
import { Team } from '../team/team.model';
import { CreateGameDto } from './dto/createGame.dto';
import { PatchGameDto } from './dto/patchGame.dto';
import { Editor } from '../editor/editor.model';
import editorService from '../editor/editor.service';
import voteService from '../vote/vote.service';

// TODO: Move this somewhere else.
const stages = ['setup', 'active', 'reviewDesign', 'voteDesign', 'reviewFunction', 'voteFunction', 'end'];

class GameService {
    async getGame(): Promise<Game> {
        return await Game.findOneOrFail(1);
    }

    async getGameWithRelations(): Promise<Game>  {
        const game = await Game.findOneOrFail(1, { relations: ['teams', 'editors', 'players'] });
        game.editors.forEach((editor: any) => {
            delete editor.template;
            delete editor.fileText;
        });

        (game as any).teamVoteResults = await voteService.getTeamResults();

        return game;
    }

    async create(createDto: CreateGameDto): Promise<Game> {
        const game = new Game();
        game.id = 1;
        game.mode = createDto.mode;
        game.title = createDto.title;
        game.stage = 'setup';
        game.objectives = createDto.objectives ?? [];
        game.runtime = createDto.runtime;

        const createTeam = (id: number, name: string): Team => {
            const team = new Team();
            team.id = id;
            team.name = name;
            team.completeObjectives = [];
            return team;
        }

        const createEditor = (
            id: number,
            teamId: number,
            language: string,
            fileName: string,
            template: string = '',
        ): Editor => {
            const editor = new Editor();
            editor.id = id;
            editor.teamId = teamId;
            editor.language = language;
            editor.fileName = fileName;
            editor.template = template;
            editor.fileText = template;
            return editor;
        }

        const htmlTemplate = [
            '<!DOCTYPE html>',
            '<html>',
            '<head>',
            '    <meta charset="utf-8">',
            '    <meta name="viewport" content="width=device-width, initial-scale=1.0">',
            '    <link rel="stylesheet" href="game.css">',
            '</head>',
            '<body>',
            '    <script src="game.js"></script>',
            '</body>',
            '</html>',
        ].join('\n');

        if (game.mode === 'classic') {
            game.teams = [
                createTeam(1, 'blue'),
                createTeam(2, 'red'),
            ];

            game.editors = [
                createEditor(1, 1, 'html', 'index.html', htmlTemplate),
                createEditor(2, 1, 'css', 'game.css'),
                createEditor(3, 1, 'js', 'game.js'),
                createEditor(4, 2, 'html', 'index.html', htmlTemplate),
                createEditor(5, 2, 'css', 'game.css'),
                createEditor(6, 2, 'js', 'game.js'),
            ];
        }

        await game.save();
        return this.getGameWithRelations();
    }

    async patch(patchDto: PatchGameDto): Promise<Game> {
        const game = await this.getGame();
        Object.assign(game, patchDto);
        return game.save();
    }

    async delete(): Promise<any> {
        const game = await this.getGame();
        return await game.remove();
    }

    async nextStage(): Promise<Game> {
        let game = await this.getGame();

        const stage = game.stage;
        const newStage = stages[stages.indexOf(stage) + 1];
        if (!newStage) return game;

        game.stage = newStage;
        game = await this.afterStageChange(game, stage, newStage);
        await game.save();

        return this.getGame();
    }

    async prevStage(): Promise<Game> {
        let game = await this.getGame();

        const stage = game.stage;
        const newStage = stages[stages.indexOf(stage) - 1];
        if (!newStage) return game;

        game.stage = newStage;
        game = await this.afterStageChange(game, stage, newStage);
        await game.save();

        return this.getGame();
    }

    private async afterStageChange(game: Game, prevStage: string, stage: string): Promise<Game> {
        game.stageEndAt = null;

        if (prevStage === 'setup' && stage === 'active') {
            game.stageEndAt = Date.now() + game.runtime;
            await editorService.unlockAll();
        }

        if (prevStage === 'active') {
            await editorService.lockAll();
        }

        return game;
    }
}

export default new GameService();
