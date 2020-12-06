<template>
    <div class="GameSidebar">
        <img class="logo" src="/logo-text.svg" alt="DevWars Logo">

        <GameSidebarObjectives
            v-if="stage === 'active'"
        />

        <GameSidebarVote
            v-else-if="stage.endsWith('Design')"
            category="design"
            :stage="stage.startsWith('review') ? 'review' : 'vote'"
            description="Base your vote on the overall look and feel of the website."
            lookFor="Design, Animations, Responsiveness"
            ignore="Functionality, Features, Bugs"
        />

        <GameSidebarVote
            v-else-if="stage.endsWith('Function')"
            category="function"
            :stage="stage.startsWith('review') ? 'review' : 'vote'"
            description="Base your vote on the websites features and functionality."
            lookFor="Functionality, Features, Bugs"
            ignore="Design, Animations, Responsiveness"
        />

    </div>
</template>


<script>
import { mapState } from 'vuex';
import GameSidebarObjectives from './GameSidebarObjectives';
import GameSidebarVote from './GameSidebarVote';

export default {
    components: { GameSidebarObjectives, GameSidebarVote },

    computed: mapState('game', ['stage']),
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
