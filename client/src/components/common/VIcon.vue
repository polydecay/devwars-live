<template>
    <svg
        class="VIcon"
        role="img"
        :aria-label="title"
        :width="size"
        :height="size"
        fill="currentColor"
        viewBox="0 0 24 24"
    >
        <title v-if="title">{{ title }}</title>
        <path :d="icons[icon]" />
    </svg>
</template>


<script>
import {
    mdiCheck as Check,
    mdiCheckAll as CheckAll,
    mdiClose as Close,
    mdiCodeTags as CodeTags,
    mdiLock as Lock,
    mdiLockOpen as LockOpen,
    mdiMonitorCellphone as Monitor,
    mdiOpenInNew as OpenInNew,
    mdiRefresh as Refresh,
    mdiWebOff as Disconnected,
} from '@mdi/js';

export default {
    props: {
        icon: { type: String, required: true },
        title: { type: String, required: false },
        size: { type: Number, default: 24 },
    },

    data: () => ({
        icons: {
            Check,
            CheckAll,
            Close,
            CodeTags,
            Lock,
            LockOpen,
            Monitor,
            OpenInNew,
            Refresh,
            Disconnected,
        },
    }),
};
</script>


<style lang="scss" scoped>
.VIcon {
    display: inline-block;
    vertical-align: middle;
    user-select: none;
}
</style>
