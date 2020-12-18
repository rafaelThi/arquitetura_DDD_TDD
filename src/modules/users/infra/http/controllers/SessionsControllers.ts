import { Response, Request } from 'express';
import { container } from 'tsyringe';
import AuthenticateCreateSession from '@modules/users/services/AuthentcateCreateSession';

class SessionsControllers {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const authenticanteUser = container.resolve(AuthenticateCreateSession);

    const authentcateResponseUser = await authenticanteUser.execute({
      email,
      password,
    });

    delete authentcateResponseUser.user.password;

    return response.json(authentcateResponseUser);
  }
}

export default SessionsControllers;
