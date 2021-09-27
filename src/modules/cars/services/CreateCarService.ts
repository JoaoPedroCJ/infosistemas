import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ICarsRepository from '../repositories/ICarsRepository';

import Car from '../infra/typeorm/entities/Car';
import ICreateCarsDTO from '../dtos/ICreateCarsDTO';

@injectable()
class CreateCarService {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    ano,
    chassi,
    marca,
    modelo,
    placa,
    renavam,
  }: ICreateCarsDTO): Promise<Car> {
    const sanitizedPlaca = placa
      .normalize('NFD')
      .replace(/[\u0300-\u036f\-]/g, '')
      .toUpperCase();

    const checkCarExists =
      (await this.carsRepository.findByChassi(chassi)) ??
      (await this.carsRepository.findByRenavam(renavam)) ??
      (await this.carsRepository.findByPlaca(sanitizedPlaca));

    if (checkCarExists) {
      throw new AppError('Car already in database.', 400);
    }

    const car = await this.carsRepository.create({
      ano,
      chassi,
      marca,
      modelo,
      placa: sanitizedPlaca,
      renavam,
    });

    await this.cacheProvider.invalidatePrefix('cars-list');

    return car;
  }
}

export default CreateCarService;
