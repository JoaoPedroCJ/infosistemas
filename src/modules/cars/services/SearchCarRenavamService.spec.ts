import AppError from '@shared/errors/AppError';

import FakeCarsRepository from '../repositories/fakes/FakeCarsRepository';
import Car from '../infra/typeorm/entities/Car';
import SearchCarRenavamService from './SearchCarRenavamService';

let fakeCarsRepository: FakeCarsRepository;
let searchCar: SearchCarRenavamService;

let defaultCar: Car;

describe('SearchCarRenavam', () => {
  beforeEach(() => {
    fakeCarsRepository = new FakeCarsRepository();

    searchCar = new SearchCarRenavamService(fakeCarsRepository);
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

  it('should be able to find a car by renavam', async () => {
    const car = await searchCar.execute('25636793600');

    expect(car).toEqual(defaultCar);
  });

  it('should not be able to find a car by renavam with wrong code', async () => {
    await expect(searchCar.execute('18145146483')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
