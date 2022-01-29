<template>
    <AdminPanelSection class="EditTeamObjectives" title="Objectives">
        <div
            v-for="objective in objectivesWithState"
            :key="objective.id"
            class="objective"
            :class="{ complete: objective.complete, bonus: objective.bonus }"
        >
            <span class="id">{{ objective.id }}</span>
            <button v-if="objective.complete" @click="onSetIncomplete(objective)">Complete</button>
            <button v-else @click="onSetComplete(objective)">Incomplete</button>
        </div>
    </AdminPanelSection>
</template>


<script>
import { mapState } from 'vuex';
import * as api from '../../../api';
import AdminPanelSection from './AdminPanelSection.vue';

export default {
    components: { AdminPanelSection },

    props: { team: { type: Object, required: true } },

    computed: {
        ...mapState('game', ['objectives']),

        objectivesWithState() {
            return this.objectives.map((obj) => {
                const complete = this.team.completeObjectives.some(id => id === obj.id);
                return { ...obj, complete };
            });
        },
    },

    methods: {
        async onSetComplete(objective) {
            await api.patchTeam(this.team.id, {
                completeObjectives: [...this.team.completeObjectives, objective.id],
            });
        },

        async onSetIncomplete(objective) {
            await api.patchTeam(this.team.id, {
                completeObjectives: this.team.completeObjectives.filter(id => id !== objective.id),
            });
        },
    },
};
</script>


<style lang="scss" scoped>
.EditTeamObjectives {
    width: 10rem;

    .objective {
        display: flex;
        margin: 0.5rem 0;
        align-items: center;

        &.bonus .id {
            color: var(--bonus);
        }

        &.complete button {
            background-color: var(--success);
        }

        button {
            margin-left: 0.5rem;
            width: 100%;
        }
    }
}
</style>
