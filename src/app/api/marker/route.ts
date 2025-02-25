import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/connectDB';
import Marker from '@/models/Marker';

export async function POST(request: Request) {
  await connectDB(); // Conectar a MongoDB

  try {
    const body = await request.json();
    console.log('Request body:', body); // Log del cuerpo de la solicitud

    // Validar campos requeridos
    if (!body.title || !body.coordinates) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos: title y coordinates' },
        { status: 400 }
      );
    }

    const marker = await Marker.create(body); // Crear el nuevo marcador en MongoDB
    console.log('Marker created:', marker); // Log del marcador creado
    return NextResponse.json(marker, { status: 201 });
  } catch (error) {
    console.error('Error al crear el marcador:', error); // Log detallado
    return NextResponse.json(
      { error: 'Error al crear el marcador', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function GET() {
  await connectDB(); // Conectar a MongoDB
  const markers = await Marker.find({}, 'title category subcategory coordinates').exec()
  return NextResponse.json(markers)
}
