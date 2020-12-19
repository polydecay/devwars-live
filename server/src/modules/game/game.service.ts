import { Game, Stage } from './game.model';
import createGame from './createGame';
import { CreateGameDto } from './dto/createGame.dto';
import { PatchGameDto } from './dto/patchGame.dto';
import editorService from '../editor/editor.service';
import voteService from '../vote/vote.service';

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
        const game = await createGame(createDto);
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
        return this.setStage(game.stageIndex + 1);
    }

    async prevStage(): Promise<Game> {
        let game = await this.getGame();
        return this.setStage(game.stageIndex - 1);
    }

    private async setStage(index: number): Promise<Game> {
        const game = await this.getGame();

        const stage = game.stages[index];
        if (!stage) return game;

        game.stageIndex = index;
        game.stageEndAt = null;

        if (stage.meta?.runtime) {
            game.stageEndAt = Date.now() + stage.meta.runtime;
        }

        if (stage.meta?.lockEditors) {
            await editorService.lockAll();
        } else if (stage.meta?.unlockEditors) {
            await editorService.unlockAll();
        }

        return game.save();
    }
}

export default new GameService();
