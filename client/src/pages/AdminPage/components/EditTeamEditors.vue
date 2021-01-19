<template>
    <AdminPanelSection class="EditTeamEditors" title="Editors">
        <div class="editors">
            <EditEditor v-for="editor in editors" :key="editor.id" :editor="editor"/>
        </div>
    </AdminPanelSection>
</template>


<script>
import EditEditor from './EditEditor';
import AdminPanelSection from './AdminPanelSection';

export default {
    components: { AdminPanelSection, EditEditor },

    props: { team: { type: Object, required: true } },

    computed: {
        editors() {
            return this.$store.getters['game/editorsByTeam'](this.team.id);
        },
    },
};
</script>


<style lang="scss" scoped>
.EditTeamEditors {
    width: auto;

    ::v-deep {
        > main {
            margin: 0;
        }
    }

    .editors {
        display: flex;

        .EditEditor:not(:first-child) {
            border-left: 2px solid var(--bg20);
        }
    }
}
</style>
