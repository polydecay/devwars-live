<template>
    <div class="PlayPage" v-if="!isLoading">
        <NoGameView v-if="!gameActive"/>
        <GameApplicationView v-else/>
    </div>
</template>


<script>
import { mapState, mapGetters } from 'vuex';
import GameApplicationView from './components/GameApplicationView';
import NoGameView from './components/NoGameView';

export default {
    components: { GameApplicationView, NoGameView },
    computed: {
        ...mapState('user', ['user', 'socketId']),
        ...mapGetters('game', ['gameActive']),
        isLoading() {
            return !this.socketId && !this.user;
        },
    },
};
</script>


<style lang="scss" scoped>
</style>
