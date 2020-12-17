<template>
    <div class="EditGame">
        <header>
            <h1>Game</h1>
            <button style="background: var(--error)" @click="onDestroy">Destroy</button>
        </header>
        <main>
            <div class="infoSection section">
                <h2>Info</h2>
                <div class="content">
                    <dl>
                        <div class="item"><dt>Mode:</dt><dd>{{ mode }}</dd></div>
                        <div class="item"><dt>Title:</dt><dd>{{ title }}</dd></div>
                        <div class="item"><dt>Runtime:</dt><dd>{{ runtime / 1000 / 60 }} min</dd></div>
                    </dl>
                </div>
            </div>

            <div class="stageSection section">
                <h2>Stage</h2>
                <div class="content">
                    <dl>
                        <div class="item"><dt>Current:</dt><dd>{{ stage }}</dd></div>
                        <div class="item">
                            <dt>Timer:</dt>
                            <dd><CountdownTimer v-if="stageEndAt" :endAt="stageEndAt" :warnAt="60000"/></dd>
                        </div>
                    </dl>
                    <div class="timerActions">
                        <div class="timeInput">
                            <input type="number" v-model="timeInput">
                            <span>min</span>
                        </div>
                        <button @click="onSetTimer">Set</button>
                    </div>
                    <div class="actions">
                        <button @click="onPrevStage">Previous</button>
                        <button @click="onNextStage">Next</button>
                    </div>
                </div>
            </div>

            <div class="objectivesSection section">
                <h2>Objectives</h2>
                <div class="content">
                    <button disabled>Edit</button>
                </div>
            </div>

            <div class="commandsSection section">
                <h2>Commands</h2>
                <div class="content">
                    <button @click="onLockEditors">Lock Editors</button>
                    <button @click="onUnlockEditors">Unlock Editors</button>
                    <button disabled @click="onResetEditors">Reset Editors</button>
                </div>
            </div>
        </main>
    </div>
</template>


<script>
import { mapState } from 'vuex';
import * as api from '../../../api';
import CheckAllIcon from 'vue-material-design-icons/CheckAll';
import CloseIcon from 'vue-material-design-icons/Close';
import CountdownTimer from '../../../components/CountdownTimer';

export default {
    components: { CountdownTimer, CheckAllIcon, CloseIcon },

    data: () => ({
        timeInput: 30,
    }),

    computed: {
        ...mapState('game', ['mode', 'title', 'runtime', 'stage', 'stageEndAt', 'objectives', 'editors']),
    },

    methods: {
        async onDestroy() {
            this.$awn.confirm('Are you sure you want to destroy the game?', () => {
                api.destroyGame();
            }, null, { labels: { confirm: 'Warning' }});
        },

        async onPrevStage() {
            await api.gamePrevStage();
        },

        async onNextStage() {

            await api.gameNextStage();
        },

        async onSetTimer() {
            await api.patchGame({
                stageEndAt: Date.now() + (this.timeInput * 60 * 1000),
            });
        },

        async onLockEditors() {
            await Promise.all(this.editors.map((editor) => {
                return api.patchEditor(editor.id, { locked: true })
            }));
        },

        async onUnlockEditors() {
            await Promise.all(this.editors.map((editor) => {
                return api.patchEditor(editor.id, { locked: false })
            }));
        },

        async onResetEditors() {
            await Promise.all(this.editors.map((editor) => {
                return api.resetEditor(editor.id);
            }));
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
        height: 3rem;
        display: flex;

        h1 {
            margin-right: auto;
            font-size: 1.5rem;
        }
    }

    main {
        display: flex;
        padding: 0.5rem;
        align-items: flex-start;
    }

    .section {
        display: flex;
        margin: 0.5rem;
        width: 16rem;
        flex-direction: column;
        border: 2px solid var(--bg20);

        h2 {
            text-align: center;
            line-height: 2.5rem;
            font-size: 1.25rem;
            color: var(--fg20);
            border-bottom: 2px solid var(--bg20);
        }

        dl {
            .item {
                display: flex;
                margin-bottom: 0.25rem;
            }

            dd {
                margin-left: auto;
                font-weight: 700;
            }
        }

        button, input {
            width: 100%;
        }

        .content {
            margin: 0.5rem;
        }
    }

    .stageSection {
        width: 18rem;

        .timerActions {
            display: flex;
            margin-bottom: 0.5rem;
            flex-flow: row nowrap;
            align-items: center;

            button {
                flex: 1 1;
                margin-left: 0.5rem;
            }

            .timeInput {
                display: flex;

                span {
                    padding-right: 0.5rem;
                    padding-left: 0.5rem;
                    line-height: 2rem;
                    border-top-right-radius: 2.5px;
                    border-bottom-right-radius: 2.5px;
                    color: var(--fg40);
                    background: var(--bg30);
                }
            }
        }

        .actions {
            display: flex;
            button:first-child {
                margin-right: 0.5rem;
            }
        }
    }

    .commandsSection {
        button:not(:last-child) {
            margin-bottom: 0.5rem;
        }
    }
}
</style>
