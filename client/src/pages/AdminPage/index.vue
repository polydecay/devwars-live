<template>
    <div class="AdminPage">
        <FullscreenMessage v-if="!isModerator" title="You're not an administrator">
            <a href="https://www.devwars.tv/login">Go to login page</a>
        </FullscreenMessage>
        <CreateGameView v-else-if="!isActive" />
        <EditGameView v-else />
    </div>
</template>


<script>
import { mapState, mapGetters } from 'vuex';
import FullscreenMessage from '../../components/FullscreenMessage.vue';
import CreateGameView from './views/CreateGameView.vue';
import EditGameView from './views/EditGameView.vue';

export default {
    name: 'AdminPage',

    components: { FullscreenMessage, CreateGameView, EditGameView },

    computed: {
        ...mapState('app', ['user']),
        ...mapGetters('game', ['isActive']),
        isModerator() {
            return this.user.role === 'MODERATOR' || this.user.role === 'ADMIN';
        },
    },
};
</script>
