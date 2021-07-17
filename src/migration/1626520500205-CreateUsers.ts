import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsers1626520500205 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            type: 'int',
          },
          { name: 'username', type: 'varchar' },
          { name: 'password', type: 'varchar' },
          { name: 'email', type: 'varchar' },
          { name: 'nation_id', type: 'int' },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.dropTable('users');
  }
}
