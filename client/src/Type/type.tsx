export interface IBook {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
}


export interface IBorrow {
  book: string;        // bookId (ObjectId string)
  quantity: number;
  dueDate: string;     // ISO date string (e.g., 2025-08-01)
}

export interface IBorrowSummary {
  title: string;
  isbn: string;
  totalQuantity: number;
}
