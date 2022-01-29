<template>
    <AdminPanel class="EditTeam" :class="team.name" :title="title">
        <!-- <template #actions>
            <button @click="onToggleEnabled">{{ team.enabled ? 'Disable' : 'Enable' }}</button>
        </template> -->
        <main>
            <EditTeamObjectives v-if="objectives.length" :team="team" />
            <EditTeamEditors :team="team" />
        </main>
    </AdminPanel>
</template>


<script>
import { mapState } from 'vuex';
// import * as api from '../../../api';
import AdminPanel from './AdminPanel.vue';
import EditTeamEditors from './EditTeamEditors.vue';
import EditTeamObjectives from './EditTeamObjectives.vue';

export default {
    components: { AdminPanel, EditTeamEditors, EditTeamObjectives },

    props: { team: { type: Object, required: true } },

    computed: {
        ...mapState('game', ['objectives']),
        title() {
            return `${this.team.id}. ${this.team.name}`;
        },
    },

    // methods: {
    //     async onToggleEnabled() {
    //         await api.patchTeam(this.team.id, { enabled: !this.team.enabled });
    //     },
    // },
};
</script>


<style lang="scss" scoped>
.EditTeam {
    margin: 1rem;
    overflow: visible;

    main {
        padding: 0.5rem;
        display: flex;
    }

    &.blue :deep(h1) {
        color: var(--blue);
    }

    &.red :deep(h1) {
        color: var(--red);
    }
}
</style>
