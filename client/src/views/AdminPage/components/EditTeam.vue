<template>
    <section class="EditTeam">
        <header class="header">
            <h1>
                {{ team.id }}. <span :class="team.name">{{ team.name }}</span>
            </h1>
            <button @click="onToggleEnabled">{{ team.hidden ? 'Enable' : 'Disable' }}</button>
        </header>
        <main>
            <EditTeamObjectives v-if="objectives.length > 0" :teamId="teamId"/>
            <EditTeamEditors :teamId="teamId"/>
        </main>
    </section>
</template>


<script>
import { mapState } from 'vuex';
import EditTeamEditors from './EditTeamEditors';
import EditTeamObjectives from './EditTeamObjectives';

export default {
    components: { EditTeamEditors, EditTeamObjectives },

    props: { teamId: { type: Number, required: true } },

    computed: {
        ...mapState('game', ['objectives']),

        team() {
            return this.$store.getters['game/teamById'](this.teamId);
        },

        editors() {
            return this.$store.getters['game/editorsByTeam'](this.teamId);
        },
    },

    methods: {
        onToggleEnabled() {

        },
    },
};
</script>


<style lang="scss" scoped>
.EditTeam {
    margin: 1rem;
    background-color: var(--bg10);
    // border: 2px solid var(--bg20);

    header {
        display: flex;
        align-items: center;
        background-color: var(--bg20);
        // border-bottom: 2px solid var(--bg20);

        h1 {
            margin-left: 1rem;
            margin-right: auto;
            text-transform: capitalize;
            font-size: 1.5rem;

            .blue { color: var(--blue) }
            .red { color: var(--red) }
        }

        button {
            margin: .5rem;
        }
    }

    main {
        display: flex;
        flex-flow: row;

        .EditTeamObjectives,
        .EditTeamEditors {
            margin: .5rem;
        }
    }
}
</style>
