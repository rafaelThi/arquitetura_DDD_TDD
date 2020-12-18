import { Router } from 'express';
import { parseISO } from 'date-fns';// startOfHour inicia a hora no Zero ----- parseISO converte de string para objetoDate
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { container } from 'tsyringe';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/list', async (request, response) => {
//   console.log(request.user);
//   const appointments = await appointmentsRepository.find();
// // comentar temporariamente
//   return response.json(appointments);
// });

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);// alterando a hora

  const createAppointement = container.resolve(CreateAppointmentService);

  const appointment = await createAppointement.execute({ date: parsedDate, provider_id });

  return response.json(appointment);
});

export default appointmentsRouter;
