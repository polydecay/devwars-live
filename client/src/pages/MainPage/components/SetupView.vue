<template>
    <div class="SetupView">
        <img class="logo" src="/logo-text.svg" alt="DevWars Logo">
        <header>
            <h1>Game Setup</h1>
            <p>Join the game at <a href="/play">https://live.devwars.tv/play</a></p>
        </header>
        <main>
            <div class="team">
                <h1 class="blue">Blue Team</h1>
                <TeamSlotList :team="blueTeam"/>
            </div>
            <div class="center">VS</div>
            <div class="team flip">
                <h1 class="red">Red Team</h1>
                <TeamSlotList :team="redTeam" :flip="true"/>
            </div>
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
        min-height: 20rem;
        align-items: center;
        justify-content: center;

        .center {
            width: 22rem;
            margin-top: 2.5rem;
            text-align: center;
            font-size: 4.5rem;
            font-weight: 300;
        }

        .team {
            &.flip {
                h1 { text-align: right; }
            }

            h1 {
                margin-bottom: 1rem;
                text-transform: uppercase;

                &.blue { color: var(--blue); }
                &.red { color: var(--red); }
            }

            .TeamSlotList {
                margin-top: 0rem;
            }
        }
    }

    footer {
        margin-top: auto;
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
