import Car from '../infra/typeorm/entities/Car';
import ICreateCarsDTO from '../dtos/ICreateCarsDTO';

export default interface ICarsRepository {
  create(data: ICreateCarsDTO): Promise<Car>;
  save(Car: Car): Promise<Car>;
  remove(Car: Car): Promise<void>;
  findById(id: string): Promise<Car | undefined>;
  findByPlaca(placa: string): Promise<Car | undefined>;
  findByChassi(chassi: string): Promise<Car | undefined>;
  findByRenavam(renavam: string): Promise<Car | undefined>;
  findByModelo(modelo: string): Promise<Car[]>;
  findByMarca(marca: string): Promise<Car[]>;
  findByAno(ano: string): Promise<Car[]>;
}
