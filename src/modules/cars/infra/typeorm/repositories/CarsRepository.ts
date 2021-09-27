import { getRepository, Repository, ILike } from 'typeorm';

import ICreateCarsDTO from '@modules/cars/dtos/ICreateCarsDTO';
import ICarsRepository, {
  ICarsFilter,
} from '@modules/cars/repositories/ICarsRepository';

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

  public async remove(id: string): Promise<void> {
    this.ormRepository.delete(id);
  }

  public async list(filter: ICarsFilter): Promise<Car[]> {
    const { ano, marca, modelo } = filter;

    const cars = await this.ormRepository.find({
      where: {
        ...(modelo && { modelo: ILike(`%${modelo}%`) }),
        ...(marca && { marca: ILike(`%${marca}%`) }),
        ...(ano && { ano: ILike(`%${ano}`) }),
      },
    });

    return cars;
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
}

export default FakeCarsRepository;
