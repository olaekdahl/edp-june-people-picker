import { MongoClient } from 'mongodb';

const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const collectionName = 'people'

const client = await MongoClient.connect('mongodb://localhost:27017');
const db = client.db(dbName);
const collection = db.collection(collectionName);

export const getAllPeople = async () => {
  const people = await collection.find({}).toArray();
  return people;
};
export const getPerson = async (id) => {
  const person = await collection.findOne({ "id": id });
  return person;
}

export const deletePerson = async (id) => {
  const personToDelete = await collection.findOneAndDelete({ id: +id })
  return personToDelete
}

export const serverEnd = () => client.close();
