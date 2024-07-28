import { MongoClient } from 'mongodb';

const uri = process.env.REACT_APP_MONGO_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export const connectDB = async () => {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db("");
  } catch (err) {
    console.error(err);
  }
};
