import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { RegisterDto } from '../../auth/dto/register.dto';

@ValidatorConstraint({ name: 'IsPasswordMatching', async: false })
export class IsPasswordMatchConstraint implements ValidatorConstraintInterface {
  validate(repeatPassword: string, args: ValidationArguments) {
    const obj = args.object as RegisterDto;
    return obj.password === repeatPassword;
  }

  defaultMessage(validationArguments: ValidationArguments) {
    return `Password and ${validationArguments} do not match`;
  }
}
