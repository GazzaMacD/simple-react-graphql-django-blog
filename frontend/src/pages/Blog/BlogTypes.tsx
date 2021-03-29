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
