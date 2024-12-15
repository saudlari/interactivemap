import { NextResponse } from "next/server";
import connectDB from '@/app/lib/connectDB';
import Marker from '@/models/Marker';

export async function GET(request: Request, {params}: {params: { id: string }}) {
    await connectDB();
    try {
        const marker = await Marker.findById(params.id).exec()
        return NextResponse.json(marker)
    } catch(e) {
        return NextResponse.json({"error": "Marker not found"})
    }
}