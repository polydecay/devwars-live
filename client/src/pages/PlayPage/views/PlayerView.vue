<template>
    <div class="PlayerView">
        <GameHeader>
            <template #left>
                <h2 :class="['team', team.name]">{{ team.name }} TEAM</h2>
            </template>
        </GameHeader>
        <div class="main">
            <PlayerTabEditor/>
            <aside>
                <TeamSiteViewer :teamId="team.id"/>
                <EditorGroup v-if="memberEditors.length > 0" :class="team.name" :editors="memberEditors"/>
            </aside>
        </div>
    </div>
</template>


<script>
import { mapState } from 'vuex';
import GameHeader from '../../../components/GameHeader.vue';
import EditorGroup from '../../../components/EditorGroup.vue';
import TeamSiteViewer from '../../../components/TeamSiteViewer.vue';
import PlayerTabEditor from '../components/PlayerTabEditor.vue';

export default {
    components: { GameHeader, PlayerTabEditor, TeamSiteViewer, EditorGroup },

    computed: {
        ...mapState('app', ['user']),

        player() {
            return this.$store.getters['game/playerById'](this.user.id);
        },

        team() {
            return this.$store.getters['game/teamById'](this.player.teamId);
        },

        memberEditors() {
            return this.$store.getters['game/editorsByTeam'](this.player.teamId)
                .filter(editor => editor.playerId !== this.player.id);
        },
    },
};
</script>


<style lang="scss" scoped>
.PlayerView {
    display: flex;
    height: 100vh;
    flex-flow: column nowrap;

    .team {
        margin: 0 1rem;
        text-transform: uppercase;

        &.red { color: var(--red); }
        &.blue { color: var(--blue); }
    }

    .main {
        display: flex;
        flex: 1 1;

        .PlayerTabEditor {
            flex: 1 1;
            max-width: 48rem;
            min-width: 36rem;
            border-right: 2px solid var(--bg20);
        }

        aside {
            display: flex;
            flex-flow: column nowrap;
            flex: 1 1;

            .TeamSiteViewer {
                flex: 5 1;
            }

            .EditorGroup {
                &.red { color: var(--red); }
                &.blue { color: var(--blue); }

                flex: 3 1;
                min-height: 24rem;
                border-top: 2px solid var(--bg20);
            }
        }
    }
}
</style>
