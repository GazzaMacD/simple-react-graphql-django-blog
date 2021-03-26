interface Category {
  uuid: string;
  name: string;
  slug: string;
}
export type PostType = {
  uuid: string;
  title: string;
  slug: string;
  content: string;
  category: Category;
};

export type AllPostsType = {
  title: string;
  slug: string;
};
