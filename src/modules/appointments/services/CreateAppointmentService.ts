import { startOfHour } from 'date-fns';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointments';
import AppError from '@shared/errors/AppError';
import IAppontimentsRepository from '../repositories/IAppontimentsRepository';

// os erros;
// 1° recebimentos das informacoes
// 2°Tratamento de erros/excessoes
// 3° acesso ao repositorio

interface IRequestDTO {
  date: Date;
  provider_id: string;
}

class CreateAppointmentsService {
  private appointmentsRepository: IAppontimentsRepository;
  // criando a variavel

  constructor(appointmentRepository: IAppontimentsRepository) {
    // tipando o que esta recebendo
    this.appointmentsRepository = appointmentRepository;
    // atribuindo novo 'valor' par varaiavel <=
  }
  // podemos trocar essas linhas por:
  // constructor( private appointmentRepository: IAppontimentsRepository) {}

  public async execute({ date, provider_id }:IRequestDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(appointmentDate);

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already Booked');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });
    return appointment;
  }
}
export default CreateAppointmentsService;
