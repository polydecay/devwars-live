export class PromiseQueue {
    private busy = false;
    private readonly queue: (() => Promise<any>)[] = [];

    add(handler: () => Promise<any>): void {
        this.queue.push(handler);
        this.next();
    }

    private next() {
        if (this.busy) return;

        const handler = this.queue.shift();
        if (!handler) return;

        this.busy = true;
        handler().finally(() => {
            this.busy = false;
            this.next();
        });
    }
}
