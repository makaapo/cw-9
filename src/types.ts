export interface  Category {
  id: string;
  title: string;
  type: string;
}
export type ApiCategory = Omit<Category, 'id'>;


export interface  CategoryMutation {
  title: string;
  type: string;
}