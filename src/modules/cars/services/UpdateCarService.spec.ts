import AppError from '@shared/errors/AppError';

import FakeCarsRepository from '../repositories/fakes/FakeCarsRepository';
import Car from '../infra/typeorm/entities/Car';
import UpdateCarService from './UpdateCarService';

let fakeCarsRepository: FakeCarsRepository;
let updateCar: UpdateCarService;

let defaultCar: Car;

describe('UpdateCar', () => {
  beforeEach(() => {
    fakeCarsRepository = new FakeCarsRepository();

    updateCar = new UpdateCarService(fakeCarsRepository);
  });

  beforeEach(async () => {
    defaultCar = await fakeCarsRepository.create({
      marca: 'Envemo',
      modelo: 'Camper 4x4 2.5 Diesel',
      ano: '1991',
      renavam: '25636793600',
      placa: 'HQA6017',
      chassi: '9B9VZOVKTXO6U4CUO',
    });

    await fakeCarsRepository.create({
      marca: 'Asia Motors',
      modelo: 'Hi-Topic Van 2.7 Diesel (furg',
      ano: '1994',
      renavam: '15534916200',
      placa: 'NAD0733',
      chassi: '9B9ZTXU5IMRLAV6OF',
    });

    await fakeCarsRepository.create({
      marca: 'Ford',
      modelo: 'EcoSport TITANIUM 1.6 16V Flex 5p',
      ano: '2013',
      renavam: '42084602711',
      placa: 'HVM0002',
      chassi: '9B91086HOO5JCGI9H',
    });
  });

  it('should be able to update a car', async () => {
    const car = await updateCar.execute({
      id: defaultCar.id,
      placa: 'KCS-2937',
    });

    expect(car.placa).toBe('KCS2937');
  });

  it('should not be able to update non existing a car', async () => {
    await expect(
      updateCar.execute({
        id: '472dc081-5464-4bdc-99a9-75eabcbe140f',
        placa: 'KCS-2937',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
