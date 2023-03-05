type IDateTime = string;

interface ITimestamped {
    updatedAt: IDateTime;
    createdAt: IDateTime;
}

interface IGame {
    id?: number;
    domainName: string;
    name?: string;
}

interface ICategory {
    approved: boolean;
    approvedBy?: number;
    categoryGames: IGame[];
    createdAt: IDateTime;
    description: string;
    discardedAt?: IDateTime;
    id: number;
    name: string;
    parentId: number;
    suggestedBy: number;
    updatedAt: IDateTime;
}

interface IGraphUser {
    avatar: string;
    memberId: number;
    name: string;
}

interface ICollectionBugReport extends ITimestamped {
    collectionBugStatusId: number;
    collectionRevisionId: number;
    description: string;
    id: number;
    title: string;
    user: IGraphUser;
    userId: number;
}

interface ICollectionChangelog {
    collectionRevisionId: number;
    createdAt: IDateTime;
    description: string;
    id: number;
    revisionNumber: number;
    updatedAt: IDateTime;
}

interface ICollectionSchema extends ITimestamped {
    id: number;
    version: string;
}

interface IExternalResource {
    collectionRevisionId: number;
    fileExpression: string;
    id: number;
    instructions: string;
    name: string;
    optional: boolean;
    resourceType: string;
    resourceUrl: string;
    version: string;
}

interface IGameVersion {
    id: number;
    reference: string;
}

type RatingOptions = 'positive' | 'negative' | 'abstained';

interface IRevisionMetadata {
    ratingValue: RatingOptions;
}

interface IModCategory {
    /**
     * numerical id
     */
    category_id: number;
    /**
     * display name
     */
    name: string;
    /**
     * id of the parent category or false if it's a top-level
     * category.
     * Note: often there is only a single root category named after the game.
     * But in some cases there are additional roots, e.g. the game 'skyrim' has
     * the roots 'Skyrim' and 'Sure AI: Enderal'
     */
    parent_category: number | false;
}

interface ITrackingState {
    test?: number;
}

interface IMod {
    author?: string;
    category: string;
    description: string;
    game: IGame;
    gameId: number;
    id: number;
    ipAddress: string;
    modCategory: IModCategory;
    modId: number;
    name: string;
    pictureUrl?: string;
    status: string;
    summary: string;
    trackingData: ITrackingState;
    uid: string;
    uploader: IGraphUser;
    version: string;
}

interface IModFile {
    categoryId: number;
    count: number;
    date: number;
    description: string;
    fileId: number;
    game: IGame;
    manager: number;
    mod: IMod;
    modId: number;
    name: string;
    owner: IGraphUser;
    primary: number;
    reportLink: string;
    requirementsAlert: number;
    scanned: number;
    size: number;
    sizeInBytes?: string;
    uCount: number;
    uid: string;
    uri: string;
    version: string;
}

interface ICollectionRevisionMod {
    collectionRevisionId: number;
    file?: IModFile;
    fileId: number;
    gameId: number;
    id: number;
    optional: boolean;
    updatePolicy: string;
    version: string;
}

interface IRating {
    average: number;
    positive: number;
    total: number;
}

interface IForumPost {
    authorId: number;
    authorName: string;
    id: number;
    post: string;
    postDate: IDateTime;
    user: IGraphUser;
}

interface IForumTopic {
    approved?: boolean;
    description?: string;
    forumId?: number;
    id?: number;
    pinned?: boolean;
    posts?: IForumPost[];
    postsCount: number;
    state?: string;
    title?: string;
    views?: number;
    visible?: string;
}

interface ICollectionMetadata {
    endorsementValue: number;
}

export interface ITag extends ITimestamped {
    adult: boolean;
    category?: {
        discardedAt?: IDateTime;
        id: string;
        name: string;
        tags: ITag[];
        updatedAt: IDateTime;
        createdAt: IDateTime;
    };
    discardedAt: IDateTime;
    global: boolean;
    id: string;
    name: string;
}

