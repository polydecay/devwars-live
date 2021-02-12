<template>
    <div class="GameSidebarVoteBar">
        <span class="score blue">{{ blueResult.score }}</span>

        <div class="voteBar">
            <div class="barContainer blue" :style="{ width: barValue + '%' }">
                <div class="bar" :class="{ active: redResult.score < blueResult.score }"></div>
            </div>
            <div class="barContainer red" :style="{ width: (100 - barValue) + '%' }">
                <div class="bar" :class="{ active: redResult.score > blueResult.score }"></div>
            </div>
            <div class="divider" style="left: 20%"></div>
            <div class="divider" style="left: 50%"></div>
            <div class="divider" style="left: 80%"></div>
        </div>

        <span class="score red">{{ redResult.score }}</span>
    </div>
</template>


<script>
export default {
    props: {
        category: { type: String, required: true },
    },

    computed: {
        blueResult() {
            return this.$store.getters['game/voteResultByTeamAndCategory'](1, this.category) ?? { votes: 0, score: 0 };
        },

        redResult() {
            return this.$store.getters['game/voteResultByTeamAndCategory'](2, this.category) ?? { votes: 0, score: 0 };
        },

        barValue() {
            const total = this.blueResult.votes + this.redResult.votes;
            if (total <= 0) return 50;

            return (this.blueResult.votes / total) * 100;
        },
    },
};
</script>


<style lang="scss" scoped>
.GameSidebarVoteBar {
    display: flex;
    align-items: center;

    .blue { color: var(--blue); }
    .red { color: var(--red); }

    .score {
        font-size: 1.5rem;
    }

    .voteBar {
        position: relative;
        display: flex;
        margin: 0 1rem;
        width: 100%;
        height: 2.75rem;
        align-items: center;
        justify-content: space-between;

        transform: skew(-24deg);

        .barContainer {
            display: flex;
            height: 100%;
            align-items: center;
            overflow: hidden;

            transition: width 250ms ease-out;

            .bar {
                width: 100%;
                height: 1rem;
                background-color: currentColor;

                &.active {
                    box-shadow: 0 0 0.75rem 2px currentColor;
                }
            }
        }

        .divider {
            position: absolute;
            top: 0;
            z-index: 3;
            width: 2px;
            height: 100%;
            background-color: var(--bg10);
            opacity: 0.75;
        }
    }
}
</style>
