import { NextApiRequest, NextApiResponse } from 'next';
import connectMongo from '@/app/lib/dbConnect'; // Asegúrate de que la ruta de importación es correcta
import Marker from '@/models/Marker'; // Importa tu modelo de marcador

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  await connectMongo();

  try {
    const newMarker = new Marker(req.body);
    await newMarker.save();
    res.status(201).json({ success: true, data: newMarker });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ success: false, error: error.message });
    } else {
      res.status(400).json({ success: false, error: 'Error desconocido' });
    }
  }
}
