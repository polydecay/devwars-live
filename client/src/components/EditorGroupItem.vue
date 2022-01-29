<template>
    <div class="EditorGroupItem">
        <EditorGroupItemHeader :player="player" :language="editor.language" :connection="editor.connection" />
        <LiveEditor :editor="editor" />
    </div>
</template>


<script>
import LiveEditor from './editor/LiveEditor.vue';
import EditorGroupItemHeader from './EditorGroupItemHeader.vue';

export default {
    components: { LiveEditor, EditorGroupItemHeader },

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
.EditorGroupItem {
    display: flex;
    flex-flow: column nowrap;

    .LiveEditor {
        flex: 1 1;
    }
}
</style>
