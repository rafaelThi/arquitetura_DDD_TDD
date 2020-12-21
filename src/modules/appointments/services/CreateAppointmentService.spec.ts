import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentRepository';
import AppError from '@shared/errors/AppError';

import CreatAppontmentService from './CreateAppointmentService';

describe('CreatAppontment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointRepo = new FakeAppointmentsRepository();
    const createAppointment = new CreatAppontmentService(fakeAppointRepo);

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123');
  });

  it('should not be able to create two appointment on same time', async () => {
    const fakeAppointRepo = new FakeAppointmentsRepository();
    const createAppointment = new CreatAppontmentService(fakeAppointRepo);

    const date = new Date(2020, 11, 21, 16);

    await createAppointment.execute({
      date,
      provider_id: '123123',
    });

    expect(createAppointment.execute({
      date,
      provider_id: '123123',
    })).rejects.toBeInstanceOf(AppError);
  });
});
