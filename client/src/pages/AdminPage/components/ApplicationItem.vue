<template>
    <div class="ApplicationItem">
        <div class="main">
            <div class="username">{{ application.username }}</div>
            <p class="message">{{ application.message }}</p>
        </div>
        <div v-for="val, lang in application.preferences" class="preference" :class="val">
            <div class="language">{{ lang }}</div>
            <div class="value">{{ val }}</div>
        </div>
    </div>
</template>


<script>
export default {
    props: { application: { type: Object, required: true } },
};
</script>


<style lang="scss" scoped>
.ApplicationItem {
    display: flex;
    padding: 0.5rem 1rem;
    flex: 1 1;
    flex-flow: row;
    border-bottom: 2px solid var(--bg20);

    .main {
        flex: 1 1;
        align-self: center;

        .username {
            font-weight: 700;
        }

        .message {
            color: var(--fg40);
        }
    }

    .preference {
        margin: 0 1rem;
        width: 2.5rem;
        text-align: center;
        color: var(--fg40);

        &.best {
            color: var(--success);
        }

        &.good {
            color: var(--fg00);
        }

        &.never {
            opacity: .25;
        }


        .language {
            text-transform: uppercase;
            font-weight: 700;
        }

        .value {
            text-transform: capitalize;
        }
    }
}
</style>
