import {useState, useEffect} from 'react'
import ImageCarousel from "./ImageCarousel"
import {Marker, Popup} from 'react-leaflet';
type MarkerType = {
    _id: string;
    title: string;
    category: string;
    subcategory: string;
    position: [number, number]
}
export default function MarkerPopup({marker}: {marker: MarkerType}) {
    const [extendedMarker, setExtendedMarker] = useState({})

    useEffect(() => {
        // Cargar marcadores desde la base de datos al iniciar
        const fetchMarkers = async () => {
        try {
        const response = await fetch('/api/marker/' + marker._id);
            if (!response.ok) {
            throw new Error('Error al cargar el marcador');
            }
            const data = await response.json()
            setExtendedMarker(data);
        } catch (error) {
            console.error('Error al obtener el marcador:', error);
        }
        };

        fetchMarkers();
    }, []);
    const description = extendedMarker.description;
    const tag = extendedMarker.tag;
    const imageFiles: string[] = extendedMarker.imageFiles;
    return(
        <Marker position={marker.position}>
            <Popup minWidth={250} maxWidth={400}>
                <div className="popup-content">
                <h3 className="text-lg font-semibold mb-2">{marker.title}</h3>
                <p className="text-sm mb-3">{description}</p>
                <small className="text-xs text-gray-400 italic">{tag}</small>
                <p className="text-sm text-gray-500">{marker.category} - {marker.subcategory}</p>
                
                {imageFiles && imageFiles.length > 0 ? (
                    <ImageCarousel imageFiles={imageFiles} />
                ) : (
                    <p className="text-xs text-gray-400 italic">No hay imágenes disponibles</p>
                )}
                </div>
                </Popup>
            </Marker>
    )
}
