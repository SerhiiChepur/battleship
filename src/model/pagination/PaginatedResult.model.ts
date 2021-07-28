export interface PaginatedResult<T> {
    totalRecords: number;
    currentPage: number;
    actions: T[];
}
