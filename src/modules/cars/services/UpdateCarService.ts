import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICarsRepository from '../repositories/ICarsRepository';

import Car from '../infra/typeorm/entities/Car';

interface IRequest {
  id: string;
  placa: string;
}

@injectable()
class UpdateCarService {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  public async execute({ id, placa }: IRequest): Promise<Car> {
    const car = await this.carsRepository.findById(id);

    if (!car) {
      throw new AppError('Car not found', 404);
    }

    const sanitizedPlaca = placa
      .normalize('NFD')
      .replace(/[\u0300-\u036f\-]/g, '')
      .toUpperCase();

    car.placa = sanitizedPlaca;

    await this.carsRepository.save(car);

    return car;
  }
}

export default UpdateCarService;
