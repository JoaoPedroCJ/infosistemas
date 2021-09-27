import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICarsRepository from '../repositories/ICarsRepository';

import Car from '../infra/typeorm/entities/Car';

@injectable()
class SearchCarPlacaService {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  public async execute(placa: string): Promise<Car | undefined> {
    const car = await this.carsRepository.findByPlaca(placa);

    if (!car) {
      throw new AppError('Car not found', 404);
    }

    return car;
  }
}

export default SearchCarPlacaService;
