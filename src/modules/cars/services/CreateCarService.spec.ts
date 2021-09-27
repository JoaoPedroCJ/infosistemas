import AppError from '@shared/errors/AppError';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeCarsRepository from '../repositories/fakes/FakeCarsRepository';
import CreateCarService from './CreateCarService';

let fakeCarsRepository: FakeCarsRepository;
let fakeCacheProvider: FakeCacheProvider;
let createCar: CreateCarService;

describe('CreateCar', () => {
  beforeEach(() => {
    fakeCarsRepository = new FakeCarsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    createCar = new CreateCarService(fakeCarsRepository, fakeCacheProvider);
  });

  it('should be able to create a new car', async () => {
    const car = await createCar.execute({
      marca: 'Dodge',
      modelo: 'JOURNEY RT 2.7 V6 185cv Aut.',
      ano: '2010',
      renavam: '44554017883',
      placa: 'LHI-3523',
      chassi: '9B9IPNJ07WQUSLBKS',
    });

    expect(car).toHaveProperty('id');
  });

  it('should not be able to create a new car with same chassi from another', async () => {
    await createCar.execute({
      marca: 'Envemo',
      modelo: 'Camper 2.5/GL/GLS/Master 4.1',
      ano: '1990',
      renavam: '28849020891',
      placa: 'MQF-5894',
      chassi: '9B96QBWYG4WF1T242',
    });

    await expect(
      createCar.execute({
        marca: 'CBT Jipe',
        modelo: 'Javali 3.0 4x4 Diesel',
        ano: '1988',
        renavam: '47317161802',
        placa: 'JZK-8027',
        chassi: '9B96QBWYG4WF1T242',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new car with same renavam from another', async () => {
    await createCar.execute({
      marca: 'Honda',
      modelo: 'Civic Sedan LX 1.6 16V Aut. 4p',
      ano: '1997',
      renavam: '65795352144',
      placa: 'MZN-8044',
      chassi: '9B9E4P0LEF2MBGAIM',
    });

    await expect(
      createCar.execute({
        marca: 'Fyber',
        modelo: 'Buggy 2000W 1.6 8V',
        ano: '2016',
        renavam: '65795352144',
        placa: 'NER-4768',
        chassi: '9B93D9QGKYEHQ0QR6',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new car with same placa from another', async () => {
    await createCar.execute({
      marca: 'VW - VolksWagen',
      modelo: 'VOYAGE  Trendline 1.0 T.Flex 8V 4p',
      ano: '2015',
      renavam: '82003963122',
      placa: 'MUE-9174',
      chassi: '9B9CCXYQKOY9C0ZCS',
    });

    await expect(
      createCar.execute({
        marca: 'LOBINI',
        modelo: 'H1 1.8 20V Turbo 180cv 2p',
        ano: '2005',
        renavam: '24988145992',
        placa: 'MUE-9174',
        chassi: '9B9QLQ37WH8ROKQDS',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
