import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListCarService from '@modules/cars/services/ListCarService';
import CreateCarService from '@modules/cars/services/CreateCarService';
import SearchCarChassiService from '@modules/cars/services/SearchCarChassiService';
import SearchCarPlacaService from '@modules/cars/services/SearchCarPlacaService';
import SearchCarRenavamService from '@modules/cars/services/SearchCarRenavamService';
import SearchCarIdService from '@modules/cars/services/SearchCarIdService';
import RemoveCarService from '@modules/cars/services/RemoveCarService';
import UpdateCarService from '@modules/cars/services/UpdateCarService';
import { ICarsFilter } from '@modules/cars/repositories/ICarsRepository';

export default class CarsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { ano, chassi, marca, modelo, placa, renavam } = request.body;

    const createCar = container.resolve(CreateCarService);

    const car = await createCar.execute({
      ano,
      chassi,
      marca,
      modelo,
      placa,
      renavam,
    });

    return response.status(201).json(car);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const { ano, marca, modelo } = request.query as ICarsFilter;

    const listCar = container.resolve(ListCarService);

    const cars = await listCar.execute({
      ano,
      marca,
      modelo,
    });

    return response.status(200).json(cars);
  }

  public async findPlaca(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { placa } = request.params;

    const searchCar = container.resolve(SearchCarPlacaService);

    const car = await searchCar.execute(placa);

    return response.status(200).json(car);
  }

  public async findChassi(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { chassi } = request.params;

    const searchCar = container.resolve(SearchCarChassiService);

    const car = await searchCar.execute(chassi);

    return response.status(200).json(car);
  }

  public async findRenavam(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { renavam } = request.params;

    const searchCar = container.resolve(SearchCarRenavamService);

    const car = await searchCar.execute(renavam);

    return response.status(200).json(car);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const searchCar = container.resolve(SearchCarIdService);

    const car = await searchCar.execute(id);

    return response.status(200).json(car);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { placa } = request.body;

    const updateCar = container.resolve(UpdateCarService);

    const car = await updateCar.execute({ id, placa });

    return response.status(200).json(car);
  }

  public async remove(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const removeCar = container.resolve(RemoveCarService);

    await removeCar.execute(id);

    return response.status(200).json({ message: 'Successfully removed car!' });
  }
}
