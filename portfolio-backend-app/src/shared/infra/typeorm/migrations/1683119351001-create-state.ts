import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateState1683119351001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'states',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'federative_unit',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'state_name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'ibge_code',
            type: 'varchar',
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
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('states')
  }
}
