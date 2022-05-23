<template>
    <div v-if="!isConnected" class="ConnectionIndicator">
        <div class="container" :class="{ init }">
            <VIcon icon="Disconnected" />
            {{ init ? 'Connection lost!' : 'Connecting...'}}
        </div>
    </div>
</template>


<script>
import { mapGetters, mapState } from 'vuex';
import VIcon from './common/VIcon.vue';

export default {
    components: { VIcon },

    computed: {
        ...mapState('app', ['init']),
        ...mapGetters('app', ['isConnected']),
    },
};
</script>


<style lang="scss" scoped>
.ConnectionIndicator {
    z-index: 1000;
    position: fixed;
    display: flex;
    top: 1.5rem;
    width: 100%;
    justify-content: center;

    .container {
        display: flex;
        padding: 0.5rem 1rem;
        gap: 0.5rem;
        border-radius: 0.5rem;
        color: var(--fg00);
        background-color: var(--bg20);

        &.init {
            background-color: var(--error);
        }
    }
}
</style>
