import { uuid } from "@fnd/external_interfaces/uuid";

const SVC = process.env.SVC_NAME || 'happy-svc';

export interface IData {
    before : any;
    after : any;
}

export class DomainEventBase {

    id : string;
    resource: string;
    name: string;
    ts: string;
    key: string;
    svc: string;
    //TODO CHANGE TO IData
    data: /* IData */any;
    /**
     * 
     * @param {string} resourceName resource
     * @param {string} eventName event name
     * @param {string} createdAt ISO Date string
     * @param {string} data stringified object
     */
    
    constructor(resourceName: string, eventName: string, createdAt: string,
        data: IData) {
        this.id = uuid();
        this.resource = resourceName;
        this.name = eventName;
        this.ts = createdAt;
        this.svc = SVC;
        this.key = `${SVC}.${this.resource}.${this.name}.${this.ts}`
        this.data = data;
    }
}