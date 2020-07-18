<template>
    <span class="CountdownTimer" :class="{ warn }">{{ displayTime }}</span>
</template>


<script>
export default {
    props: {
        endAt: { type: Number, required: true },
        warnAt: { type: Number, default: null },
    },

    data: () => ({
        now: Date.now(),
    }),

    computed: {
        displayTime() {
            if (this.now >= this.endAt) return '00:00';

            const sec = Math.trunc((this.endAt - this.now) / 1000 % 60);
            const min = Math.trunc((this.endAt - this.now) / 1000 / 60);

            const secStr = String(sec).padStart(2, '0');
            const minStr = String(min).padStart(2, '0');

            return `${minStr}:${secStr}`;
        },

        warn() {
            return this.warnAt ? (this.endAt - this.now) < this.warnAt : false;
        },
    },

    mounted() {
        this.tick();
    },

    methods: {
        tick() {
            if (this._destroyed) return;

            const date = new Date();
            this.now = date.getTime();
            setTimeout(this.tick, 1025 - date.getMilliseconds());
        },
    },
};
</script>


<style lang="scss" scoped>
.CountdownTimer {
    &.warn {
        color: var(--error);
        color: #ff618d;
    }
}
</style>
