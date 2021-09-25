import { Request, Response } from 'express';
// import { container } from 'tsyringe';

export default class CarsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const car_id = request.user.id;

    return response.json(car_id);
  }
}
