<template>
    <AdminPanel class="ApplicationList" title="Applications">
        <div class="list">
            <ApplicationItem v-for="app in applications" :key="app.id" :application="app"/>
        </div>
    </AdminPanel>
</template>


<script>
import { mapState } from 'vuex';
import AdminPanel from './AdminPanel';
import ApplicationItem from './ApplicationItem';
import * as api from '../../../api';

export default {
    components: { AdminPanel, ApplicationItem },

    computed: {
        ...mapState('admin', ['applications']),
    },
};
</script>


<style lang="scss" scoped>
.ApplicationList {
    margin: 1rem;

    .list {
        display: flex;
        width: 100%;
        flex-direction: column;
    }
}
</style>
