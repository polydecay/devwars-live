<template>
    <div class="MainPage">
        <CreateGame v-if="!isActive"/>
        <main v-else>
            <EditGame/>
            <div class="split">
                <div class="teams">
                    <EditTeam v-for="team of teams" :key="team.id" :team="team"/>
                </div>
                <ApplicationList/>
            </div>
        </main>
    </div>
</template>


<script>
import { mapState, mapGetters } from 'vuex';
import CreateGame from './components/CreateGame';
import EditGame from './components/EditGame';
import EditTeam from './components/EditTeam';
import ApplicationList from './components/ApplicationList';

export default {
    components: { CreateGame, EditGame, EditTeam, ApplicationList },

    computed: {
        ...mapState('game', ['teams']),
        ...mapGetters('game', ['isActive']),
    }
};
</script>


<style lang="scss" scoped>
</style>


<style lang="scss" scoped>
.split {
    display: flex;
    flex-direction: row;

    .ApplicationList {
        flex: 1 1;
    }
}
</style>
