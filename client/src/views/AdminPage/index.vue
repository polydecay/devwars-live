<template>
    <div class="MainPage">
        <CreateGame v-if="!isActive"/>
        <div v-else>
            <EditGame/>
            <div class="teams">
                <EditTeam v-for="team of teams" :key="team.id" :teamId="team.id"/>
            </div>
        </div>
    </div>
</template>


<script>
import { mapState, mapGetters } from 'vuex';
import CreateGame from './components/CreateGame';
import EditGame from './components/EditGame';
import EditTeam from './components/EditTeam';

export default {
    components: { CreateGame, EditGame, EditTeam },

    computed: {
        ...mapState('game', ['teams']),
        ...mapGetters('game', ['isActive']),
    }
};
</script>


<style lang="scss" scoped>
</style>
