<template>
    <div class="GameHeaderStatus">
        <div class="score blue">
            Score <strong>{{ blueTeamScore }}</strong>
        </div>
        <h1>
            <CountdownTimer v-if="stageEndAt" :endAt="stageEndAt" :warnAt="60000"/>
            <span v-else>-- : --</span>
        </h1>
        <div class="score red">
            <strong>{{ redTeamScore }}</strong> Score
        </div>
    </div>
</template>


<script>
import { mapState, mapGetters } from 'vuex';
import CountdownTimer from './CountdownTimer';

export default {
    components: { CountdownTimer },

    computed: {
        ...mapState('game', ['stageEndAt']),
        ...mapGetters('game', ['blueTeam', 'redTeam']),

        blueTeamScore() {
            return this.$store.getters['game/teamScoreById'](this.blueTeam.id);
        },

        redTeamScore() {
            return this.$store.getters['game/teamScoreById'](this.redTeam.id);
        },
    },
};
</script>


<style lang="scss" scoped>
.GameHeaderStatus {
    display: flex;
    align-items: baseline;

    h1 {
        margin: 0 2rem;
        line-height: 1;
        font-size: 2.5rem;
        font-weight: 300;
    }

    .score {
        font-size: 1rem;
        text-transform: uppercase;

        strong {
            margin: 0 0.25rem;
            line-height: 1;
            font-size: 2rem;
            font-weight: 400;
        }

        &.blue { color: var(--blue); }
        &.red { color: var(--red); }
    }
}
</style>
