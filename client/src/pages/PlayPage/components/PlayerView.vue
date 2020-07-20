<template>
    <div class="PlayerView">
        <GameHeader/>
        <div class="main">
            <PlayerTabEditor/>
            <aside>
                <TeamSiteViewer :teamId="team.id"/>
                <EditorGroupView v-if="memberEditors.length > 0" :class="team.name" :editors="memberEditors"/>
            </aside>
        </div>
    </div>
</template>


<script>
import { mapState } from 'vuex';
import * as api from '../../../api';
import GameHeader from '../../../components/GameHeader';
import TeamSiteViewer from '../../../components/TeamSiteViewer';
import PlayerTabEditor from './PlayerTabEditor';
import EditorGroupView from '../../../components/EditorGroupView';

export default {
    components: { GameHeader, PlayerTabEditor, TeamSiteViewer, EditorGroupView },

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

            .EditorGroupView {
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
