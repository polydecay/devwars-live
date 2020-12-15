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
        ...mapState('game', ['stage', 'mode']),
        ...mapGetters('game', ['isActive']),

        gameViewComponent() {
            if (this.stage === 'setup') return 'SetupView';
            if (this.stage === 'end') return 'GameEndView';

            if (this.mode === 'zen') return 'GameZenView';
            return 'GameView';
        },
    },
};
</script>


<style lang="scss" scoped>
</style>
