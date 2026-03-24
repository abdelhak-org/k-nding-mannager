import { MongoClient, type Db } from "mongodb";
import { env } from "@/lib/env";

declare global {
  var __mongoClientPromise__: Promise<MongoClient> | undefined;
}

const client = new MongoClient(env.MONGODB_URI);

const clientPromise = global.__mongoClientPromise__ ?? client.connect();

if (process.env.NODE_ENV !== "production") {
  global.__mongoClientPromise__ = clientPromise;
}

export async function getDatabase(): Promise<Db> {
  const connectedClient = await clientPromise;
  return connectedClient.db();
}

export async function getCollection<TDocument extends object>(name: string) {
  const database = await getDatabase();
  return database.collection<TDocument>(name);
}
