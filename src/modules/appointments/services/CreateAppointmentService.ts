/* eslint-disable camelcase */
import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointments';
import AppError from '@shared/errors/AppError';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppontimentsRepository';

// os erros;
// 1° recebimentos das informacoes
// 2°Tratamento de erros/excessoes
// 3° acesso ao repositorio

interface IRequestDTO {
  date: Date;
  provider_id: string;
}

class CreateAppointmentsService {
  public async execute({ date, provider_id }:IRequestDTO): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate);

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already Booked');
    }

    const appointment = await appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });
    return appointment;
  }
}
export default CreateAppointmentsService;
