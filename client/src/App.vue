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

body, h1, h2, h3, h4, h5, h6, ol, ul, dl, p {
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
    --bg00: #090b19;
    --bg10: #0d101f;
    --bg20: #15182a;
    --bg30: #252945;
    --bg40: #2d3a5a;

    --fg00: #ffffff;
    --fg10: #f1f2f6;
    --fg20: #dfe4ea;
    --fg30: #c5ccd6;
    --fg40: #a1a8c2;

    $primary: #8d3eff;
    --primary: #{$primary};
    --primaryFg: #{mix(#fff, $primary, 25%)};
    --primaryHigh: #{mix(#fff, $primary, 50%)};

    --blue: #00c9ff;
    --red: #ff007d;
    --bonus: #ffb04a;

    --success: #23b89a;
    --warning: #f3df58;
    --error: #d52647;

    --lineHeight: 1.5;
    --fontFamily: 'Roboto', sans-serif;

    --borderStyle: 2px solid var(--bg30);
}

html {
    scrollbar-color: #1b1e30 var(--bg00);
    scrollbar-color: var(--bg30) var(--bg00);

    &::-webkit-scrollbar,
    &::-webkit-scrollbar-corner {
        background: var(--bg00);
    }

    &::-webkit-scrollbar-thumb {
        border: 2px solid var(--bg00);
        background-color: var(--bg30);

        &:hover {
            background-color: var(--bg40);
        }
    }
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

input {
    min-width: 0;
    border: 1px solid var(--bg30);
    background-color: var(--bg10);
}

textarea {
    height: auto;
    padding: 0.75rem 1rem;
    resize: vertical;
}

a, input, select, textarea, button {
    &:focus {
        outline: none;
    }

    &:focus-visible {
        box-shadow: inset 0 0 0 1px var(--fg40);
    }
}
</style>


<style lang="scss">
// vue-awesome-notifications override styles.
$awn-container-padding: 2rem;

$awn-success-color: #23b89a;
$awn-success-background: #0d101f;
$awn-success-border-color: #23b89a;

$awn-info-color: #00c9ff;
$awn-info-background: #0d101f;
$awn-info-border-color: #00c9ff;

$awn-alert-color: #d52647;
$awn-alert-background: #0d101f;
$awn-alert-border-color: #d52647;

$awn-warning-color: #f3df58;
$awn-warning-background: #0d101f;
$awn-warning-border-color: #f3df58;

$awn-toast-border-radius: 0;
$awn-toast-title-font-size: 1.25rem !default;

$awn-popup-wrapper-bg: rgba(#090b19, 0.75);
$awn-popup-bg: var(--bg20);
$awn-popup-font-size: 1rem !default;
$awn-popup-padding: 2rem;
$awn-popup-border-radius: 0;
$awn-popup-btn-border-radius: 2.5px;

@import 'vue-awesome-notifications/dist/styles/style.scss';

.awn-toast-wrapper {
    padding: 1rem;

    .awn-toast-label {
        line-height: 1.2;
        margin-bottom: 0.25rem;
    }

    .awn-toast-content {
        color: var(--fg00) !important;
        font-size: 1rem;
    }
}

#awn-popup-wrapper {
    .awn-popup-title {
        margin-top: 0;
        margin-bottom: 0.5rem;
        font-size: 1.75rem;
        font-weight: 400;
    }

    .awn-buttons .awn-btn-cancel {
        background-color: var(--bg30);
        &:hover {
            background-color: var(--bg30);
        }
    }
}
</style>
