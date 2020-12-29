import { Response, Request } from 'express';
import { container } from 'tsyringe';
import ResetPasswordService from '@modules/users/services/ResetPasswordService';

class ResetPasswordContoller {
  public async create(request: Request, response: Response): Promise<Response> {
    const { token, password } = request.body;
    const resetPassword = container.resolve(ResetPasswordService);

    await resetPassword.execute({
      token,
      password,
    });

    return response.send(204).json();
    // 204, uma resposta ue deu sucesso, porém sem corpo
  }
}

export default ResetPasswordContoller;
