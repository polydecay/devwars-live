<template>
    <div class="TeamScoreObjectives">
        <h1>Objectives</h1>
        <div class="objectives">
            <div class="objective" v-for="objective in objectivesWithTeamState" :key="objective.id">
                <VIcon
                    :icon="objective.bonus ? 'CheckAll' : 'Check'"
                    :size="42"
                    class="checkmark"
                    :class="[team.name, { complete: objective[team.name] }]"
                />
            </div>
        </div>
    </div>
</template>


<script>
import { mapGetters } from 'vuex';

export default {
    props: { team: { type: Object, required: true } },

    computed: mapGetters('game', ['objectivesWithTeamState']),
};
</script>


<style lang="scss" scoped>
.TeamScoreObjectives {
    h1 {
        margin-bottom: .5rem;
        text-transform: uppercase;
        text-align: center;
        font-size: 1.5rem;
    }

    .objectives {
        display: flex;
        justify-content: center;

        .checkmark {
            margin: 0 .5rem;
            color: var(--bg30);

            &.blue.complete { color: var(--blue); }
            &.red.complete { color: var(--red); }
        }
    }
}
</style>
