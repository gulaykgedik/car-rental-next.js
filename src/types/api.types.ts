export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: Pagination;
}

export interface SingleResponse<T> {
  data: T;
}

export type CarFilter = Record<string, unknown>;

export interface PaginationParts {
  page: number;
  limit: number;
  skip: number;
}