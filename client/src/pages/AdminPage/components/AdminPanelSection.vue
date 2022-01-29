<template>
    <section class="AdminPanelSection">
        <slot name="title"><h2>{{ title }}</h2></slot>
        <main>
            <slot></slot>
        </main>
    </section>
</template>


<script>
export default {
    props: {
        title: { type: String, required: false },
    },
};
</script>


<style lang="scss" scoped>
.AdminPanelSection {
    margin: 0.5rem;
    width: 16rem;
    border: 2px solid var(--bg20);

    h2 {
        line-height: 2.5rem;
        text-align: center;
        font-size: 1.25rem;
        color: var(--fg20);
        border-bottom: 2px solid var(--bg20);
    }

    main {
        margin: 0.5rem;
    }
}
</style>
