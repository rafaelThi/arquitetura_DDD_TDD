import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import { Response, Request } from 'express';
import { container } from 'tsyringe';
import { parseISO } from 'date-fns';// startOfHour inicia a hora no Zero ----- parseISO converte de string para objetoDate
import AppointmentsRepository from '../../typeorm/repositories/AppontimentsRepository';

class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);// alterando a hora

    const createAppointement = container.resolve(CreateAppointmentService);

    const appointment = await createAppointement.execute({ date: parsedDate, provider_id });

    return response.json(appointment);
  }

  public async listAll(request: Request, response: Response): Promise<Response> {
    const appointmentsRepository = new AppointmentsRepository();
    const appointments = await appointmentsRepository.getAll();
    // comentar temporariamente
    return response.json(appointments);
  }
}

export default AppointmentsController;
