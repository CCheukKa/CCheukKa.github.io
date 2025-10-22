export type ShelfConfig<T extends ShelfItem = ShelfItem> = {
    rootRefName: string;
    shelfItems: T[];
}

export type ShelfItem = {
    refPath: string;
    refPage?: string;
    displayName: string;
    emoji?: string;
    hideFromShelf?: boolean;
    openInNewTab?: boolean;
    underConstruction?: boolean;
    isRemote?: boolean;
}