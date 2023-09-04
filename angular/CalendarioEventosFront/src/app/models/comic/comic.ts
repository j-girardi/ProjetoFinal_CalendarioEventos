import { ComicItem } from 'src/app/models/comic-item/comic-item';

export class Comic {
    available!: number;
    collectionURI!: string;
    items!: ComicItem[];
    returned!: number;
}
