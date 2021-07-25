declare namespace Common{
  type OrderBy ={ [K in string]:"DESC"|"ASC"}
  
  type Paging = {
    limit: number,
    skip: number,
    orderBy: OrderBy
  }
}
