<template>
    <div class="GameSidebarVote">
        <div class="title">
            <h2>{{ stage.type }}</h2>
            <h1>{{ stage.meta.category }}</h1>
        </div>
        <div v-if="stage.type === 'vote'" class="vote">
            <div class="timer">
                <CountdownTimer v-if="stageEndAt" :endAt="stageEndAt" :warnAt="30000"/>
                <span v-else>-- : --</span>
            </div>
            <GameSidebarVoteBar :category="stage.meta.category"/>
            <p>Vote by typing <span class="red">!red</span> or <span class="blue">!blue</span> in the Twitch chat!</p>
        </div>
        <div class="guidelines">
            <h2>Guidelines</h2>
            <p>{{ stage.meta.description }}</p>
            <div v-if="stage.meta.lookFor" class="list">
                <h3>Look For</h3>
                <span class="good">{{ stage.meta.lookFor }}</span>
            </div>
            <div v-if="stage.meta.ignore" class="list">
                <h3>Ignore</h3>
                <span class="bad">{{ stage.meta.ignore }}</span>
            </div>
        </div>
    </div>
</template>


<script>
import { mapGetters, mapState } from 'vuex';
import GameSidebarVoteBar from './GameSidebarVoteBar';
import CountdownTimer from '../../../components/CountdownTimer';

export default {
    components: { GameSidebarVoteBar, CountdownTimer },

    computed: {
        ...mapState('game', ['stageEndAt']),
        ...mapGetters('game', ['stage']),
    },
};
</script>


<style lang="scss" scoped>
.GameSidebarVote {
    margin: 0 .5rem;

    h2 {
        text-align: center;
        margin-bottom: 1rem;
        text-transform: uppercase;
        color: var(--fg20);
        font-size: 1.5rem;
    }

    .title {
        margin: 3rem 0;

        h1 {
            text-align: center;
            text-transform: capitalize;
        }

        h2 {
            margin-bottom: 0.5rem;
        }
    }

    .timer {
        text-align: center;
        font-size: 1.5rem;
    }

    .vote {
        .blue { color: var(--blue); }
        .red { color: var(--red); }

        p {
            font-size: 1.125rem;
            text-align: center;
        }
    }

    .guidelines {
        display: flex;
        flex-flow: column nowrap;
        margin: 4rem 0;
        text-align: center;

        font-size: 1.125rem;

        .list {
            margin-top: 1rem;

            h3 {
                font-size: inherit;
                font-weight: 700;
                color: inherit;
            }

            .good { color: var(--success); }
            .bad { color: var(--error); }
        }
    }
}
</style>
