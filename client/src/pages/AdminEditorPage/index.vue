<template>
    <div class="AdminEditorPage">
        <PlayerEditor v-if="editor" :editor="editor" :autoControl="false"/>
        <h1 v-else>No editor with id "{{ id }}" found!</h1>
    </div>
</template>


<script>
import PlayerEditor from '../../components/editors/PlayerEditor';

export default {
    components: { PlayerEditor },

    props: {
        id: { type: String, required: true },
    },

    beforeDestroy() {
        this.$socket.emit('e.release', { id: Number(this.id) });
    },

    mounted() {
        window.addEventListener('beforeunload', () => {
            this.$socket.emit('e.release', { id: Number(this.id) });
        });
    },

    computed: {
        editor() {
            return this.$store.getters['game/editorById'](Number(this.id))
        },
    },
};
</script>


<style lang="scss" scoped>
.AdminEditorPage {
    display: flex;
    height: 100vh;
}
</style>
