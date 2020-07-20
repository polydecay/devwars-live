<template>
    <div class="TeamView" :class="[team.name]">
        <div class="sidebar">
            <button :class="{ active: curView === 'code'}" @click="curView = 'code'">C</button>
            <button :class="{ active: curView === 'site'}" @click="curView = 'site'">W</button>
        </div>
        <EditorGroupView v-show="curView === 'code'" :editors="editors"/>
        <TeamSiteViewer v-if="curView === 'site'" :teamId="team.id"/>
    </div>
</template>


<script>
import EditorGroupView from './EditorGroupView';
import TeamSiteViewer from './TeamSiteViewer';

export default {
    components: { EditorGroupView, TeamSiteViewer },

    props: {
        team: { type: Object, required: true },
    },

    data: () => ({
        curView: 'code',
    }),

    computed: {
        editors() {
            return this.$store.getters['game/editorsByTeam'](this.team.id);
        },
    },
};
</script>


<style lang="scss" scoped>
.TeamView {
    display: flex;

    &.blue { color: var(--blue); }
    &.red { color: var(--red); }

    .sidebar {
        width: calc(3rem + 2px);
        overflow: hidden;
        border-right: 2px solid var(--bg20);

        button {
            padding: 0;
            width: 100%;
            height: 3rem;

            color: var(--fg40);
            background-color: transparent;

            &.active {
                color: currentColor;
                font-weight: 700;
                opacity: 1;
            }
        }
    }


    .EditorGroupView {
        flex: 1 1;
    }

    .TeamSiteViewer {
        flex: 1 1;
    }
}
</style>
