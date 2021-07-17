import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateRoles1626529511022 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        return await queryRunner.createTable(new Table({
            name: 'roles',
            columns: [
                { name: 'id', type: 'varchar' }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return await queryRunner.dropTable('roles')
    }

}
