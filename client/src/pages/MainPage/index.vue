<template>
    <div class="MainPage">
        <FullscreenMessage title="No game is currently active" v-if="!isActive"/>
        <component v-else :is="gameViewComponent"/>
    </div>
</template>


<script>
import { mapState, mapGetters } from 'vuex';
import FullscreenMessage from '../../components/FullscreenMessage.vue';
import GameSetupView from './views/GameSetupView.vue';
import GamePlayView from './views/GamePlayView.vue';
import GameEndView from './views/GameEndView.vue';
import ZenPlayView from './views/ZenPlayView.vue';

export default {
    name: 'MainPage',

    components: { FullscreenMessage, GameSetupView, GamePlayView, GameEndView, ZenPlayView },

    computed: {
        ...mapState('game', ['mode']),
        ...mapGetters('game', ['isActive', 'stage']),

        gameViewComponent() {
            if (!this.isActive) return null;

            if (this.stage.type === 'setup') return 'GameSetupView';
            if (this.stage.type === 'end') return 'GameEndView';

            return this.mode === 'zen' ? 'ZenPlayView' : 'GamePlayView';
        },
    },
};
</script>


<style lang="scss" scoped>
</style>
