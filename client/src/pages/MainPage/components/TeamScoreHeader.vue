<template>
    <div class="TeamScoreHeader" :class="{ flip }">
        <div class="title">
            <h3 class="status" :class="{ winner, tie }">
                <span v-if="tie">Tie</span>
                <span v-else-if="winner">Victory</span>
                <span v-else>Defeat</span>
            </h3>
            <h2 class="teamName" :class="team.name">{{ team.name }} Team</h2>
        </div>
        <h1 class="score">{{ score }}</h1>
    </div>
</template>


<script>
export default {
    props: {
        team: { type: Object, required: true },
        winner: { type: Boolean, required: true },
        tie: { type: Boolean, required: true },
        flip: { type: Boolean, default: false },
    },

    computed: {
        score() {
            return this.$store.getters['game/teamScoreById'](this.team.id);
        },
    },
};
</script>


<style lang="scss" scoped>
.TeamScoreHeader {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: right;

    &.flip {
        text-align: left;
        .title { order: 1; }
    }

    .title {
        text-transform: uppercase;

        .status {
            line-height: 1.5;
            font-size: 1.25rem;
            &.winner { color: #4bff9e; }
            &.tie { color: var(--fg00); }
        }

        .teamName {
            font-size: 2rem;

            &.blue { color: var(--blue); }
            &.red { color: var(--red); }
        }
    }

    .score {
        margin: 0 1.5rem;
        line-height: 1;
        font-size: 4.5rem;
    }
}
</style>
