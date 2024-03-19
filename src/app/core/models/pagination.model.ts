export interface IPagination
{
    length: number;
    size: number;
    page: number;
    lastPage: number;
    startIndex: number;
    endIndex: number;
    pageSizeOptions: [5, 10, 25, 50, 100];
}
