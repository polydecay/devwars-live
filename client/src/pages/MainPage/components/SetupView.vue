<template>
    <div class="SetupView">
        <img class="logo" src="/logo-text-light-n.png" alt="" width="256px">
        <header>
            <h1>Game Setup</h1>
            <p>Join the game at <a href="/play">https://live.devwars.tv/play</a></p>
        </header>
        <main>
            <TeamSlotList :team="blueTeam"/>
            <h1 class="center">VS</h1>
            <TeamSlotList :team="redTeam" :flip="true"/>
        </main>
        <footer>
            <p>Game is starting soon, stay tuned!</p>
        </footer>
    </div>
</template>


<script>
import { mapGetters } from 'vuex';
import TeamSlotList from './TeamSlotList';

export default {
    components: { TeamSlotList },

    computed: {
        ...mapGetters('game', ['blueTeam', 'redTeam']),
    },
};
</script>


<style lang="scss" scoped>
.SetupView {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    height: 100vh;

    .logo {
        width: 18rem;
        margin-top: 4rem;
    }

    header {
        margin-top: 4rem;
        text-align: center;

        h1 { text-transform: uppercase; }
        p { font-size: 1.5rem; }
    }

    main {
        display: flex;
        margin: 4rem;
        flex: 1 1;
        justify-content: center;

        .center {
            margin: 0 8rem;
            margin-top: 9rem;
            font-size: 5rem;
            font-weight: 300;
        }

        .TeamSlotList {
            margin-top: 0rem;
        }
    }

    footer {
        margin-bottom: 4rem;
        text-align: center;

        h2 { text-transform: uppercase; }
        p {
            font-size: 1.25rem;
            color: var(--fg20);
        }
    }
}
</style>
