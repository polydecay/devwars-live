<template>
    <div class="TestView">
        <LiveEditor v-for="editor in editors" :key="editor.id" :editor="editor"/>
    </div>
</template>


<script>
import LiveEditor from '../../../components/editors/LiveEditor';

export default {
    components: { LiveEditor },

    computed: {
        editors() {
            return this.$store.getters['game/editorsByTeam'](1);
        },
    },
};
</script>


<style lang="scss" scoped>
.TestView {
    display: flex;
    flex-flow: column nowrap;
    height: 100vh;
    overflow: hidden;

    .BaseEditor {
        flex: 1 1 100%;
        height: 100%;
        width: 100%;
    }
}
</style>
