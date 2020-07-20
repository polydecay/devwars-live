<template>
    <div class="EditorView">
        <EditorViewHeader :player="player" :language="editor.language" :connection="editor.connection"/>
        <LiveEditor :editor="editor"/>
    </div>
</template>


<script>
import LiveEditor from './editors/LiveEditor';
import EditorViewHeader from './EditorViewHeader';

export default {
    components: { LiveEditor, EditorViewHeader },

    props: {
        editor: { type: Object, required: true },
    },

    computed: {
        player() {
            return this.$store.getters['game/playerById'](this.editor.playerId);
        },
    },
};
</script>


<style lang="scss" scoped>
.EditorView {
    display: flex;
    flex-flow: column nowrap;

    .LiveEditor {
        flex: 1 1;
    }
}
</style>
