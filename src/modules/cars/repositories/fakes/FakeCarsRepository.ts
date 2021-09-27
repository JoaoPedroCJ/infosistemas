import { v4 } from 'uuid';

import Car from '@modules/cars/infra/typeorm/entities/Car';
import ICreateCarsDTO from '@modules/cars/dtos/ICreateCarsDTO';

import ICarsRepository, { ICarsFilter } from '../ICarsRepository';

class FakeCarsRepository implements ICarsRepository {
  private cars: Car[] = [];

  public async create(carData: ICreateCarsDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, { id: v4() }, carData);

    this.cars.push(car);

    return car;
  }

  public async save(car: Car): Promise<Car> {
    const findIndex = this.cars.findIndex(findCar => findCar.id === car.id);

    this.cars[findIndex] = car;

    return car;
  }

  public async remove(id: string): Promise<void> {
    const cars = this.cars.filter(findCar => findCar.id !== id);

    this.cars = cars;
  }

  public async list(filters: ICarsFilter): Promise<Car[]> {
    const ano = filters.ano ? new RegExp(filters.ano, 'g') : undefined;
    const marca = filters.marca
      ? new RegExp(
          filters.marca.normalize('NFD').replace(/[\u0300-\u036f\-]/g, ''),
          'gi',
        )
      : undefined;
    const modelo = filters.modelo
      ? new RegExp(
          filters.modelo.normalize('NFD').replace(/[\u0300-\u036f\-]/g, ''),
          'gi',
        )
      : undefined;

    const hasFilters = ano ? true : marca ? true : modelo ? true : false;

    if (!hasFilters) {
      return this.cars;
    }

    const cars = this.cars.filter(car => {
      const testAno = ano ? !!car.ano.match(ano) : true;
      const testMarca = marca ? !!car.marca.match(marca) : true;
      const testModelo = modelo ? !!car.modelo.match(modelo) : true;

      return testAno && testMarca && testModelo;
    });

    return cars;
  }

  public async findById(id: string): Promise<Car | undefined> {
    const findCar = this.cars.find(car => car.id === id);

    return findCar;
  }

  public async findByPlaca(placa: string): Promise<Car | undefined> {
    const regex = new RegExp(
      placa.normalize('NFD').replace(/[\u0300-\u036f\-]/g, ''),
      'gi',
    );

    const findCar = this.cars.find(car => car.placa.match(regex));

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
}

export default FakeCarsRepository;
