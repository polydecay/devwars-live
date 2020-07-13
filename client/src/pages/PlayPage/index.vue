<template>
    <div class="PlayPage" v-if="!isLoading">
        <FullscreenMessage v-if="!isActive" title="No game is currently active"/>
        <GameApplicationView v-else/>
    </div>
</template>


<script>
import { mapState, mapGetters } from 'vuex';
import FullscreenMessage from '../../components/FullscreenMessage';
import GameApplicationView from './components/GameApplicationView';

export default {
    components: { FullscreenMessage, GameApplicationView },
    computed: {
        ...mapState('app', ['user', 'socketId']),
        ...mapGetters('game', ['isActive']),
        isLoading() {
            return !this.socketId && !this.user;
        },
    },
};
</script>
