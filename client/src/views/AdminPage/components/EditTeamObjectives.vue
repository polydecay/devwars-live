<template>
    <section class="EditTeamObjectives">
        <header class="header">
            <h1>Objectives</h1>
        </header>
        <main>
            <div
                v-for="objective in objectivesWithState"
                :key="objective.id"
                class="objective"
                :class="{ complete: objective.complete, bonus: objective.bonus }"
            >
                <span class="id">{{ objective.id }}.</span>
                <button @click="onToggle(objective)" :title="objective.description">
                    {{ objective.complete ? 'Complete' : 'Incomplete' }}
                </button>
            </div>
        </main>
    </section>
</template>


<script>
import { mapState } from 'vuex';
import * as api from '../../../api';

export default {
    props: { team: { type: Object, required: true } },

    computed: {
        ...mapState('game', ['objectives']),

        objectivesWithState() {
            return this.objectives.map(objective => ({
                ...objective,
                complete: this.team.completeObjectives.some(id => id === objective.id),
            }));
        },
    },

    methods: {
        async onToggle(objective) {
            const completeObjectives = objective.complete
                ? this.team.completeObjectives.filter(id => id !== objective.id)
                : [...this.team.completeObjectives, objective.id];

            await api.patchTeam(this.team.id, { completeObjectives });
        },
    },
};
</script>


<style lang="scss" scoped>
.EditTeamObjectives {
    border: 2px solid var(--bg20);
    width: 10rem;

    header {
        display: flex;
        height: 2.5rem;
        align-items: center;
        justify-content: center;
        border-bottom: 2px solid var(--bg20);

        h1 {
            font-size: 1.25rem;
            color: var(--fg20);
        }
    }

    main {
        display: flex;
        margin: .5rem;
        flex-flow: column;
    }

    .objective {
        display: flex;
        margin: .5rem;
        margin-left: .25rem;
        align-items: center;

        &:not(:first-child) {
            margin-top: 0;
        }

        &.bonus .id {
            color: var(--bonus);
        }

        &.complete button {
            background-color: var(--success);
        }

        button {
            margin-left: .5rem;
            padding: 0;
            flex: 1 1;
        }
    }
}
</style>
