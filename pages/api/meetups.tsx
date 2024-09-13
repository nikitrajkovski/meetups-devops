import clientPromise from "../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';

const cors = Cors({
  methods: ['GET', 'POST', 'OPTIONS'], // Allow these methods
  origin: 'http://localhost:3000', // Allow requests from this origin
});

function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await runMiddleware(req, res, cors);

  try {
    const client = await clientPromise;
    const db = client.db("meetups");

    if (req.method === "GET") {
      // Handle GET request (fetch meetups)
      const meetups = await db.collection("meetups").find({}).limit(10).toArray();
      res.status(200).json(meetups);

    } else if (req.method === "POST") {
      // Handle POST request (create a new meetup)
      const meetupData = req.body;

      if (!meetupData.title || !meetupData.address || !meetupData.description || !meetupData.image) {
        res.status(400).json({ message: "Missing required fields" });
        return;
      }

      const result = await db.collection("meetups").insertOne(meetupData);
      res.status(201).json({ message: 'Meetup added', meetupId: result.insertedId });

    } else {
      // Method not allowed
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} not allowed`);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
