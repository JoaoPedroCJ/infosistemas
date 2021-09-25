import { QueryRunner } from 'typeorm';
import { uuid } from 'uuidv4';
import { hash } from 'bcryptjs';

export class UserSeeds1632515289435 {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const hashedPass = await hash('teste123', 8);

    queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('users')
      .values([
        {
          id: uuid(),
          name: 'Admin Name',
          email: 'admin@example.com',
          password: hashedPass,
          admin: true,
        },
        {
          id: uuid(),
          name: 'User Name',
          email: 'user@example.com',
          password: hashedPass,
          admin: false,
        },
      ])
      .execute();
  }
}