export interface ICollection extends ITimestamped {
    category?: ICategory;
    contentPreviewLink?: string;
    currentRevision?: {
        adultContent: string;
        bugReports: ICollectionBugReport[];
        collection: ICollection;
        collectionChangelog: ICollectionChangelog;
        collectionId: number;
        collectionSchema: ICollectionSchema;
        collectionSchemaId: number;
        contentPreviewLink: string;
        downloadLink: string;
        externalResources: IExternalResource[];
        fileSize: number;
        gameVersions: IGameVersion[];
        id: number;
        installationInfo?: string;
        latest: boolean;
        metadata: IRevisionMetadata;
        modFiles: ICollectionRevisionMod[];
        rating: IRating;
        revisionNumber: number;
        revisionStatus: string;
        status: string;
        updatedAt: IDateTime;
        createdAt: IDateTime;
    };
    downloadLink?: string;
    enableDonations?: boolean;
    endorsements: number;
    forumTopic?: IForumTopic;
    game: IGame;
    gameId?: number;
    headerImage?: {
        altText: string;
        collection: ICollection;
        discardedAt?: IDateTime;
        id: string;
        position: number;
        revision?: {
            adultContent: string;
            bugReports: ICollectionBugReport[];
            collection: ICollection;
            collectionChangelog: ICollectionChangelog;
            collectionId: number;
            collectionSchema: ICollectionSchema;
            collectionSchemaId: number;
            contentPreviewLink: string;
            downloadLink: string;
            externalResources: IExternalResource[];
            fileSize: number;
            gameVersions: IGameVersion[];
            id: number;
            installationInfo?: string;
            latest: boolean;
            metadata: IRevisionMetadata;
            modFiles: ICollectionRevisionMod[];
            rating: IRating;
            revisionNumber: number;
            revisionStatus: string;
            status: string;
            updatedAt: IDateTime;
            createdAt: IDateTime;
        };
        title: string;
        url: string;
        user: IGraphUser;
        verified: boolean;
        updatedAt: IDateTime;
        createdAt: IDateTime;
    };
    id: number;
    slug: string;
    media?: {
        altText: string;
        collection: ICollection;
        discardedAt?: IDateTime;
        id: string;
        position: number;
        revision?: {
            adultContent: string;
            bugReports: ICollectionBugReport[];
            collection: ICollection;
            collectionChangelog: ICollectionChangelog;
            collectionId: number;
            collectionSchema: ICollectionSchema;
            collectionSchemaId: number;
            contentPreviewLink: string;
            downloadLink: string;
            externalResources: IExternalResource[];
            fileSize: number;
            gameVersions: IGameVersion[];
            id: number;
            installationInfo?: string;
            latest: boolean;
            metadata: IRevisionMetadata;
            modFiles: ICollectionRevisionMod[];
            rating: IRating;
            revisionNumber: number;
            revisionStatus: string;
            status: string;
            updatedAt: IDateTime;
            createdAt: IDateTime;
        };
        title: string;
        url: string;
        user: IGraphUser;
        verified: boolean;
        updatedAt: IDateTime;
        createdAt: IDateTime;
    } & {
        collection: ICollection;
        description: string;
        discardedAt?: IDateTime;
        id: string;
        position: number;
        revision?: {
            adultContent: string;
            bugReports: ICollectionBugReport[];
            collection: ICollection;
            collectionChangelog: ICollectionChangelog;
            collectionId: number;
            collectionSchema: ICollectionSchema;
            collectionSchemaId: number;
            contentPreviewLink: string;
            downloadLink: string;
            externalResources: IExternalResource[];
            fileSize: number;
            gameVersions: IGameVersion[];
            id: number;
            installationInfo?: string;
            latest: boolean;
            metadata: IRevisionMetadata;
            modFiles: ICollectionRevisionMod[];
            rating: IRating;
            revisionNumber: number;
            revisionStatus: string;
            status: string;
            updatedAt: IDateTime;
            createdAt: IDateTime;
        };
        title: string;
        url: string;
        user: IGraphUser;
        verified: boolean;
        updatedAt: IDateTime;
        createdAt: IDateTime;
    }[];
    metadata?: ICollectionMetadata;
    name: string;
    revisions: {
        adultContent?: string;
        bugReports?: ICollectionBugReport[];
        collection?: ICollection;
        collectionChangelog?: ICollectionChangelog;
        collectionId?: number;
        collectionSchema?: ICollectionSchema;
        collectionSchemaId?: number;
        contentPreviewLink?: string;
        downloadLink?: string;
        externalResources?: IExternalResource[];
        fileSize?: number;
        gameVersions?: IGameVersion[];
        id: number;
        installationInfo?: string;
        latest?: boolean;
        metadata?: IRevisionMetadata;
        modFiles?: ICollectionRevisionMod[];
        rating?: IRating;
        revisionNumber: number;
        revisionStatus: string;
        status?: string;
        updatedAt?: IDateTime;
        createdAt?: IDateTime;
    }[];
    tags?: ITag[];
    tileImage?: {
        altText?: string;
        collection?: ICollection;
        discardedAt?: IDateTime;
        id?: string;
        position?: number;
        revision?: {
            adultContent: string;
            bugReports: ICollectionBugReport[];
            collection: ICollection;
            collectionChangelog: ICollectionChangelog;
            collectionId: number;
            collectionSchema: ICollectionSchema;
            collectionSchemaId: number;
            contentPreviewLink: string;
            downloadLink: string;
            externalResources: IExternalResource[];
            fileSize: number;
            gameVersions: IGameVersion[];
            id: number;
            installationInfo?: string;
            latest: boolean;
            metadata: IRevisionMetadata;
            modFiles: ICollectionRevisionMod[];
            rating: IRating;
            revisionNumber: number;
            revisionStatus: string;
            status: string;
            updatedAt: IDateTime;
            createdAt: IDateTime;
        };
        title?: string;
        url: string;
        user?: IGraphUser;
        verified?: boolean;
        updatedAt?: IDateTime;
        createdAt?: IDateTime;
    };
    user: IGraphUser;
    userId?: number;
    visible?: boolean;
    description: string;
    summary: string;
    commentLink: string;
    overallRating: string;
    overallRatingCount: number;
    recentRating: string;
    recentRatingCount: number;
}

/**
 * a specific revision of a collection
 */
export interface IRevision extends ITimestamped {
    adultContent: string;
    bugReports: ICollectionBugReport[];
    collection: ICollection;
    collectionChangelog: ICollectionChangelog;
    collectionId: number;
    collectionSchema: ICollectionSchema;
    collectionSchemaId: number;
    contentPreviewLink: string;
    downloadLink: string;
    externalResources: IExternalResource[];
    fileSize: number;
    gameVersions: IGameVersion[];
    id: number;
    installationInfo?: string;
    latest: boolean;
    metadata: IRevisionMetadata;
    modFiles: ICollectionRevisionMod[];
    rating: IRating;
    revisionNumber: number;
    revisionStatus: string;
    status: string;
}

export interface IColourScheme {
    id: number;
    name: string;
    primary_colour: string;
    secondary_colour: string;
    darker_colour: string;
}
