<template>
    <div class="TeamView" :class="[team.name]">
        <div class="sidebar">
            <button :class="{ active: curView === 'code'}" @click="curView = 'code'">
                <VIcon icon="CodeTags" title="View editors"/>
            </button>
            <button :class="{ active: curView === 'site'}" @click="curView = 'site'">
                <VIcon icon="Monitor" title="View website"/>
            </button>
        </div>
        <EditorGroup v-if="curView === 'code'" :editors="editors"/>
        <TeamSiteViewer v-else-if="curView === 'site'" :teamId="team.id"/>
    </div>
</template>


<script>
import EditorGroup from './EditorGroup';
import TeamSiteViewer from './TeamSiteViewer';

export default {
    components: { EditorGroup, TeamSiteViewer },

    props: {
        team: { type: Object, required: true },
    },

    data: () => ({
        curView: 'code',
    }),

    computed: {
        editors() {
            return this.$store.getters['game/editorsByTeam'](this.team.id)
                .filter(editor => editor.hidden !== true);
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

    .EditorGroup {
        flex: 1 1;
    }

    .TeamSiteViewer {
        flex: 1 1;
    }
}
</style>
