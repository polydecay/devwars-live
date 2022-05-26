import { Team } from './team.model';
import { PatchTeamDto } from './dto/patchTeam.dto';
import gameService from '../game/game.service';

class TeamService {
    async getById(id: number): Promise<Team> {
        return Team.findOneByOrFail({ id });
    }

    async patch(id: number, patchDto: PatchTeamDto): Promise<Team> {
        const team = await this.getById(id);
        Object.assign(team, patchDto);
        await team.save();
        await this.updateObjectiveScoreById(team.id);

        return this.getById(team.id);
    }

    async delete(id: number): Promise<Team> {
        const team = await this.getById(id);
        return team.remove();
    }

    private async updateObjectiveScoreById(id: number) {
        const game = await gameService.getGame();
        const team = await this.getById(id);

        const completeObjectives = game.objectives.filter((objective) => {
            return team.completeObjectives.some(id => id === objective.id);
        });

        team.objectiveScore = 0;
        for (const objective of completeObjectives) {
            team.objectiveScore += objective.bonus ? 2 : 1;
        }

        return Team.save(team);
    }
}

export default new TeamService();
