export interface QueryCriteria {
    page: number | undefined | null;
    size: number | undefined | null;
    sortField: string | string[] | null | undefined;
    sortOrder: 'asc' | 'desc' | undefined;
    filters?: { [key: string]: string };
}

export const ROWS_OPTIONS = [10, 25, 50, 100];

export const DEFAULT_QUERY_CRITERIA: QueryCriteria = {
    page: 0,
    size: 10,
    sortField: 'audit.createdDate',
    sortOrder: "desc"
}
