import {useState} from 'react'
import ImageCarousel from "./ImageCarousel"
import {Marker, Popup} from 'react-leaflet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { categoryColors, subcategoryIcons } from './MarkerForm';
import { divIcon } from 'leaflet';
import { renderToString } from 'react-dom/server';

type MarkerType = {
    _id: string;
    title: string;
    category: string;
    subcategory: string;
    coordinates: [number, number]
}

type ExtendedMarker = {
    description?: string;
    tag?: string;
    imageFiles?: string[];
    link?: string;
    title: string;
    category: string;
    subcategory: string;
    coordinates: [number, number];
};

const createCustomIcon = (category: string, subcategory: string) => {
    const iconHtml = renderToString(
        <div className="custom-marker-icon">
            <FontAwesomeIcon
                icon={subcategoryIcons[subcategory]}
                style={{ 
                    color: categoryColors[category],
                    fontSize: '24px'
                }}
            />
        </div>
    );

    return divIcon({
        html: iconHtml,
        className: 'custom-div-icon',
        iconSize: [30, 30],
        iconAnchor: [15, 30]
    });
};

export default function MarkerPopup({marker}: {marker: MarkerType}) {
    const [extendedMarker, setExtendedMarker] = useState<ExtendedMarker | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    

    const fetchMarkerDetails = async () => {
        console.log('🎯 Intentando cargar detalles del marcador:', marker._id);
        setIsLoading(true);

        try {
            const url = `/api/marker/${marker._id}`;
            console.log('📍 Intentando fetch a:', url);
            
            const response = await fetch(url);
            console.log('📥 Response status:', response.status);
            
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            console.log('📦 Datos recibidos:', data);
            setExtendedMarker(data);
        } catch (error) {
            console.error('❌ Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Marker 
            position={marker.coordinates}
            icon={createCustomIcon(marker.category, marker.subcategory)}
            eventHandlers={{
                click: () => {
                    console.log('🎯 Marcador clickeado');
                    fetchMarkerDetails();
                }
            }}
        >
            <Popup 
                minWidth={250} 
                maxWidth={400} 
            >
                <div className="popup-content">
                    <div className="flex flex-col items-center mb-4">
                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 mb-2">
                            <FontAwesomeIcon
                                icon={subcategoryIcons[marker.subcategory]}
                                className="text-2xl"
                                style={{ 
                                    color: categoryColors[marker.category]
                                }}
                            />
                        </div>
                        <h3 className="text-lg font-semibold text-center">{marker.title}</h3>
                    </div>
                    {isLoading ? (
                        <p>Cargando detalles...</p>
                    ) : (
                        <>
                            <p className="text-sm mb-3">
                                {extendedMarker?.description || 'No hay descripción disponible'}
                            </p>
                            <small className="text-xs text-gray-400 italic">
                                {extendedMarker?.tag || 'Sin etiqueta'}
                            </small>
                            <p className="text-sm text-gray-500">
                                {marker.category} - {marker.subcategory}
                            </p>
                            {extendedMarker?.imageFiles && extendedMarker.imageFiles.length > 0 ? (
                                <ImageCarousel imageFiles={extendedMarker.imageFiles} />
                            ) : (
                                <p className="text-xs text-gray-400 italic">No hay imágenes disponibles</p>
                            )}
                        </>
                    )}
                </div>
            </Popup>
        </Marker>
    );
}
