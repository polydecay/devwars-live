<template>
    <div class="GameSidebarObjectives">
        <div class="theme">
            <h2>Theme</h2>
            <h1>{{ title }}</h1>
        </div>
        <div v-if="objectives.length > 0" class="objectives">
            <h2>Objectives</h2>
            <div
                v-for="objective in objectivesWithTeamState"
                :key="objective.id"
                :class="['objective', { bonus: objective.bonus }]"
            >
                <div class="markers">
                    <div class="marker blue" :class="{ complete: objective.blue }"></div>
                    <div class="marker red" :class="{ complete: objective.red }"></div>
                </div>
                <div class="description">{{ objective.description }}</div>
            </div>
        </div>
    </div>
</template>


<script>
import { mapState, mapGetters } from 'vuex';

export default {
    computed: {
        ...mapState('game', ['title', 'objectives']),
        ...mapGetters('game', ['blueTeam', 'redTeam', 'objectivesWithTeamState']),
    },
};
</script>


<style lang="scss" scoped>
.GameSidebarObjectives {
    margin: 0 .5rem;

    h2 {
        text-align: center;
        margin-bottom: 1rem;
        text-transform: uppercase;
        color: var(--fg20);
        font-size: 1.5rem;
    }

    .theme {
        margin: 4rem 0;
        h1 {
            text-align: center;
            line-height: 1;
        }
    }

    .objectives {
        display: flex;
        flex-flow: column nowrap;
        margin: 4rem 0;

        h2 {
            margin-bottom: 2rem;
        }

        .objective {
            display: flex;
            margin-bottom: 1.5rem;
            align-items: center;

            &.bonus .description {
                color: var(--bonus);
            }

            .markers {
                margin-right: .5rem;

                .marker {
                    width: 1rem;
                    height: .5rem;
                    margin-left: -.5rem;
                    background-color: var(--bg30);

                    &:first-child {
                        margin-bottom: .25rem;
                    }

                    &.complete {
                        background-color: currentColor;
                        // box-shadow: 0 0 .75rem currentColor;
                    }

                    &.blue { color: var(--blue); }
                    &.red { color: var(--red); }
                }
            }
        }
    }
}
</style>
