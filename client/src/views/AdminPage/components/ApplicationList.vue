<template>
    <section class="ApplicationList">
        <header class="header">
            <h1>Applications</h1>
        </header>
        <main>
            <ApplicationItem v-for="app in applications" :key="app.id" :application="app"/>
        </main>
    </section>
</template>


<script>
import { mapState } from 'vuex';
import ApplicationItem from './ApplicationItem';
import * as api from '../../../api';

export default {
    components: { ApplicationItem },

    computed: {
        ...mapState('admin', ['applications']),
    },
};
</script>


<style lang="scss" scoped>
.ApplicationList {
    margin: 1rem;
    background-color: var(--bg10);

    header {
        display: flex;
        height: 3rem;
        align-items: center;
        background-color: var(--bg20);

        h1 {
            margin-left: 1rem;
            margin-right: auto;
            text-transform: capitalize;
            font-size: 1.5rem;
        }
    }

    main {
        display: flex;
        flex-flow: column;
    }
}
</style>
