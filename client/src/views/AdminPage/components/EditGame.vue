<template>
    <div class="EditGame">
        <header>
            <h1>{{ mode.toUpperCase() }} {{ title }}</h1>
            <button style="background: var(--error)" @click="onDestroy">Destroy</button>
        </header>
        <main>
            <div class="stageControls">
                <h2>Stage: <span class="stage">{{ stage }}</span></h2>
                <div class="actions">
                    <button @click="onPrevStage">Previous</button>
                    <button @click="onNextStage">Next</button>
                </div>
            </div>
        </main>
    </div>
</template>


<script>
import { mapState } from 'vuex';
import * as api from '../../../api';

export default {
    computed: {
        ...mapState('game', ['mode', 'title', 'stage', 'objectives']),
    },

    methods: {
        async onDestroy() {
            await api.destroyGame();
            // const res = await fetch('/game', { method: 'DELETE' });
        },
        async onPrevStage() {
            await api.gamePrevStage();
            // this.$ws.send('game.prevStage');
        },
        async onNextStage() {
            await api.gameNextStage();
            // this.$ws.send('game.nextStage');
        },
    },
};
</script>


<style lang="scss" scoped>
.EditGame {
    margin: 1rem;
    background-color: var(--bg10);

    header {
        padding: 0 1rem;
        background-color: var(--bg20);
        align-items: center;
        height: 4rem;
        display: flex;
        h1 {
            margin-right: auto;
        }
    }

    main {
        padding: .5rem;
    }

    .stageControls {
        display: flex;
        width: 15rem;
        flex-direction: column;
        border: 2px solid var(--bg20);

        h2 {
            text-align: center;
            line-height: 2.5rem;
            font-size: 1.25rem;
        }

        .stage {
            text-transform: uppercase;
            font-weight: 700;
        }

        .actions {
            display: flex;
            border-top: 2px solid var(--bg20);
            button {
                flex: 1 1;
                margin: .5rem;
            }
        }
    }
}
</style>
