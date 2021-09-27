import AppError from '@shared/errors/AppError';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeCarsRepository from '../repositories/fakes/FakeCarsRepository';
import Car from '../infra/typeorm/entities/Car';
import RemoveCarService from './RemoveCarService';
import ListCarService from './ListCarService';

let fakeCarsRepository: FakeCarsRepository;
let fakeCacheProvider: FakeCacheProvider;
let removeCar: RemoveCarService;
let listCar: ListCarService;

let carOne: Car;
let carTwo: Car;
let carThree: Car;

describe('RemoveCar', () => {
  beforeEach(() => {
    fakeCarsRepository = new FakeCarsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    removeCar = new RemoveCarService(fakeCarsRepository, fakeCacheProvider);
    listCar = new ListCarService(fakeCarsRepository, fakeCacheProvider);
  });

  beforeEach(async () => {
    carOne = await fakeCarsRepository.create({
      marca: 'Envemo',
      modelo: 'Camper 4x4 2.5 Diesel',
      ano: '1991',
      renavam: '25636793600',
      placa: 'HQA6017',
      chassi: '9B9VZOVKTXO6U4CUO',
    });

    carTwo = await fakeCarsRepository.create({
      marca: 'Asia Motors',
      modelo: 'Hi-Topic Van 2.7 Diesel (furg',
      ano: '1994',
      renavam: '15534916200',
      placa: 'NAD0733',
      chassi: '9B9ZTXU5IMRLAV6OF',
    });

    carThree = await fakeCarsRepository.create({
      marca: 'Ford',
      modelo: 'EcoSport TITANIUM 1.6 16V Flex 5p',
      ano: '2013',
      renavam: '42084602711',
      placa: 'HVM0002',
      chassi: '9B91086HOO5JCGI9H',
    });
  });

  it('should be able to remove a car', async () => {
    await removeCar.execute(carOne.id);

    const cars = await listCar.execute({});

    expect(cars).toEqual([carTwo, carThree]);
    expect(cars).toHaveLength(2);
  });

  it('should not be able to remove a non existing car', async () => {
    await removeCar.execute(carOne.id);

    await expect(removeCar.execute(carOne.id)).rejects.toBeInstanceOf(AppError);
  });
});
