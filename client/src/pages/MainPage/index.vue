<template>
    <div class="MainPage">
        <FullscreenMessage title="No game is currently active" v-if="!isActive"/>
        <SetupView v-else-if="stage === 'setup'"/>
        <TestView v-else/>
    </div>
</template>


<script>
import { mapState, mapGetters } from 'vuex';
import FullscreenMessage from '../../components/FullscreenMessage';
import SetupView from './components/SetupView';
import TestView from './components/TestView';

export default {
    components: { FullscreenMessage, SetupView, TestView },

    computed: {
        ...mapState('game', ['stage']),
        ...mapGetters('game', ['isActive']),
    }
};
</script>


<style lang="scss" scoped>
</style>
