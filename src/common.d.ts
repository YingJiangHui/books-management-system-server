declare namespace Common{
  type Order ={ [K in string]:"DESC"|"ASC"}
  
  type Paging = {
    take: number,
    skip: number,
    order: Order
  }
}
