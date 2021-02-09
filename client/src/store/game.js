import isEqual from 'lodash/isEqual';

const initialState = {
    id: null,
    mode: '',
    title: '',

    stages: [],
    stageIndex: 0,
    stageEndAt: null,

    runtime: 0,
    objectives: [],

    teams: [],
    editors: [],
    players: [],

    teamVoteResults: [],

    applications: [],
};

const state = { ...initialState };

const getters = {
    isActive(state) {
        return state.id !== null;
    },

    stage(state) {
        return state.stages[state.stageIndex];
    },

    blueTeam(state) {
        return state.teams.find(team => team.id === 1);
    },

    redTeam(state) {
        return state.teams.find(team => team.id === 2);
    },

    winningTeams(state, getters) {
        let highScore = 0;
        let winningTeams = [];

        for (const team of state.teams) {
            const score = getters['teamScoreById'](team.id);

            if (score >= highScore) {
                if (score > highScore) winningTeams = [];

                highScore = score;
                winningTeams.push(team);
            }
        }

        return winningTeams;
    },

    objectivesWithTeamState(state) {
        return state.objectives.map((objective) => {
            const withState = { ...objective };
            for (const team of state.teams) {
                withState[team.name] = team.completeObjectives.includes(objective.id);
            }

            return withState;
        });
    },

    teamById(state) {
        return (id) => state.teams.find(x => x.id === id);
    },

    teamScoreById(state) {
        return (id) => {
            const { objectiveScore } = state.teams.find(x => x.id === id);
            const voteScore = state.teamVoteResults.reduce((total, result) => {
                return result.teamId === id ? total + result.score : total;
            }, 0);

           return objectiveScore + voteScore;
        };
    },

    editorById(state) {
        return (id) => state.editors.find(x => x.id === id);
    },

    playerById(state) {
        return (id) => state.players.find(x => x.id === id);
    },

    editorsByTeam(state) {
        return (id) => state.editors
            .filter(e => e.teamId === id)
            .sort((a, b) => a.id - b.id);
    },

    editorsByUser(state) {
        return (id) => state.editors
            .filter(e => e.playerId === id)
            .sort((a, b) => a.id - b.id);
    },

    voteCategories(state) {
        return state.stages.reduce((categories, stage) => {
            if (stage.type === 'vote') {
                categories.push(stage.meta.category);
            }

            return categories;
        }, []);
    },

    voteResultByTeamAndCategory(state) {
        return (id, category) => state.teamVoteResults.find((result) => {
            return result.teamId === id && result.category === category;
        });
    },
};

const mutations = {
    SET_STATE(state, game) {
        game = game ?? initialState;
        for (const [key, value] of Object.entries(game)) {
            if (!isEqual(state[key], value)) state[key] = value;
        };
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
};
