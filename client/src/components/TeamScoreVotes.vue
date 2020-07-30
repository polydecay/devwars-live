<template>
    <div class="TeamScoreVotes">
        <h1>{{ category }}</h1>
        <div class="main" :class="[team.name, { flip }]">
            <div class="score">0</div>
            <ProgressBar :value="50" :flip="flip"/>
            <div class="percent">50%</div>
        </div>
    </div>
</template>


<script>
import ProgressBar from './ProgressBar';
export default {
    components: { ProgressBar },

    props: {
        team: { type: Object, required: true },
        category: { type: String, required: true },
        flip: { type: Boolean, default: false },
    },
};
</script>


<style lang="scss" scoped>
.TeamScoreVotes {
    h1 {
        margin-bottom: .5rem;
        text-align: center;
        text-transform: uppercase;
        font-size: 1.5rem;
    }

    .main {
        display: flex;
        align-items: center;

        &.blue { color: var(--blue); }
        &.red { color: var(--red); }

        &.flip {
            .score { order: 1; }
            .percent { order: -1; }
        }

        .score {
            line-height: 1;
            font-size: 2rem;
        }

        .percent {
            font-size: 1.25rem;
            color: var(--fg00);
        }

        .ProgressBar {
            margin: 0 2rem;
        }
    }
}
</style>
