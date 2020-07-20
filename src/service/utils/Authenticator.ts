import jwt from 'jsonwebtoken';

export interface AuthenticationData{
  id: string,
  name: string,
  email: string,
};

export class Authenticator{
  private static EXPIRES_IN = '5min';

  public generateToken(input: AuthenticationData): string{
    const token = jwt.sign(
      {
        id: input.id, 
        name: input.name, 
        email: input.email, 
      }, 
      process.env.JWT_KEY as string,
      {expiresIn: "10min"}
    );
    return token;
  };

  public getData(token: string): AuthenticationData{
    const payload = jwt.verify(
      token,
      process.env.JWT_KEY as string
    ) as any;
    const result = {
      id: payload.id,
      name: payload.name,
      email: payload.email,
    };
    return result;
  };
};