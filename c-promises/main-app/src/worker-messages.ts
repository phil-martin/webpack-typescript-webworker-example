

export type WorkerMessageTypes = 'request' | 'response';

interface WorkerMessage {
    messageId: string;
    resolve: (value: any) => void;
    reject: (reason?: any) => void;
}

export interface WorkerRequestMessage {
    messageId: string;
    command: string;
    options: any;
}

export function extractWorkerRequestMessage(ev: MessageEvent): WorkerRequestMessage | null {
    let messageId = ev.data.messageId;
    let command = ev.data.command;
    if (typeof messageId === 'string' && typeof command === 'string') {
        return { messageId: messageId, command: command, options: ev.data.options }
    }

    return null;
}


export function buildWorkerResponseMessage(messageId: string, command: string, result: any) {
    return { messageId, result };
}

export class WorkerMessages {

    private messageCounter = 0;
    private messages = new Map<string, WorkerMessage>();

    constructor(private worker: Worker) {

        worker.addEventListener('message', ev => this.handleMessageEvent(ev));
        worker.addEventListener('messageerror', ev => this.handleMessageErrorEvent(ev));
        worker.addEventListener('error', ev => this.handleErrorEvent(ev));
    }

    public send<T>(command: string, options: any, timeoutMilliseconds: number = 20 * 1000): Promise<T> {
        ++this.messageCounter;
        let messageId = `msg-${this.messageCounter}`;
        let promise = new Promise<T>((resolve, reject) => {
            this.addMessageInfo({
                messageId,
                resolve,
                reject,
            })

            if (timeoutMilliseconds) {
                setTimeout(() => this.handleTimeout(messageId), timeoutMilliseconds);
            }

            this.worker.postMessage({ messageId, command, options })
        });

        return promise;
    }

    public handleErrorEvent(ev: ErrorEvent): any {
        console.log("*** ERROR Sending web worker message");
    }

    public handleMessageErrorEvent(ev: MessageEvent): any {
        let message = this.getAndRemoveMessageInfo(ev.data.messageId);

        if (message) {
            message.resolve(ev.data.result);
        }
    }

    public handleMessageEvent(ev: MessageEvent): any {
        let message = this.getAndRemoveMessageInfo(ev.data.messageId);
        if (message) {
            message.resolve(ev.data.result);
        }
    }

    private handleTimeout(messageId: string) {
        let message = this.messages.get(messageId);

        if (message) {
            this.messages.delete(messageId);

            message.reject("timed out");
        }
    }

    private addMessageInfo(msg: WorkerMessage) {
        this.messages.set(msg.messageId, msg)
    }

    private getAndRemoveMessageInfo(messageId: string | undefined | null) {
        if (messageId) {
            let message = this.messages.get(messageId);
            if (message) {
                this.messages.delete(messageId);
                return message;
            }
        }

        return null;
    }


}