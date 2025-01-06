import { NextResponse } from "next/server";
import connectDB from '@/app/lib/connectDB';
import Marker from '@/models/Marker';

export async function GET(request: Request, {params}: {params: { id: string }}) {
    await connectDB();
    try {
        const marker = await Marker.findById(params.id)
            .select('title description tag imageFiles link category subcategory coordinates')
            .exec();
        
        if (!marker) {
            return NextResponse.json(
                { error: "Marker not found" },
                { status: 404 }
            );
        }
        
        console.log('Marker found:', marker);
        return NextResponse.json(marker);
    } catch(error) {
        console.error('Error fetching marker:', error);
        return NextResponse.json(
            { error: "Error fetching marker" },
            { status: 500 }
        );
    }
}