<template>
    <div class="GameSidebar">
        <img class="logo" src="/logo-text.svg" alt="DevWars Logo">

        <GameSidebarObjectives v-if="stage.type === 'running'"/>
        <GameSidebarReviewVote v-else-if="stage.type === 'review' || stage.type === 'vote'"/>

        <GameSidebarWidget/>
    </div>
</template>


<script>
import { mapGetters } from 'vuex';
import GameSidebarObjectives from './GameSidebarObjectives';
import GameSidebarReviewVote from './GameSidebarReviewVote';
import GameSidebarWidget from './GameSidebarWidget';

export default {
    components: { GameSidebarObjectives, GameSidebarReviewVote, GameSidebarWidget },

    computed: mapGetters('game', ['stage']),
};
</script>


<style lang="scss" scoped>
.GameSidebar {
    display: flex;
    width: 20rem;
    flex-flow: column nowrap;

    background-color: var(--bg10);
    // Starts at the top of the GameSidebarWidget (20rem)
    background: linear-gradient(to top, var(--bg10) 20rem, var(--bg20));

    .logo {
        margin: 1rem;
        width: 16rem;
        align-self: center;
    }

    .GameSidebarWidget {
        margin-top: auto;
    }
}
</style>
