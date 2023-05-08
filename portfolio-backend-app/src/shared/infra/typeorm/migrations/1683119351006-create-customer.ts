import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateCustomer1683119351006 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'customers',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'customer_name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'phone',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'country_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'state_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'city_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'address',
            type: 'json',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()'
          }
        ],
        foreignKeys: [
          {
            name: 'FKCountryCustomerCountryId',
            referencedTableName: 'countries',
            referencedColumnNames: ['id'],
            columnNames: ['country_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKStateCustomerStateId',
            referencedTableName: 'states',
            referencedColumnNames: ['id'],
            columnNames: ['state_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKCityCustomerCityId',
            referencedTableName: 'cities',
            referencedColumnNames: ['id'],
            columnNames: ['city_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          }
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('customers')
  }
}
