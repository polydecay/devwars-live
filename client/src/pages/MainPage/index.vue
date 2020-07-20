<template>
    <div class="MainPage">
        <FullscreenMessage title="No game is currently active" v-if="!isActive"/>
        <SetupView v-else-if="stage === 'setup'"/>
        <GameView v-else/>
    </div>
</template>


<script>
import { mapState, mapGetters } from 'vuex';
import FullscreenMessage from '../../components/FullscreenMessage';
import SetupView from './components/SetupView';
import GameView from './components/GameView';

export default {
    name: 'MainPage',

    components: { FullscreenMessage, SetupView, GameView },

    computed: {
        ...mapState('game', ['stage']),
        ...mapGetters('game', ['isActive']),
    }
};
</script>


<style lang="scss" scoped>
</style>
