<template>
    <div class="GameSidebar">
        <img class="logo" src="/logo-text.svg" alt="DevWars Logo">

        <GameSidebarObjectives
            v-if="stage === 'active'"
        />

        <GameSidebarVote
            v-else-if="/^(review|vote)Design$/.test(stage)"
            category="design"
            :stage="stage.startsWith('review') ? 'review' : 'vote'"
            title="Design"
            description="Base your vote on the overall look and feel of the website."
            lookFor="Design, Animations, Responsiveness"
            ignore="Functionality, Features, Bugs"
        />

        <GameSidebarVote
            v-else-if="/^(review|vote)Function$/.test(stage)"
            category="function"
            :stage="stage.startsWith('review') ? 'review' : 'vote'"
            title="Function"
            description="Base your vote on the websites features and functionality."
            lookFor="Functionality, Features, Bugs"
            ignore="Design, Animations, Responsiveness"
        />

        <GameSidebarVote
            v-else-if="/^(review|vote)ZenDesign$/.test(stage)"
            category="design"
            :stage="stage.startsWith('review') ? 'review' : 'vote'"
            title="Design"
            description="Base your vote on the overall look and feel of the website."
            lookFor="Design, Animations"
            ignore="Responsiveness, Mobile Friendliness"
        />

        <GameSidebarVote
            v-else-if="/^(review|vote)ZenFunction$/.test(stage)"
            category="function"
            :stage="stage.startsWith('review') ? 'review' : 'vote'"
            title="Responsive"
            description="Base your vote on the websites responsiveness."
            lookFor="Responsiveness, Mobile Friendliness"
            ignore="Design, Animations"
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
