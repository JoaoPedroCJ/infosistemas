import Car from '../infra/typeorm/entities/Car';
import ICreateCarsDTO from '../dtos/ICreateCarsDTO';

export interface ICarsFilter {
  ano?: string;
  marca?: string;
  modelo?: string;
}

export default interface ICarsRepository {
  create(data: ICreateCarsDTO): Promise<Car>;
  save(car: Car): Promise<Car>;
  remove(id: string): Promise<void>;
  list(filer: ICarsFilter): Promise<Car[]>;
  findById(id: string): Promise<Car | undefined>;
  findByPlaca(placa: string): Promise<Car | undefined>;
  findByChassi(chassi: string): Promise<Car | undefined>;
  findByRenavam(renavam: string): Promise<Car | undefined>;
}
