<template>
    <section class="EditTeamEditors">
        <header>
            <h1>Editors</h1>
        </header>
        <main>
            <EditEditor v-for="editor in editors" :key="editor.id" :editor="editor"/>
        </main>
    </section>
</template>


<script>
import EditEditor from './EditEditor';

export default {
    components: { EditEditor },

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
    display: flex;
    flex-flow: column;
    border: 2px solid var(--bg20);

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
        flex: 1 1;

        .EditEditor:not(:first-child) {
            border-left: 2px solid var(--bg20);
        }
    }
}
</style>
