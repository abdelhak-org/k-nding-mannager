import { ObjectId } from "mongodb";
import { getCollection } from "@/lib/db/mongodb";

export type UserDocument = {
  _id: ObjectId;
  email: string;
  hashedPassword: string;
  displayName: string;
  role: "user";
  createdAt: Date;
  updatedAt: Date;
};

type CreateUserInput = {
  email: string;
  hashedPassword: string;
  displayName: string;
};

const USERS_COLLECTION = "users";

export async function getUsersCollection() {
  return getCollection<UserDocument>(USERS_COLLECTION);
}

export async function ensureUsersIndexes() {
  const users = await getUsersCollection();
  await users.createIndex(
    { email: 1 },
    { unique: true, name: "users_email_unique" },
  );
}

export async function findUserByEmail(email: string) {
  const users = await getUsersCollection();
  return users.findOne({ email: email.toLowerCase() });
}

export async function createUser(input: CreateUserInput) {
  const users = await getUsersCollection();
  const now = new Date();

  const document = {
    email: input.email.toLowerCase(),
    hashedPassword: input.hashedPassword,
    displayName: input.displayName,
    role: "user" as const,
    createdAt: now,
    updatedAt: now,
  };

  const result = await users.insertOne(document);

  return {
    _id: result.insertedId,
    ...document,
  } satisfies UserDocument;
}

export function toPublicUser(user: UserDocument) {
  return {
    id: user._id.toString(),
    email: user.email,
    name: user.displayName,
    role: user.role,
  };
}
