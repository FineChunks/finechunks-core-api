import { JwtModuleOptions } from '@nestjs/jwt';

export default (): JwtModuleOptions => ({
  global: true,
  secret: process.env.JWT_SECRET,
  signOptions: {
    expiresIn: process.env.JWT_EXPIRATION,
  },
});
