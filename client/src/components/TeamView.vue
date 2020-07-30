<template>
    <div class="TeamView" :class="[team.name]">
        <div class="sidebar">
            <button :class="{ active: curView === 'code'}" @click="curView = 'code'">
                <CodeIcon title="View editors"/>
            </button>
            <button :class="{ active: curView === 'site'}" @click="curView = 'site'">
                <SiteIcon title="View website"/>
            </button>
        </div>
        <EditorGroupView v-if="curView === 'code'" :editors="editors"/>
        <TeamSiteViewer v-else-if="curView === 'site'" :teamId="team.id"/>
    </div>
</template>


<script>
import EditorGroupView from './EditorGroupView';
import TeamSiteViewer from './TeamSiteViewer';
import CodeIcon from 'vue-material-design-icons/CodeTags';
import SiteIcon from 'vue-material-design-icons/Application';

export default {
    components: { EditorGroupView, TeamSiteViewer, CodeIcon, SiteIcon },

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
    // border-left: 2px solid currentColor;

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
            opacity: .25;
            outline: none;

            color: currentColor;
            background-color: transparent;

            &.active {
                opacity: 1;
                font-weight: 700;
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
