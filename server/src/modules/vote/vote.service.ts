import { Vote } from './vote.model';

interface TeamVoteResult {
    teamId: number;
    category: string;

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

        // Skip update if the vote didn't change.
        if (vote && vote.teamId === createDto.teamId) {
            return vote;
        }

        if (!vote) {
            vote = new Vote();
            vote.game = 1 as any;
        }

        Object.assign(vote, createDto);
        return await vote.save();
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
            if (percent >= 80) return 2;
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
