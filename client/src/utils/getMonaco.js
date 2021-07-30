import { emmetHTML } from 'emmet-monaco-es';

let MONACO = null;
let PROMISE = null;

export default async function getMonaco() {
    if (MONACO) return MONACO;
    if (PROMISE) return PROMISE;

    return PROMISE = loadMonaco();
}

async function loadMonaco() {
    MONACO = await import('monaco-editor/esm/vs/editor/editor.api.js');
    MONACO.editor.defineTheme('devwars', createDevwarsTheme());

    emmetHTML(MONACO, ['html']);

    return MONACO;
}

function createDevwarsTheme() {
    const style = window.getComputedStyle(document.documentElement);

    const getStyleColor = (name) => {
        const color = style.getPropertyValue(name).trim().slice(1);
        return color.length === 3 ? color + color : color;
    }

    const BG = getStyleColor('--bg00');
    const BG2 = getStyleColor('--bg10');
    const FG = getStyleColor('--fg00');
    const BLUE = getStyleColor('--blue');
    const RED = getStyleColor('--red');
    const NUMBER = getStyleColor('--bonus');
    const COMMENT = getStyleColor('--fg40');
    const BORDER = getStyleColor('--bg20');
    const DELIMITER = getStyleColor('--fg30');
    const IDENTIFIER = getStyleColor('--primaryHigh');

    return {
        base: 'vs-dark',
        inherit: true,
        rules: [
            { token: '', foreground: FG, background: BG },
            { token: 'comment', foreground: COMMENT },

            { token: 'key', foreground: FG },
            { token: 'string.key.json', foreground: FG },
            { token: 'variable.parameter', foreground: FG },
            { token: 'attribute.name', foreground: FG },
            { token: 'metatag.content.html', foreground: FG },

            { token: 'number', foreground: NUMBER },

            { token: 'attribute.value', foreground: BLUE },
            { token: 'attribute.value.number.css', foreground: BLUE },
            { token: 'attribute.value.unit.css', foreground: BLUE },

            { token: 'string', foreground: BLUE },
            { token: 'string.value.json', foreground: BLUE },
            { token: 'keyword.json', foreground: BLUE },
            { token: 'meta.tag', foreground: BLUE },

            { token: 'constant', foreground: RED },
            { token: 'keyword', foreground: RED },
            { token: 'tag', foreground: RED },
            { token: 'metatag.html', foreground: RED },
            { token: 'metatag.xml', foreground: RED },

            { token: 'delimiter', foreground: DELIMITER },
            { token: 'delimiter.html', foreground: DELIMITER },
            { token: 'type.identifier', foreground: IDENTIFIER },

            { token: 'attribute.value.hex.css', foreground: FG },
        ],
        colors: {
            foreground: `#${FG}`,
            'editor.foreground': `#${FG}`,
            'editor.background': `#${BG}`,

            'editorCursor.foreground': `#${FG}`,
            'editor.lineHighlightBackground': `#${BG2}`,

            'editor.selectionBackground': `#${COMMENT}40`,
            'editor.inactiveSelectionBackground': `#${COMMENT}26`,

            'editorLineNumber.foreground': `#${COMMENT}60`,
            'editorOverviewRuler.border': '#00000000',

            'editorBracketMatch.border': `#${COMMENT}`,
            'editorIndentGuide.background': `#${COMMENT}60`,

            'editorWidget.background': `#${BG2}`,
            'editorWidget.border': `#${BORDER}`,

            'input.background': `#${BG}`,
            'input.border': `#${BORDER}`,
        },
    };
}
