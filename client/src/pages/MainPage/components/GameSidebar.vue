<template>
    <div class="GameSidebar">
        <img class="logo" src="/logo-text.svg" alt="DevWars Logo">

        <GameSidebarObjectives v-if="stage.type === 'running'"/>
        <GameSidebarReviewVote v-else-if="stage.type === 'review' || stage.type === 'vote'"/>

    </div>
</template>


<script>
import { mapGetters } from 'vuex';
import GameSidebarObjectives from './GameSidebarObjectives';
import GameSidebarReviewVote from './GameSidebarReviewVote';

export default {
    components: { GameSidebarObjectives, GameSidebarReviewVote },

    computed: mapGetters('game', ['stage']),
};
</script>


<style lang="scss" scoped>
.GameSidebar {
    display: flex;
    width: 20rem;
    flex-flow: column nowrap;

    // border-right: 2px solid var(--bg20);
    background-color: var(--bg10);
    background: linear-gradient(to bottom, var(--bg20), var(--bg10));

    .logo {
        margin: 1rem;
        width: 16rem;
        align-self: center;
    }
}
</style>
