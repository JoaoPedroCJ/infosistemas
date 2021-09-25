import { uuid } from 'uuidv4';

import Car from '@modules/cars/infra/typeorm/entities/Car';
import ICreateCarsDTO from '@modules/cars/dtos/ICreateCarsDTO';

import ICarsRepository from '../ICarsRepository';

class FakeCarsRepository implements ICarsRepository {
  private cars: Car[] = [];

  public async create(carData: ICreateCarsDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, { id: uuid() }, carData);

    this.cars.push(car);

    return car;
  }

  public async save(car: Car): Promise<Car> {
    const findIndex = this.cars.findIndex(findCar => findCar.id === car.id);

    this.cars[findIndex] = car;

    return car;
  }

  public async remove(car: Car): Promise<void> {
    const findIndex = this.cars.findIndex(findCar => findCar.id === car.id);
    if (findIndex > -1) {
      this.cars = this.cars.splice(findIndex, 1);
    }
  }

  public async findById(id: string): Promise<Car | undefined> {
    const findCar = this.cars.find(car => car.id === id);

    return findCar;
  }

  public async findByPlaca(placa: string): Promise<Car | undefined> {
    const findCar = this.cars.find(car => car.placa === placa);

    return findCar;
  }

  public async findByChassi(chassi: string): Promise<Car | undefined> {
    const findCar = this.cars.find(car => car.chassi === chassi);

    return findCar;
  }

  public async findByRenavam(renavam: string): Promise<Car | undefined> {
    const findCar = this.cars.find(car => car.renavam === renavam);

    return findCar;
  }

  public async findByModelo(modelo: string): Promise<Car[]> {
    const regex = new RegExp(
      modelo
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase(),
      'g',
    );

    const cars = this.cars.filter(car =>
      car.modelo
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .match(regex),
    );

    return cars;
  }

  public async findByMarca(marca: string): Promise<Car[]> {
    const regex = new RegExp(
      marca
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase(),
      'g',
    );

    const cars = this.cars.filter(car =>
      car.marca
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .match(regex),
    );

    return cars;
  }

  public async findByAno(ano: string): Promise<Car[]> {
    const regex = new RegExp(ano, 'g');

    const cars = this.cars.filter(car => car.ano.match(regex));

    return cars;
  }
}

export default FakeCarsRepository;
