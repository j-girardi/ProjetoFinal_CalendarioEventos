import { EventItem } from 'src/app/models/event-item/event-item';

export class Event {
    available!: number;
    collectionURI!: string;
    items!: EventItem[];
    returned!: number;
}
