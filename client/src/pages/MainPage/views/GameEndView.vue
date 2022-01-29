<template>
    <div class="GameEndView">
        <img class="logo" src="/logo-text.svg" alt="DevWars Logo">
        <main>
            <TeamScore :team="blueTeam" />
            <div class="center"></div>
            <TeamScore :team="redTeam" :flip="true" />
        </main>
    </div>
</template>


<script>
import { mapGetters } from 'vuex';
import TeamScore from '../components/TeamScore.vue';

export default {
    components: { TeamScore },

    computed: {
        ...mapGetters('game', ['blueTeam', 'redTeam']),
    },
};
</script>


<style lang="scss" scoped>
.GameEndView {
    display: flex;
    height: 100vh;
    flex-flow: column nowrap;
    align-items: center;

    .logo {
        position: absolute;
        top: 0;
        width: 18rem;
        margin-top: 4rem;
    }

    main {
        display: flex;
        flex: 1 1;
        flex-flow: row nowrap;

        .center {
            width: 28rem;
        }

        .TeamScore {
            padding-top: 10rem;
        }
    }
}
</style>
