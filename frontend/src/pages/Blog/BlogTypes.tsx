export interface CategoryType {
    uuid: string;
    name: string;
    slug: string;
}
export type PostType = {
    uuid: string;
    title: string;
    slug: string;
    content: string;
    category: CategoryType;
};

export type AllPostsType = {
    title: string;
    slug: string;
};

export type NewSubmittedPost = {
    title: string;
    content: string;
    categoryUuid: string;
};

export interface UpdateSubmittedPost extends NewSubmittedPost {
    slug: string;
}
