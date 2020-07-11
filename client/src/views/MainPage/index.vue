<template>
    <div class="MainPage">
        <FullscreenMessage title="No game is currently active" v-if="!isActive"/>
        <SetupView v-else-if="stage === 'setup'"/>
    </div>
</template>


<script>
import { mapState, mapGetters } from 'vuex';
import FullscreenMessage from '../../components/FullscreenMessage';
import SetupView from './components/SetupView';

export default {
    components: { FullscreenMessage, SetupView },

    computed: {
        ...mapState('game', ['stage']),
        ...mapGetters('game', ['isActive']),
    }
};
</script>


<style lang="scss" scoped>
</style>
