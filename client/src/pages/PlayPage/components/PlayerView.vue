<template>
    <div class="PlayerView">
        <GameHeader/>
        <main>
            <PlayerTabEditor/>
            <aside>
                <TeamSiteViewer :teamId="1"/>
            </aside>
        </main>
    </div>
</template>


<script>
import { mapState } from 'vuex';
import * as api from '../../../api';
import GameHeader from '../../../components/GameHeader';
import TeamSiteViewer from '../../../components/TeamSiteViewer';
import PlayerTabEditor from './PlayerTabEditor';

export default {
    components: { GameHeader, PlayerTabEditor, TeamSiteViewer },
};
</script>


<style lang="scss" scoped>
.PlayerView {
    display: flex;
    height: 100vh;
    flex-flow: column nowrap;

    main {
        display: flex;
        flex: 1 1;

        .PlayerTabEditor {
            flex: 1 1;
            max-width: 48rem;
            min-width: 36rem;
            // flex-basis: 12rem;

        }

        aside {
            display: flex;
            flex-flow: column nowrap;
            flex: 1 1;

            .TeamSiteViewer {
                flex: 1 1;
            }
        }
    }
}
</style>
