import { Response, Request } from 'express';
import { container } from 'tsyringe';
import ResetPasswordService from '@modules/users/services/ResetPasswordService';

class ResetPasswordContoller {
  public async create(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body;
    console.log(token);
    const resetPassword = container.resolve(ResetPasswordService);

    await resetPassword.execute({ password, token });

    return response.status(204);
    // 204, uma resposta ue deu sucesso, porém sem corpo
  }
}

export default ResetPasswordContoller;
