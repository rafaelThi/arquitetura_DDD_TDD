/* eslint-disable camelcase */
import { getRepository, Repository } from 'typeorm';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointments';
import IAppointmentRepository from '@modules/appointments/repositories/IAppontimentsRepository';

import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

class AppointmentsRepository implements IAppointmentRepository {
  private ormRepository: Repository<Appointment>

  constructor() {
    this.ormRepository = getRepository(Appointment);
    // criando o repositorio buscando de Appointments
  }

  public async findByDate(date: Date) : Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return findAppointment || undefined;
  }

  public async create({ date, provider_id }:ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ date, provider_id });

    await this.ormRepository.save(appointment);

    return appointment;
  }

  public async getAll() {
    const allAppointments = this.ormRepository.find();
    return allAppointments;
  }
}
export default AppointmentsRepository;
