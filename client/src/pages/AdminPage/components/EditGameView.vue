<template>
    <div class="EditGameView">
        <EditGame/>
        <div class="split">
            <div class="teams">
                <EditTeam v-for="team of teams" :key="team.id" :team="team"/>
            </div>
            <ApplicationList/>
        </div>
    </div>
</template>


<script>
import { mapState } from 'vuex';
import EditGame from './EditGame';
import EditTeam from './EditTeam';
import ApplicationList from './ApplicationList';

export default {
    components: { EditGame, EditTeam, ApplicationList },

    computed: {
        ...mapState('game', ['teams']),
    }
};
</script>


<style lang="scss" scoped>
.EditGameView {
    .split {
        display: flex;
        flex-direction: row;

        .ApplicationList {
            flex: 1 1;
        }
    }
}
</style>
