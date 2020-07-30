<template>
    <div class="TeamSlotList" :class="{ flip }">
        <div class="list">
            <TeamSlotItem
                v-for="editor in editors"
                :key="editor.id"
                :team="team"
                :editor="editor"
                :flip="flip"
            />
        </div>
    </div>
</template>


<script>
import TeamSlotItem from './TeamSlotItem';
export default {
    components: { TeamSlotItem },

    props: {
        team: { type: Object, required: true },
        flip: { type: Boolean, default: false },
    },

    computed: {
        editors() {
            return this.$store.getters['game/editorsByTeam'](this.team.id);
        },
    },
};
</script>


<style lang="scss" scoped>
.TeamSlotList {
    &.flip {
        text-align: right;
    }
}
</style>
