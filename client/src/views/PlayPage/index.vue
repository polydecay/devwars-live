<template>
    <div class="PlayPage" v-if="!isLoading">
        <NoGameView v-if="!isActive"/>
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
        ...mapState('app', ['user', 'socketId']),
        ...mapGetters('game', ['isActive']),
        isLoading() {
            return !this.socketId && !this.user;
        },
    },
};
</script>


<style lang="scss" scoped>
</style>
