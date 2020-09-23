import { Vote } from './vote.model';
import wsService from '../ws/ws.service';

interface TeamVoteResult {
    teamId: number;
    category: 'design' | 'function';

    total: number;
    votes: number;
    score: number;
}

class VoteService {
    async createOrUpdate(createDto: any): Promise<Vote> {
        let vote = await Vote.findOne({ where: {
            category: createDto.category,
            twitchId: createDto.twitchId,
        }});

        // Only update if the vote actually changed.
        if (vote && vote.teamId === createDto.teamId) {
            return vote;
        }

        if (!vote) {
            vote = new Vote();
            vote.game = 1 as any;
        }

        Object.assign(vote, createDto);

        const result = await vote.save();
        wsService.broadcastVote(result);
        return result;
    }

    async getAll(): Promise<Vote[]> {
        return Vote.find();
    }

    async deleteAll(): Promise<void> {
        await Vote.delete({});
    }

    async getTeamResults(): Promise<TeamVoteResult[]> {
        const results: TeamVoteResult[] = await Vote.query(`
            SELECT
                teamId,
                category,
                COUNT(*) AS votes,
                (SELECT COUNT(*) FROM vote WHERE category = V.category) AS total
            FROM vote V
            GROUP BY teamId, category
        `);

        function scoreFromPercent(percent: number): number {
            if (percent > 80) return 3;
            else if (percent > 65) return 2;
            else if (percent > 50) return 1;
            return 0;
        }

        for (const result of results) {
            result.score = scoreFromPercent(result.votes / result.total * 100);
        }

        return results;
    }
}

export default new VoteService();
