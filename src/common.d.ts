declare namespace Common{
  type OrderBy ={ [K in string]:"DESC"|"ASC"}
  
  type pagination = {
    size: number,
    page: number,
    sort: OrderBy
  }
}
