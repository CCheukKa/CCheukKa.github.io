export type ShelfConfig<T extends ShelfItem = ShelfItem> = {
    rootRefName: string;
    shelfItems?: T[];
    shelfCategories?: ShelfCategory<T>[];
}

export type ShelfCategory<T extends ShelfItem = ShelfItem> = {
    categoryName: string;
    shelfItems: T[];
}

export type ShelfItem = {
    refPath: string;
    refPage?: string;
    displayName: string;
    emoji?: string;
    hideFromShelf?: boolean;
    openInNewTab?: boolean;
    isRemote?: boolean;
    thumbnailPathOverride?: string;
    starred?: boolean;
}