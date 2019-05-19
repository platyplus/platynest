import { SignInDto } from './signin.dto';
import { IsSameAs } from '../../common/validators/is-same-as';
import { UniqueUser } from '../validators/unique-user.validator';

export class SignUpDto extends SignInDto {
  @IsSameAs('password', {
    message: `The passwords don't match.`,
  })
  confirmPassword: string;

  @UniqueUser()
  email: string;
}
