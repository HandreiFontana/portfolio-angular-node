import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreatePlace1683119351008 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'places',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'place_name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'customer_id',
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
            name: 'size',
            type: 'varchar',
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
            name: 'FKCustomerPlaceCustomerId',
            referencedTableName: 'customers',
            referencedColumnNames: ['id'],
            columnNames: ['customer_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKStatePlaceStateId',
            referencedTableName: 'states',
            referencedColumnNames: ['id'],
            columnNames: ['state_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKCityPlaceCityId',
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
    await queryRunner.dropTable('places')
  }
}
