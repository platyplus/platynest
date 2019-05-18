import { SignInDto } from './signin.dto';
import { IsSameAs } from '../../common/validators/is-same-as';
import { IsUserAlreadyExists } from '../validators/user-exists';

export class SignUpDto extends SignInDto {
  @IsSameAs('password', {
    message: `The passwords don't match.`,
  })
  confirmPassword: string;

  @IsUserAlreadyExists()
  email: string;
}
