import { inject, injectable } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ICarsRepository, { ICarsFilter } from '../repositories/ICarsRepository';

import Car from '../infra/typeorm/entities/Car';

@injectable()
class ListCarService {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ ano, marca, modelo }: ICarsFilter): Promise<Car[]> {
    const filter = {
      ano: !ano || ano.length > 1 ? ano : `0${ano}`,
      marca: marca?.normalize('NFD').replace(/[\u0300-\u036f]/g, ''),
      modelo: modelo?.normalize('NFD').replace(/[\u0300-\u036f]/g, ''),
    };

    const cacheKey = `cars-list:${filter.marca}:${filter.modelo}:${filter.ano}`;

    const cars =
      (await this.cacheProvider.recover<Car[]>(cacheKey)) ??
      (await this.carsRepository.list(filter));

    await this.cacheProvider.save(cacheKey, cars);

    return cars;
  }
}

export default ListCarService;
