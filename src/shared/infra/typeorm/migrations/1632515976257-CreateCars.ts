import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCars1632515976257 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cars',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'placa',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'chassi',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'renavam',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'modelo',
            type: 'varchar',
          },
          {
            name: 'marca',
            type: 'varchar',
          },
          {
            name: 'ano',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cars');
  }
}
