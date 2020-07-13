import { Game } from './game.model';
import { Team } from '../team/team.model';
import { CreateGameDto } from './dto/createGame.dto';
import { PatchGameDto } from './dto/patchGame.dto';
import { Editor } from '../editor/editor.model';
import editorService from '../editor/editor.service';

const stages = ['setup', 'active', 'review', 'vote', 'end'];

class GameService {
    async getGame(): Promise<Game> {
        const game = await Game.findOneOrFail(1, { relations: ['teams', 'editors', 'players'] });
        game.editors.forEach(editor => {
            delete editor.template;
            delete editor.fileText;
        });

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

        return game.save();
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

    async nextStage() {
        const game = await this.getGame();

        const stage = game.stage;
        const newStage = stages[stages.indexOf(stage) + 1];
        if (!newStage) return game;

        game.stage = newStage;
        await game.save();
        this.afterStageChange(stage, newStage);

        return game;
    }

    async prevStage() {
        const game = await this.getGame();

        const stage = game.stage;
        const newStage = stages[stages.indexOf(stage) - 1];
        if (!newStage) return game;

        game.stage = newStage;
        await game.save();
        this.afterStageChange(stage, newStage);

        return game;
    }

    private async afterStageChange(prevStage: string, stage: string) {
        if (prevStage === 'setup' && stage === 'active') {
            await editorService.unlockAll();
        }

        if (prevStage === 'active') {
            await editorService.lockAll();
        }
    }
}

export default new GameService();
