declare namespace Common{
  type OrderBy ={ [K in string]:"DESC"|"ASC"}
  
  type Pagination = {
    size: number,
    page: number,
    sort: OrderBy
  }
}
