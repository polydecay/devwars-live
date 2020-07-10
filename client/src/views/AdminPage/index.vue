<template>
    <div class="AdminPage">
        <div class="moderatorMessage" v-if="!isModerator">
            <h1>You're not logged in as a moderator</h1>
            <a href="https://www.devwars.tv/login">Go to login page</a>
        </div>
        <CreateGameView v-else-if="!isActive"/>
        <EditGameView v-else/>
    </div>
</template>


<script>
import { mapState, mapGetters } from 'vuex';
import CreateGameView from './components/CreateGameView';
import EditGameView from './components/EditGameView';

export default {
    components: { CreateGameView, EditGameView },

    computed: {
        ...mapState('app', ['user']),
        ...mapGetters('game', ['isActive']),
        isModerator() {
            return this.user.role === 'MODERATOR' || this.user.role === 'ADMIN';
        },
    },
};
</script>


<style lang="scss" scoped>
.AdminPage {
    .moderatorMessage {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        height: 100vh;

        h1 {
            margin-bottom: 1rem;
        }
    }
}
</style>
