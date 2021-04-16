export type TQuery = string;

export interface ICategory {
    uuid: string;
    name?: string;
    slug?: string;
}
export interface IPost {
    uuid: string;
    title: string;
    image: string;
    slug: string;
    content: string;
    category: ICategory;
}

export interface IAllPosts {
    title: string;
    slug: string;
}

export interface INewSubmittedPost {
    title: string;
    content: string;
    categoryUuid: string;
}

export interface UpdateSubmittedPost extends INewSubmittedPost {
    slug: string;
}

export interface DeletePostArg {
    slug: string;
}
