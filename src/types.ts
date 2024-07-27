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

export interface Transaction {
  id: string;
  title: string;
  transactionSum: number;
  type: string;
  category: string;
  date: string;
}

export type ApiTransaction = Omit<Transaction, 'id'>;

export interface  TransactionMutation {
  title: string;
  transactionSum: string;
  type: string;
  category: string;
  date: string;
}

export interface ApiTransactions {
  [id: string]: ApiTransaction;
}