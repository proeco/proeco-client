import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI as string;

const client: MongoClient = new MongoClient(uri);
export const clientPromise: Promise<MongoClient> = client.connect();

if (!process.env.MONGO_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}
