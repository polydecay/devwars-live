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
import TeamSlotItem from './TeamSlotItem.vue';

export default {
    components: { TeamSlotItem },

    props: {
        team: { type: Object, required: true },
        flip: { type: Boolean, default: false },
    },

    computed: {
        editors() {
            return this.$store.getters['game/editorsByTeam'](this.team.id)
                .filter(editor => editor.hidden !== true);
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
