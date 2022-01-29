<template>
    <div class="PlayPage">
        <FullscreenMessage v-if="!isActive" title="No game is currently active" />
        <PlayerView v-else-if="isPlayer" />
        <GameApplicationView v-else-if="stage.type === 'setup'" />
        <FullscreenMessage v-else title="Game in progress" />
    </div>
</template>


<script>
import { mapState, mapGetters } from 'vuex';
import FullscreenMessage from '../../components/FullscreenMessage.vue';
import GameApplicationView from './views/GameApplicationView.vue';
import PlayerView from './views/PlayerView.vue';

export default {
    name: 'PlayPage',

    components: { FullscreenMessage, GameApplicationView, PlayerView },

    computed: {
        ...mapState('app', ['user', 'socketId']),
        ...mapState('game', ['editors']),
        ...mapGetters('game', ['isActive', 'stage']),
        isPlayer() {
            return this.editors.some(editor => editor.playerId === this.user.id);
        },
    },
};
</script>
