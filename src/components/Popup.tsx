import {useState, useEffect} from 'react'
import ImageCarousel from "./ImageCarousel"
import {Marker, Popup} from 'react-leaflet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faWhatsapp, 
    faTwitter, 
    faFacebook 
} from '@fortawesome/free-brands-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';
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

export default function MarkerPopup({
    marker, 
    onPopupOpen, 
    onPopupClose
}: {
    marker: MarkerType;
    onPopupOpen: () => void;
    onPopupClose: () => void;
}) {
    const [extendedMarker, setExtendedMarker] = useState<ExtendedMarker | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsOpen(false);
        onPopupClose();
    };

    const fetchMarkerDetails = async () => {
        console.log('🎯 Intentando cargar detalles del marcador:', marker._id);
        setIsOpen(true);
        onPopupOpen();
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

    const popupContent = (
        <div className="popup-content">
            <div className="flex flex-col items-center mb-2">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 mb-1">
                    <FontAwesomeIcon
                        icon={subcategoryIcons[marker.subcategory]}
                        className="text-2xl"
                        style={{ 
                            color: categoryColors[marker.category]
                        }}
                    />
                </div>
                <p className="text-sm text-gray-500 text-center">
                    {marker.category} - {marker.subcategory}
                </p>
            </div>
            <h3 className="text-lg font-semibold text-center">{marker.title}</h3>
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
                   
                    {extendedMarker?.imageFiles && extendedMarker.imageFiles.length > 0 ? (
                        <ImageCarousel imageFiles={extendedMarker.imageFiles} />
                    ) : (
                        <p className="text-xs text-gray-400 italic">No hay imágenes disponibles</p>
                    )}
                    
                    {/* Botones de compartir */}
                    <div className="mt-4 pt-3 border-t border-gray-200">
                        <p className="text-sm text-gray-600 mb-2">Compartir:</p>
                        <div className="flex space-x-4 justify-center">
                            <button
                                onClick={() => handleShare('whatsapp')}
                                className="p-2 hover:bg-green-50 rounded-full transition-colors"
                                title="Compartir en WhatsApp"
                            >
                                <FontAwesomeIcon icon={faWhatsapp} className="text-green-500 text-xl" />
                            </button>
                            <button
                                onClick={() => handleShare('twitter')}
                                className="p-2 hover:bg-blue-50 rounded-full transition-colors"
                                title="Compartir en Twitter"
                            >
                                <FontAwesomeIcon icon={faTwitter} className="text-blue-400 text-xl" />
                            </button>
                            <button
                                onClick={() => handleShare('facebook')}
                                className="p-2 hover:bg-blue-50 rounded-full transition-colors"
                                title="Compartir en Facebook"
                            >
                                <FontAwesomeIcon icon={faFacebook} className="text-blue-600 text-xl" />
                            </button>
                            <button
                                onClick={() => handleShare('copy')}
                                className="p-2 hover:bg-gray-50 rounded-full transition-colors"
                                title="Copiar enlace"
                            >
                                <FontAwesomeIcon icon={faLink} className="text-gray-500 text-xl" />
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );

    return (
        <Marker 
            position={marker.coordinates}
            icon={createCustomIcon(marker.category, marker.subcategory)}
            eventHandlers={{
                click: fetchMarkerDetails
            }}
        >
            {isMobile ? (
                isOpen && (
                    <div 
                        className="marker-popup-overlay"
                        onClick={handleClose}
                    >
                        <div 
                            className="marker-popup-mobile"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button 
                                onClick={handleClose}
                                className="absolute top-2 right-2 text-gray-500 p-2"
                            >
                                ✕
                            </button>
                            {popupContent}
                        </div>
                    </div>
                )
            ) : (
                <Popup 
                    minWidth={250} 
                    maxWidth={400}
                    onClose={() => {
                        setIsOpen(false);
                        onPopupClose();
                    }}
                >
                    {popupContent}
                </Popup>
            )}
        </Marker>
    );
}
