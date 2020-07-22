<template>
    <div class="GameSidebarObjectives">
        <div class="title">
            <h2>Review</h2>
            <h1>{{ title }}</h1>
        </div>
        <div class="guidelines">
            <h2>Guidelines</h2>
            <p>{{ description }}</p>
            <div v-if="lookFor" class="list">
                <h3>Look For</h3>
                <span class="good">{{ lookFor }}</span>
            </div>
            <div v-if="ignore" class="list">
                <h3>Ignore</h3>
                <span class="bad">{{ ignore }}</span>
            </div>
        </div>
    </div>
</template>


<script>
import { mapState } from 'vuex';
export default {
    props: {
        title: { type: String, required: true },
        description: { type: String, required: false },
        lookFor: { type: String, required: false },
        ignore: { type: String, required: false },
    },
};
</script>


<style lang="scss" scoped>
.GameSidebarObjectives {
    margin: 0 .5rem;

    h2 {
        text-align: center;
        margin-bottom: 1rem;
        text-transform: uppercase;
        color: var(--fg20);
        font-size: 1.5rem;
    }

    .title {
        margin: 4rem 0;

        h1 {
            text-align: center;
        }
    }

    .guidelines {
        display: flex;
        flex-flow: column nowrap;
        margin: 4rem 0;
        text-align: center;

        font-size: 1.125rem;

        .list {
            margin-top: 1rem;

            h3 {
                font-size: inherit;
                font-weight: 700;
                color: inherit;
            }

            .good { color: var(--success); }
            .bad { color: var(--error); }
        }
    }
}
</style>
