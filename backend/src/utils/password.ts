import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scryptAsync = promisify(scrypt);

export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const key = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${salt}:${key.toString("hex")}`;
}

export async function verifyPassword(password: string, storedPassword: string) {
  const [salt, keyHex] = storedPassword.split(":");

  if (!salt || !keyHex) return;

  const storedKey = Buffer.from(keyHex, "hex");
  const key = (await scryptAsync(password, salt, 64)) as Buffer;

  return timingSafeEqual(key, storedKey);
}
