import { Comic } from 'src/app/models/comic/comic';
import { Event } from 'src/app/models/event/event';
import { Serie } from 'src/app/models/serie/serie';
import { Story } from 'src/app/models/story/story';
import { Thumbnail } from 'src/app/models/thumbnail/thumbnail';
import { Url } from 'src/app/models/url/url';

export class Character {
    id!: number;
    name!: string;
    description!: string;
    modified!: string;
    thumbnail!: Thumbnail;
    resourceURI!: string;
    comics!: Comic;
    series!: Serie;
    stories!: Story;
    events!: Event;
    urls!: Url[]
}
