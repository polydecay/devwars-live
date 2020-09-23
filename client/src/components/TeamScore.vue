<template>
    <div class="TeamScore" :class="[team.name, { winner, tie }]">
        <TeamScoreHeader :team="team" :winner="winner" :tie="tie" :flip="flip"/>
        <TeamSlotList :team="team" :flip="flip"/>
        <TeamScoreObjectives :team="team"/>
        <TeamScoreVotes :team="team" category="design" :flip="flip"/>
        <TeamScoreVotes :team="team" category="function" :flip="flip"/>
    </div>
</template>


<script>
import { mapState, mapGetters } from 'vuex';
import TeamSlotList from '../pages/MainPage/components/TeamSlotList';
import TeamScoreHeader from './TeamScoreHeader';
import TeamScoreObjectives from './TeamScoreObjectives';
import TeamScoreVotes from './TeamScoreVotes';

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
        ...mapGetters('game', ['winningTeams']),

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
            background: linear-gradient(to top, rgba(#00c9ff, 0.2), transparent);
        }

        &.red:before {
            background: linear-gradient(to top, rgba(#ff007d, 0.2), transparent);
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
