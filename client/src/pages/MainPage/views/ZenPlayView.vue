<template>
    <div class="GameZenView">
        <GameSidebar/>
        <main>
            <GameHeader/>
            <div class="editors">
                <TeamView :team="blueTeam"/>
                <EditorGroupItem class="zenEditor" :editor="templateEditor"/>
                <TeamView :team="redTeam"/>
            </div>
        </main>
    </div>
</template>


<script>
import { mapGetters } from 'vuex';
import TeamView from '../../../components/TeamView';
import GameHeader from '../../../components/GameHeader';
import EditorGroupItem from '../../../components/EditorGroupItem';
import GameSidebar from '../components/GameSidebar';

export default {
    components: { GameHeader, TeamView, GameSidebar, EditorGroupItem },

    computed: {
        ...mapGetters('game', ['blueTeam', 'redTeam']),
        templateEditor() {
            return this.$store.getters['game/editorById'](1);
        }
    },
};
</script>


<style lang="scss" scoped>
.GameZenView {
    display: flex;
    height: 100vh;
    overflow: hidden;

    main {
        display: flex;
        flex: 1 1;
        flex-flow: column nowrap;
    }


    .editors {
        display: flex;
        flex: 1 1;

        .zenEditor {
            flex: 1 1;
            // border-right: 2px solid var(--bg20);
            // border-left: 2px solid var(--bg20);

            // TODO: Make the background configurable in LiveEditor instead?
            background-color: var(--bg10);
            ::v-deep .BaseEditor {
                .monaco-editor-background, .margin {
                    background-color: var(--bg10) !important;
                }
            }
        }

        .TeamView {
            flex: 1 1;

            &:last-child {
                border-top: 2px solid var(--bg20);
            }
        }
    }
}
</style>
