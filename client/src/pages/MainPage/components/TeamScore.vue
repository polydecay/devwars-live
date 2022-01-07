<template>
    <div class="TeamScore" :class="[team.name, { winner, tie }]">
        <TeamScoreHeader :team="team" :winner="winner" :tie="tie" :flip="flip"/>
        <TeamSlotList :team="team" :flip="flip"/>
        <TeamScoreObjectives :team="team"/>
        <TeamScoreVotes
            v-for="category in voteCategories"
            :key="category"
            :category="category"
            :team="team"
            :flip="flip"
        />
    </div>
</template>


<script>
import { mapGetters } from 'vuex';
import TeamSlotList from './TeamSlotList.vue';
import TeamScoreHeader from './TeamScoreHeader.vue';
import TeamScoreObjectives from './TeamScoreObjectives.vue';
import TeamScoreVotes from './TeamScoreVotes.vue';

export default {
    components: {
        TeamSlotList,
        TeamScoreHeader,
        TeamScoreObjectives,
        TeamScoreVotes,
    },

    props: {
        team: { type: Object, required: true },
        flip: { type: Boolean, default: false },
    },

    computed: {
        ...mapGetters('game', ['winningTeams', 'voteCategories']),

        winner() {
            return this.winningTeams.some(t => t.id === this.team.id);
        },

        tie() {
            return Boolean(this.winner && this.winningTeams.length >= 2);
        },
    },
};
</script>


<style lang="scss" scoped>
.TeamScore {
    position: relative;
    display: flex;
    flex-flow: column nowrap;

    &.winner {
        $padding: 2rem;

        &:before {
            z-index: 10;
            content: '';
            position: absolute;
            top: 0;
            left: -$padding;
            width: calc(100% + #{$padding * 2});
            height: 100%;
            pointer-events: none;
        }

        &.blue:before {
            opacity: 0.2;
            background: linear-gradient(to top, var(--blue), transparent);
        }

        &.red:before {
            opacity: 0.2;
            background: linear-gradient(to top, var(--red), transparent);
        }
    }

    .TeamScoreHeader {
        margin-bottom: 2rem;
    }

    .TeamSlotList {
        margin-bottom: 3rem;
    }

    .TeamScoreObjectives {
        margin-bottom: 2rem;
    }

    .TeamScoreVotes {
        margin-bottom: 2rem;
    }
}
</style>
