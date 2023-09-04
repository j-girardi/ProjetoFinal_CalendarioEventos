import { StoryItem } from 'src/app/models/story-item/story-item';

export class Story {
    available!: number;
    collectionURI!: string;
    items!: StoryItem[];
    returned!: number;
}
