<template>
    <div class="PlayerObjectives">
        <ol>
            <li
                v-for="obj in objectives"
                :key="obj.description"
                class="objective"
                :class="{
                    bonus: obj.bonus,
                    complete: team.completeObjectives.some(id => obj.id === id),
                }"
            >{{ obj.description }}</li>
        </ol>
    </div>
</template>


<script>
import { mapState } from 'vuex';

export default {
    computed: {
        ...mapState('app', ['user']),
        ...mapState('game', ['objectives']),

        player() {
            return this.$store.getters['game/playerById'](this.user.id);
        },

        team() {
            return this.$store.getters['game/teamById'](this.player.teamId);
        },
    },
};
</script>


<style lang="scss" scoped>
.PlayerObjectives {
    padding: 0 0.5rem;
    background-color: var(--bg10);

    ol {
        margin: 0.25rem 0 0.25rem 1.25rem;
        list-style: numeric;
    }

    li {
        margin-bottom: 0.25rem;

        &.bonus {
            color: var(--bonus);
        }

        &.complete {
            color: var(--success);
            text-decoration: line-through;
        }
    }
}
</style>
