import { Team } from './team.model';
import { PatchTeamDto } from './dto/patchTeam.dto';

class TeamService {
    async getById(id: number): Promise<Team> {
        return Team.findOneOrFail(id);
    }

    async patch(id: number, patchDto: PatchTeamDto): Promise<Team> {
        const team = await this.getById(id);
        Object.assign(team, patchDto);
        return team.save();
    }

    async delete(id: number): Promise<any> {
        const team = await this.getById(id);
        return team.remove();
    }
}

export default new TeamService();
