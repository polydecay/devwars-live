<template>
    <div ref="mount" class="BaseEditor">
        <transition name="fade" appear>
            <div v-if="loading" class="loading"><span class="spinner"></span></div>
        </transition>
    </div>
</template>


<script>
import getMonaco from '../../utils/getMonaco';

export default {
    monaco: null,
    editor: null,

    props: {
        text: { type: String, default: '' },
        language: { type: String, required: true },
        editable: { type: Boolean, default: false },
        readOnly: { type: Boolean, default: false },
    },

    data: () => ({
        loading: true,
    }),

    watch: {
        text(text) {
            this.setText(text);
        },

        language() {
            throw new Error('Editor language cannot be changed after instantiation');
        },

        readOnly(readOnly) {
            this.editor.updateOptions({ readOnly });
        },

        lineNumbers(lineNumbers) {
            this.editor.updateOptions({ lineNumbers });
        },
    },

    async mounted() {
        this.monaco = await getMonaco();
        // The editor was destroyed before monaco could load.
        if (this._isDestroyed) return;

        this.editorDecorations = [];

        this.editor = this.monaco.editor.create(this.$refs.mount, {
            value: this.text,
            language: this.language === 'js' ? 'javascript' : this.language,
            readOnly: this.readOnly,

            renderLineHighlight: this.editable ? 'full' : 'none',
            lineNumbers: this.editable,
            folding: this.editable,
            hideCursorInOverviewRuler: !this.editable,

            theme: 'devwars',
            automaticLayout: true, // TODO: Handle this manually maybe?
            contextmenu: false,
            dragAndDrop: false,
            lineNumbersMinChars: 3,
            minimap: { enabled: false },
            occurrencesHighlight: false,
            renderIndentGuides: false,
            roundedSelection: false,
            scrollbar: { useShadows: false },
            selectionHighlight: false,
        });

        this.editor.addAction({
            id: 'save-action',
            label: 'Save',
            // eslint-disable-next-line no-bitwise
            keybindings: [this.monaco.KeyMod.CtrlCmd | this.monaco.KeyCode.KeyS],
            run: () => this.$emit('save'),
        });

        this.editor.onDidFocusEditorWidget(() => this.$emit('focus'));
        this.editor.onDidBlurEditorWidget(() => this.$emit('blur'));
        this.editor.onDidChangeModelContent(change => this.$emit('change', change));
        this.editor.onDidChangeCursorSelection(selection => this.$emit('selection', selection));

        this.loading = false;
        this.$emit('loaded');
    },

    beforeUnmount() {
        this.editor?.dispose();
    },

    methods: {
        setText(text) {
            this.editor.getModel().setValue(text);
        },

        applyTextOperation(textOperation) {
            const edit = textOperation.toMonacoEdit(this.monaco);
            this.editor.getModel().applyEdits([edit]);
        },

        applySelectionDecorators(cursorSelections, revealCursor = false) {
            if (!this.editor) return;

            const decorations = [];

            for (const cursorSelection of cursorSelections) {
                const { cursor, selection } = cursorSelection.toMonacoRanges(this.monaco);

                decorations.push({
                    range: cursor,
                    options: { className: `CURSOR`},
                });

                if (cursorSelection.hasSelection()) {
                    decorations.push({
                        range: selection,
                        options: { className: `SELECTION` },
                    });
                }
            }

            this.editorDecorations = this.editor.deltaDecorations(
                this.editorDecorations,
                decorations,
            );

            if (revealCursor) {
                const { cursorRow, cursorCol } = cursorSelections[0];
                this.editor.revealPositionInCenterIfOutsideViewport(
                    new this.monaco.Position(cursorRow, cursorCol)
                );
            }
        },
    },
};
</script>


<style lang="scss" scoped>
.BaseEditor {
    position: relative;
    overflow: hidden;
    background-color: var(--bg00);

    :deep(.monaco-editor) {
        position: absolute;
        top: 0;
        left: 0;
    }

    :deep(.scrollbar .slider) {
        background: var(--bg40);
        opacity: 0.5;

        &:hover {
            opacity: 0.75;
        }

        &.active {
            opacity: 0.75;
            background: var(--fg40);
        }
    }

    :deep(.invisible.fade) {
        transition: opacity 150ms linear !important;
    }

    :deep(.CURSOR),
    :deep(.SELECTION) {
        color: var(--primaryFg);
    }

    :deep(.CURSOR):after {
        z-index: 1000;
        content: '';
        position: absolute;
        width: 2px;
        height: 100%;
        background-color: white;
    }

    :deep(.SELECTION) {
        background-color: rgba(161, 168, 194, 0.15);
    }
}
</style>


<style lang="scss" scoped>
// TODO: Move loader in to it's own component?
.BaseEditor {
    .fade-enter-active, .fade-leave-active {
        transition: opacity 500ms ease-out;
    }

    .fade-leave-active {
        transition: opacity 250ms ease-out;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }

    .loading {
        z-index: 1;
        position: relative;
        display: flex;
        height: 100%;
        align-items: center;
        justify-content: center;

        pointer-events: none;

        .spinner {
            display: inline-block;
            width: 64px;
            height: 64px;

            &:after {
                content: " ";
                display: block;
                width: 46px;
                height: 46px;
                margin: 1px;
                border-radius: 50%;
                border: 5px solid var(--bg40);
                border-color: var(--bg40) transparent var(--bg40) transparent;

                border: 5px solid currentColor;
                border-color: currentColor transparent currentColor transparent;

                animation: spinner 1.2s linear infinite;
            }

            @keyframes spinner {
                0% {
                    transform: rotate(0deg);
                }
                100% {
                    transform: rotate(360deg);
                }
            }
        }
    }
}
</style>
