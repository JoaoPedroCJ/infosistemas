import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICarsRepository from '../repositories/ICarsRepository';

import Car from '../infra/typeorm/entities/Car';

@injectable()
class SearchCarIdService {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  public async execute(id: string): Promise<Car | undefined> {
    const car = await this.carsRepository.findById(id);

    if (!car) {
      throw new AppError('Car not found', 404);
    }

    return car;
  }
}

export default SearchCarIdService;
