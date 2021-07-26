declare namespace Common{
  type OrderBy ={ [K in string]:"DESC"|"ASC"}
  
  type Paging = {
    size: number,
    current: number,
    orderBy: OrderBy
  }
}
