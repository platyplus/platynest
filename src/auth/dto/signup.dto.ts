import { SignInDto } from './signin.dto';
import { UniqueUser } from '../validators/unique-user.validator';

export class SignUpDto extends SignInDto {
  @UniqueUser()
  email: string;
}
