import { Game } from './game.model';
import { Team } from '../team/team.model';
import { CreateGameDto } from './dto/createGame.dto';
import { PatchGameDto } from './dto/patchGame.dto';
import { Editor } from '../editor/editor.model';

class GameService {
    async getGame(): Promise<Game> {
        return Game.findOneOrFail(1, { relations: ['teams', 'editors', 'players'] });
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

        if (game.mode === 'classic') {
            game.teams = [
                createTeam(1, 'blue'),
                createTeam(2, 'red'),
            ];

            game.editors = [
                createEditor(1, 1, 'html', 'index.html', '<h1>Title</h1>'),
                createEditor(2, 1, 'css', 'game.css'),
                createEditor(3, 1, 'js', 'game.js'),
                createEditor(4, 2, 'html', 'index.html', '<h1>Title</h1>'),
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
        game.stage += '+';
        return game.save();
    }

    async prevStage() {
        const game = await this.getGame();
        game.stage += '-';
        return game.save();
    }
}

export default new GameService();
