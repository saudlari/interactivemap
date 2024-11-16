import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/connectDB';
import Marker from '@/models/Marker';

export async function POST(request: Request) {
  await connectDB(); // Conectar a MongoDB

  try {
    const body = await request.json();
    console.log('Request body:', body); // Log del cuerpo de la solicitud
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