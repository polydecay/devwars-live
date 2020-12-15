import { Game } from './game.model';
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

        const stage = game.stage;
        const stages = game.stages;
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
        const stages = game.stages;
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

        if (stage.startsWith('vote')) {
            game.stageEndAt = Date.now() + (3 * 60 * 1000);
        }

        if (prevStage === 'active') {
            await editorService.lockAll();
        }

        return game;
    }
}

export default new GameService();
