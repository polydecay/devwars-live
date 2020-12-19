<template>
    <div class="MainPage">
        <FullscreenMessage title="No game is currently active" v-if="!isActive"/>
        <component v-else :is="gameViewComponent"/>
    </div>
</template>


<script>
import { mapState, mapGetters } from 'vuex';
import FullscreenMessage from '../../components/FullscreenMessage';
import SetupView from './components/SetupView';
import GameView from './components/GameView';
import GameZenView from './components/GameZenView';
import GameEndView from './components/GameEndView';

export default {
    name: 'MainPage',

    components: { FullscreenMessage, SetupView, GameView, GameZenView, GameEndView },

    computed: {
        ...mapState('game', ['mode']),
        ...mapGetters('game', ['isActive', 'stage']),

        gameViewComponent() {
            if (this.stage.type === 'setup') return 'SetupView';
            if (this.stage.type === 'end') return 'GameEndView';

            if (this.mode === 'zen') return 'GameZenView';
            return 'GameView';
        },
    },
};
</script>


<style lang="scss" scoped>
</style>
