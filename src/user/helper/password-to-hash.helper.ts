import { hash, compare } from 'bcrypt';

const saltOrRounds = 10;

export async function passwordToHash(password: string): Promise<string> {
  return await hash(password, saltOrRounds);
}

export async function verifyPassword(password: string, encrypted: string): Promise<boolean> {
  return await compare(password, encrypted);
}
