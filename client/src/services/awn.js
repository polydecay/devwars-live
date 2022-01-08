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

awn.install = (app) => app.config.globalProperties.$awn = awn;

export default awn;
