import * as data from '../sus-words.json';

export interface userProfile {
    userId?: string,
    screen_name: string,
    name: string,
    description: string,
    friends_count?: string,
    followers_count?: string,
    profile_picture: string,
    link?: string
}

export class SusWords {
    susKeywords: Array<string>;
    potentiallySusKeywords: Array<string>;
    susLinks: Array<string>;

    constructor() {
        this.susKeywords = data.keywords,
        this.potentiallySusKeywords = data.potentiallySusKeywords,
        this.susLinks = data.susLinks
    }
}

