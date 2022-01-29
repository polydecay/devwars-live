<template>
    <div class="GameSidebar">
        <img class="logo" src="/logo-text.svg" alt="DevWars Logo">
        <GameSidebarObjectives v-if="showObjectives" />
        <GameSidebarReviewVote v-if="showReviewVote" />
        <GameSidebarWidget />
    </div>
</template>


<script>
import { mapGetters } from 'vuex';
import GameSidebarObjectives from './GameSidebarObjectives.vue';
import GameSidebarReviewVote from './GameSidebarReviewVote.vue';
import GameSidebarWidget from './GameSidebarWidget.vue';

export default {
    components: { GameSidebarObjectives, GameSidebarReviewVote, GameSidebarWidget },

    computed: {
        ...mapGetters('game', ['stage']),

        showObjectives() {
            const { type } = this.stage;
            return type === 'running' || type === 'intermission';
        },

        showReviewVote() {
            const { type } = this.stage;
            return type === 'review' || type === 'vote';
        },
    },
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
