export type ShelfConfig = {
    rootRefName: string;
    shelfItems: ShelfItem[];
}

type ShelfItem = {
    refPath: string;
    displayName: string;
    emoji?: string;
    hideFromShelf?: boolean;
    openInNewTab?: boolean;
    underConstruction?: boolean;
    isRemote?: boolean;
}