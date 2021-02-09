<template>
    <AdminPanel class="EditGame" title="Game">
        <button slot="actions" class="archiveButton" :disabled="stage.type !== 'end'" @click="onArchive">Archive</button>
        <button slot="actions" class="destroyButton" :disabled="stage.type === 'end'"@click="onDestroy">Destroy</button>

        <main class="test">
            <!-- Info -->
            <AdminPanelSection title="Info">
                <dl>
                    <div class="row">
                        <dt>Mode:</dt><dd>{{ mode }}</dd>
                    </div>
                    <div class="row">
                        <dt>Title:</dt><dd>{{ title }}</dd>
                    </div>
                    <div class="row">
                        <dt>Runtime:</dt><dd>{{ runtime / 1000 / 60 }} min</dd>
                    </div>
                </dl>
            </AdminPanelSection>

            <!-- Stage -->
            <AdminPanelSection title="Stage">
                <dl>
                    <div class="row">
                        <dt>Current:</dt><dd>{{ stageTitle }}</dd>
                    </div>
                    <div class="row">
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
                <div class="buttonRow">
                    <button @click="onPrevStage">Previous</button>
                    <button @click="onNextStage">Next</button>
                </div>
            </AdminPanelSection>

            <!-- Objectives -->
            <AdminPanelSection title="Objectives">
                <p v-if="!objectives.length" class="warning">WARNING: No objectives!</p>
                <button @click="onOpenObjectives">{{ objectives.length ? 'Edit' : 'Add' }}</button>
            </AdminPanelSection>

            <!-- Commands -->
            <AdminPanelSection title="Commands">
                <button @click="onLockEditors">Lock Editors</button>
                <button @click="onUnlockEditors">Unlock Editors</button>
                <button @click="onResetEditors">Reset Editors</button>
            </AdminPanelSection>
        </main>
    </AdminPanel>
</template>


<script>
import { mapState, mapGetters } from 'vuex';
import * as api from '../../../api';
import AdminPanel from './AdminPanel';
import AdminPanelSection from './AdminPanelSection';
import CountdownTimer from '../../../components/CountdownTimer';

export default {
    components: { AdminPanel, AdminPanelSection, CountdownTimer },

    data: () => ({
        timeInput: 30,
    }),

    computed: {
        ...mapState('game', ['mode', 'title', 'stages', 'stageEndAt', 'objectives', 'editors']),
        ...mapGetters('game', ['stage']),

        stageTitle() {
            const category = this.stage.meta?.category;
            return this.stage.type + (category ? ` (${category})` : '');
        },

        runtime() {
            return this.stages.find(stage => stage.type === 'running')?.meta?.runtime;
        }
    },

    methods: {
        async onDestroy() {
            this.$awn.confirm('Are you sure you want to destroy the game?', () => {
                api.destroyGame();
            }, null, { labels: { confirm: 'Warning' }});
        },

        async onArchive() {
            this.$awn.confirm('Are you sure you want to archive the game?', async () => {
                const res = await api.archiveGame();
                if (res.ok) this.$awn.success('Game archived!');
                else this.$awn.alert('Failed to archive game!');
            }, null, { labels: { confirm: 'Archive' }});
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

        onOpenObjectives() {
            window.open(`/admin/objectives`, '_blank');
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
            this.$awn.confirm('Are you sure you want to reset all editors?', () => {
                this.editors.map((editor) => {
                    return api.resetEditor(editor.id);
                });
            }, null, { labels: { confirm: 'Warning' } });
        },
    },
};
</script>


<style lang="scss" scoped>
.EditGame {
    margin: 1rem;

    dl .row {
        display: flex;
        margin-bottom: 0.25rem;

        dd {
            margin-left: auto;
        }
    }

    input, button {
        width: 100%;
        margin-bottom: 0.5rem;
    }


    main {
        display: flex;
        padding: 0.5rem;
        align-items: flex-start;
    }

    .archiveButton {
        margin: 0;
        margin-right: 0.5rem;
        background-color: var(--success);

        &:disabled {
            background-color: var(--bg30);
        }
    }

    .destroyButton {
        margin: 0;
        background-color: var(--error);

        &:disabled {
            background-color: var(--bg30);
        }
    }

    .timerActions {
        display: flex;

        button {
            margin-left: 0.5rem;
            width: auto;
        }

        .timeInput {
            display: flex;
            height: 2rem;

            span {
                padding: 0 0.5rem;
                line-height: calc(2rem - 2px);
                border: 1px solid var(--bg30);
                border-left: 0;
                background-color: var(--bg20);
            }
        }
    }

    .buttonRow {
        display: flex;

        button {
            margin: 0;
            &:not(:first-child) {
                margin-left: 0.5rem;
            }
        }
    }

    .warning {
        margin-bottom: 0.5rem;
        text-align: center;
        color: var(--error);
    }
}
</style>
