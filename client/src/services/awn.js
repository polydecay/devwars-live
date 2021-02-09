import AWN from 'awesome-notifications';
import './awn.styles.scss';

const awn = new AWN({
    animationDuration: 150,
    durations: { global: 5000 },
    icons: { enabled: false },
    labels: {
        confirm: 'Confirmation',
        confirmOk: 'Confirm',
    },
});

// Enables vue registration with Vue.use(awn).
awn.install = (Vue) => Vue.prototype.$awn = awn;

export default awn;
