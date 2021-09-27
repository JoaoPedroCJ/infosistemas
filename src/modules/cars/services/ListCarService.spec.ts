import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import Car from '../infra/typeorm/entities/Car';
import FakeCarsRepository from '../repositories/fakes/FakeCarsRepository';
import ListCarService from './ListCarService';

let fakeCarsRepository: FakeCarsRepository;
let fakeCacheProvider: FakeCacheProvider;
let listCar: ListCarService;

let carOne: Car;
let carTwo: Car;
let carThree: Car;

describe('ListCar', () => {
  beforeEach(() => {
    fakeCarsRepository = new FakeCarsRepository();
    fakeCacheProvider = new FakeCacheProvider();

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

  it('should be able to return a list of cars', async () => {
    const cars = await listCar.execute({});

    expect(cars).toEqual([carOne, carTwo, carThree]);
    expect(cars).toHaveLength(3);
  });

  it('should be able to return a list of cars with filter', async () => {
    const cars = await listCar.execute({ ano: '1994' });

    expect(cars).toEqual([carTwo]);
    expect(cars).toHaveLength(1);
  });

  it('should be able to return a list of cars with combined filters', async () => {
    const listEmpty = await listCar.execute({ ano: '1994', marca: 'Ford' });
    const list = await listCar.execute({ ano: '2013', marca: 'Ford' });

    expect(listEmpty).toEqual([]);
    expect(listEmpty).toHaveLength(0);
    expect(list).toEqual([carThree]);
    expect(list).toHaveLength(1);
  });
});
