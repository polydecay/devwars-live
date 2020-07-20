<template>
    <div class="GameView">
        <GameHeader/>
        <TeamView :team="blueTeam"/>
        <TeamView :team="redTeam"/>
    </div>
</template>


<script>
import { mapGetters } from 'vuex';
import TeamView from '../../../components/TeamView';
import GameHeader from '../../../components/GameHeader';

export default {
    components: { GameHeader, TeamView },

    computed: mapGetters('game', ['blueTeam', 'redTeam'])
};
</script>


<style lang="scss" scoped>
.GameView {
    display: flex;
    flex-flow: column nowrap;
    height: 100vh;
    overflow: hidden;

    .TeamView {
        flex: 1 1;

        &:not(:first-child) {
            border-top: 2px solid var(--bg20);
        }
    }
}
</style>
