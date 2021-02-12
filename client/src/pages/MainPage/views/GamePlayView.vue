<template>
    <div class="GameView">
        <GameSidebar/>
        <main>
            <GameHeader/>
            <TeamView :team="blueTeam"/>
            <TeamView :team="redTeam"/>
        </main>
    </div>
</template>


<script>
import { mapGetters } from 'vuex';
import TeamView from '../../../components/TeamView';
import GameHeader from '../../../components/GameHeader';
import GameSidebar from '../components/GameSidebar';

export default {
    components: { GameHeader, TeamView, GameSidebar },

    computed: mapGetters('game', ['blueTeam', 'redTeam']),
};
</script>


<style lang="scss" scoped>
.GameView {
    display: flex;
    height: 100vh;
    overflow: hidden;

    main {
        display: flex;
        flex: 1 1;
        flex-flow: column nowrap;
    }

    .TeamView {
        flex: 1 1;

        &:last-child {
            border-top: 2px solid var(--bg20);
        }
    }
}
</style>
