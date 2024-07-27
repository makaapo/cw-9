export interface  Category {
  id: string;
  title: string;
  type: string;
}
export type ApiCategory = Omit<Category, 'id'>;

export interface CategoryId extends ApiCategory {
  id: string;
}

export interface  CategoryMutation {
  title: string;
  type: string;
}

export interface ApiCategories {
  [id: string]: ApiCategory;
}