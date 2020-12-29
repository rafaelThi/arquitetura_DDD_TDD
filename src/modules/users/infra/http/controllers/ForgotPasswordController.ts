import { Response, Request } from 'express';
import { container } from 'tsyringe';
import ForgotPasswordEmailService from '@modules/users/services/ForgotPasswordEmailService';

class ForgotPasswordContoller {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;
    const forgotPasswordEmailService = container.resolve(ForgotPasswordEmailService);

    await forgotPasswordEmailService.execute({
      email,
    });

    return response.send(204).json();
    // 204, uma resposta ue deu sucesso, porém sem corpo
  }
}

export default ForgotPasswordContoller;
