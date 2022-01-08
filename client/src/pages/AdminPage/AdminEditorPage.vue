<template>
    <div class="AdminEditorPage">
        <EditorController v-if="editor" :editor="editor" :autoControl="false"/>
        <h1 v-else>No editor with id "{{ id }}" found!</h1>
    </div>
</template>


<script>
import EditorController from '../../components/editor/EditorController.vue';

export default {
    name: 'AdminEditorPage',

    components: { EditorController },

    props: {
        id: { type: String, required: true },
    },

    computed: {
        editor() {
            return this.$store.getters['game/editorById'](Number(this.id))
        },
    },

    beforeUnmount() {
        this.$socket.emit('e.release', { id: Number(this.id) });
    },

    mounted() {
        window.addEventListener('beforeunload', () => {
            this.$socket.emit('e.release', { id: Number(this.id) });
        });
    },
};
</script>


<style lang="scss" scoped>
.AdminEditorPage {
    display: flex;
    height: 100vh;
}
</style>
