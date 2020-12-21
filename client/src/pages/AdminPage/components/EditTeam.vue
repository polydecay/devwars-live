<template>
    <AdminPanel class="EditTeam" :class="team.name">
        <h1 slot="title" :class="['title', team.name]">{{ `${team.id}. ${team.name}` }}</h1>
        <!-- <button slot="actions" @click="onToggleEnabled">{{ team.enabled ? 'Disable' : 'Enable' }}</button> -->
        <main>
            <EditTeamObjectives v-if="objectives.length" :team="team"/>
            <EditTeamEditors :team="team"/>
        </main>
    </AdminPanel>
</template>


<script>
import { mapState } from 'vuex';
import * as api from '../../../api';
import AdminPanel from './AdminPanel';
import EditTeamEditors from './EditTeamEditors';
import EditTeamObjectives from './EditTeamObjectives';

export default {
    components: { AdminPanel, EditTeamEditors, EditTeamObjectives },

    props: { team: { type: Object, required: true } },

    computed: {
        ...mapState('game', ['objectives']),
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

    .title {
        text-transform: capitalize;
        &.blue { color: var(--blue); }
        &.red { color: var(--red); }
    }
}
</style>
