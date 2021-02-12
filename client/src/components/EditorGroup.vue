<template>
    <div class="EditorGroup">
        <EditorGroupItem
            v-for="editor in editors"
            :key="editor.id"
            :editor="editor"
        />
    </div>
</template>


<script>
import EditorGroupItem from './EditorGroupItem';

export default {
    components: { EditorGroupItem },
    props: {
        editors: { type: Array, required: true },
    },
};
</script>


<style lang="scss" scoped>
.EditorGroup {
    display: flex;

    .EditorGroupItem {
        flex: 1 1;
        &:not(:first-child) {
            border-left: 2px solid var(--bg20);
        }
    }
}
</style>
