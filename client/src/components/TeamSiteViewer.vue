<template>
    <div class="TeamSiteViewer">
        <iframe ref="iframe" :src="url" frameborder="0" @load="onLoad"></iframe>
        <div class="actions">
            <button @click="onOpen">
                <VIcon icon="OpenInNew" title="Open in new tab" />
            </button>
            <button @click="onRefresh">
                <VIcon icon="Refresh" title="Refresh site" />
            </button>
        </div>
    </div>
</template>


<script>
import eventBus from '../services/eventBus';

export default {
    props: { teamId: { type: Number, required: true } },

    computed: {
        url() {
            return `/api/teams/${this.teamId}/files/index.html`;
        },

        editors() {
            return this.$store.getters['game/editorsByTeam'](this.teamId);
        },
    },

    mounted() {
        eventBus.on('editor.save', this.onEditorSave);
    },

    beforeUnmount() {
        eventBus.off('editor.save', this.onEditorSave);
    },

    methods: {
        onLoad() {
            // Prevent flashes while keeping a default white background.
            this.$refs.iframe.style.backgroundColor = 'white';
        },

        onOpen() {
            Object.assign(document.createElement('a'), {
                target: '_blank',
                href: this.url,
            }).click();
        },

        onRefresh() {
            // Refreshes the iframe by updating the src property.
            this.$refs.iframe.style.backgroundColor = 'black';
            this.$refs.iframe.src += '';
        },

        onEditorSave(id) {
            if (this.editors.some(e => e.id === id)) {
                this.onRefresh();
            }
        },
    },
};
</script>


<style lang="scss" scoped>
.TeamSiteViewer {
    position: relative;
    display: flex;
    background-color: var(--bg00);

    iframe {
        flex: 1 1;
    }

    .actions {
        display: flex;
        position: absolute;
        bottom: .5rem;
        left: .5rem;
        opacity: 0.25;

        transform: scale(.75);
        transform-origin: bottom left;

        transition: opacity 128ms ease-out, transform 128ms ease-out;

        &:hover {
            opacity: 1;
            transform: scale(1);
        }

        button {
            display: flex;
            padding: 0;
            height: 2.5rem;
            width: 2.5rem;
            align-items: center;
            justify-content: center;

            border: 1px dashed var(--fg40);
            color: var(--fg20);
            background-color: var(--bg00);

            .material-design-icon {
                display: inline-flex;
            }

            &:not(:first-child) {
                margin-left: .5rem;
            }
        }
    }
}
</style>
