<template>
    <router-view/>
</template>


<style lang="scss">
// Reset styles.
*, *:before, *:after {
    box-sizing: inherit;
}

html {
    box-sizing: border-box;
    font-size: 16px;
}

body, h1, h2, h3, h4, h5, h6, ol, ul, p {
    margin: 0;
    padding: 0;
}

input, select, textarea, button {
    font-family: inherit;
    font-size: inherit;
}

ol, ul {
    list-style: none;
}

img {
    max-width: 100%;
    height: auto;
}
</style>


<style lang="scss">
// Global styles.
:root {
    --bg00: #090c15;
    --bg10: #0d111d;
    --bg20: #141728;
    --bg30: #262b48;
    --bg40: #314165;

    --fg00: #ffffff;
    --fg10: #f1f2f6;
    --fg20: #dfe4ea;
    --fg30: #c5ccd6;
    --fg40: #a1a8c2;

    // --primary: #944aff;
    --primary: #8d3eff;
    --primaryFg: #a361ff;
    --primaryHigh: #c194ff;
    --blue: #00c9ff;
    --red: #ff007d;
    --bonus: #ffb04a;

    --success: #23b89a;
    --warning: #f3df58;
    --error: #d52647;

    --lineHeight: 1.5;
    // TODO: Pick a font.
    // --fontFamily: 'IBM Plex Sans', sans-serif;
    --fontFamily: 'Roboto', sans-serif;

    --borderStyle: 2px solid var(--bg30);
}

body {
    line-height: var(--lineHeight);
    font-family: var(--fontFamily);
    font-size: 1rem;
    color: var(--fg00);
    background-color: var(--bg00);
}

h1, h2, h3 {
    line-height: 1.2;
    font-weight: 400;
}

a {
    text-decoration: none;
    color: var(--primaryFg);

    &:hover {
        color: var(--primaryHigh);
    }
}

input, select, textarea, button {
    display: block;
    margin: 0;
    padding: 0 0.5rem;
    height: 2rem;
    border: none;
    color: var(--fg00);
    background-color: var(--bg30);

    &::placeholder {
        opacity: 0.75;
        color: var(--fg40);
    }
}

button {
    padding: 0 1rem;
    cursor: pointer;
    border-radius: 2.5px;

    &:active:not(:disabled) {
        padding-top: 2px !important;
    }

    &:disabled {
        cursor: default;
        color: var(--fg40);
        background-color: var(--bg20);
    }
}

textarea {
    height: auto;
    padding: 0.75rem 1rem;
    resize: vertical;
}
</style>
