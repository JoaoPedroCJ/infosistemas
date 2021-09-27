import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ICarsRepository from '../repositories/ICarsRepository';

@injectable()
class SearchCarRenavamService {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(id: string): Promise<void> {
    const car = await this.carsRepository.findById(id);

    if (!car) {
      throw new AppError('Car not found', 404);
    }

    await this.carsRepository.remove(id);

    await this.cacheProvider.invalidatePrefix('cars-list');
  }
}

export default SearchCarRenavamService;
