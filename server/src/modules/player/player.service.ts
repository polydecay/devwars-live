import { Player } from './player.model';
import { CreatePlayerDto } from './dto/createPlayer.dto';
import { PatchPlayerDto } from './dto/patchPlayer.dto';

class PlayerService {
    async create(createDto: CreatePlayerDto): Promise<Player> {
        const player = new Player();
        player.id = createDto.id;
        player.username = createDto.username;
        player.role = createDto.role;
        player.avatarUrl = createDto.avatarUrl ?? null;

        player.game = 1 as any;
        player.teamId = createDto.teamId;

        return player.save();
    }

    async getById(id: number): Promise<Player> {
        return Player.findOneOrFail(id);
    }

    async patch(id: number, patchDto: PatchPlayerDto): Promise<Player> {
        const player = await this.getById(id);
        Object.assign(player, patchDto);
        return player.save();
    }

    async delete(id: number): Promise<Player> {
        const player = await this.getById(id);
        return player.remove();
    }
}

export default new PlayerService();
