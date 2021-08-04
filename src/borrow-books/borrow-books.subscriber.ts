import { EntitySubscriberInterface,EventSubscriber,InsertEvent } from 'typeorm';
import { BorrowBook } from './entities/borrow-book.entity';

@EventSubscriber()
export class BorrowBooksSubscriber implements EntitySubscriberInterface<BorrowBook> {
  /**
   * 表示此订阅者仅侦听Post事件。
   */
  listenTo() {
    return BorrowBook;
  }
  
  /**
   * 插入post之前调用。
   */
  beforeUpdate(event: InsertEvent<BorrowBook>) {
    console.log(`BEFORE borrow book Update: `, event.entity);
  }
}