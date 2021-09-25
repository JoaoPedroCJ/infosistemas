import { getRepository, Repository } from 'typeorm';

import ICreateCarsDTO from '@modules/cars/dtos/ICreateCarsDTO';
import ICarsRepository from '@modules/cars/repositories/ICarsRepository';

import Car from '../entities/Car';

class FakeCarsRepository implements ICarsRepository {
  private ormRepository: Repository<Car>;

  constructor() {
    this.ormRepository = getRepository(Car);
  }

  public async create(carData: ICreateCarsDTO): Promise<Car> {
    const car = this.ormRepository.create(carData);

    await this.ormRepository.save(car);

    return car;
  }

  public async save(car: Car): Promise<Car> {
    return this.ormRepository.save(car);
  }

  public async remove(car: Car): Promise<void> {
    this.ormRepository.delete(car);
  }

  public async findById(id: string): Promise<Car | undefined> {
    const findCar = await this.ormRepository.findOne(id);

    return findCar;
  }

  public async findByPlaca(placa: string): Promise<Car | undefined> {
    const findCar = await this.ormRepository.findOne({ where: { placa } });

    return findCar;
  }

  public async findByChassi(chassi: string): Promise<Car | undefined> {
    const findCar = await this.ormRepository.findOne({ where: { chassi } });

    return findCar;
  }

  public async findByRenavam(renavam: string): Promise<Car | undefined> {
    const findCar = await this.ormRepository.findOne({ where: { renavam } });

    return findCar;
  }

  public async findByModelo(modelo: string): Promise<Car[]> {
    const cars = await this.ormRepository.find({
      where: { modelo: `%${modelo}%` },
    });

    return cars;
  }

  public async findByMarca(marca: string): Promise<Car[]> {
    const cars = await this.ormRepository.find({
      where: { marca: `%${marca}%` },
    });

    return cars;
  }

  public async findByAno(ano: string): Promise<Car[]> {
    const cars = await this.ormRepository.find({
      where: { ano },
    });

    return cars;
  }
}

export default FakeCarsRepository;
