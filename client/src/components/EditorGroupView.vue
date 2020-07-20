<template>
    <div class="EditorGroupView">
        <EditorView
            v-for="editor in editors"
            :key="editor.id"
            :editor="editor"
        />
    </div>
</template>


<script>
import EditorView from './EditorView';

export default {
    components: { EditorView },
    props: {
        editors: { type: Array, required: true },
    },
};
</script>


<style lang="scss" scoped>
.EditorGroupView {
    display: flex;

    .EditorView {
        flex: 1 1;
        &:not(:first-child) {
            border-left: 2px solid var(--bg20);
        }
    }
}
</style>
