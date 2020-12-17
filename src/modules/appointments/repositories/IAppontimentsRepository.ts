// o I no inicio indica que é apenas uma interface.

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointments';

import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';

interface IAppontimentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date):Promise<Appointment | undefined>;
}

export default IAppontimentsRepository;
