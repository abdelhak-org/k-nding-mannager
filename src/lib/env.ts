import { z } from "zod";

const serverEnvSchema = z.object({
  MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),
  NEXTAUTH_SECRET: z.string().min(1, "NEXTAUTH_SECRET is required"),
  NEXTAUTH_URL: z.string().url().optional(),
});

const publicEnvSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
});

const rawServerEnv = {
  MONGODB_URI: process.env.MONGODB_URI,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
};

const rawPublicEnv = {
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
};

export const serverEnv = serverEnvSchema.parse(rawServerEnv);
export const publicEnv = publicEnvSchema.parse(rawPublicEnv);

export const env = {
  ...serverEnv,
  ...publicEnv,
} as const;

export type Env = typeof env;
export type ServerEnv = typeof serverEnv;
export type PublicEnv = typeof publicEnv;