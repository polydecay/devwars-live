<template>
    <div class="PlayPage">
        <FullscreenMessage v-if="!isActive" title="No game is currently active"/>
        <PlayerView v-else-if="isPlayer"/>
        <GameApplicationView v-else-if="stage === 'setup'"/>
        <FullscreenMessage v-else title="Game in progress"/>
    </div>
</template>


<script>
import { mapState, mapGetters } from 'vuex';
import FullscreenMessage from '../../components/FullscreenMessage';
import GameApplicationView from './components/GameApplicationView';
import PlayerView from './components/PlayerView';

export default {
    name: 'PlayPage',

    components: { FullscreenMessage, GameApplicationView, PlayerView },

    computed: {
        ...mapState('app', ['user', 'socketId']),
        ...mapState('game', ['stage', 'editors']),
        ...mapGetters('game', ['isActive']),
        isPlayer() {
            return this.editors.some(editor => editor.playerId === this.user.id);
        },
    },
};
</script>
