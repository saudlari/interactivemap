'use client'

import { useState } from 'react';
import Joyride, { STATUS, CallBackProps } from 'react-joyride';

interface TutorialGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

const TutorialGuide: React.FC<TutorialGuideProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [showWelcome, setShowWelcome] = useState(true);
  const [runTour, setRunTour] = useState(false);

  const steps = [
    {
      target: '.marker-form-button',
      content: 'Haz clic aquí para abrir los filtros y buscar por categorías y subcategorías',
      placement: 'right',
    },
    {
      target: 'input.w-full.px-3.py-2.text-sm.md\\:text-base.rounded-l-lg',
      content: 'Busca una ubicación específica escribiendo aquí',
      placement: 'bottom',
    },
    {
      target: 'span.hidden.md\\:inline',
      content: 'O usa tu ubicación actual haciendo clic aquí',
      placement: 'left',
    },
    {
      target: '.leaflet-container',
      content: 'Haz clic en cualquier punto del mapa para añadir un nuevo marcador',
      placement: 'center',
    },
    {
      target: '.flex.space-x-4.text-sm.text-gray-600',
      content: 'Encuentra más información sobre el proyecto en estos enlaces',
      placement: 'bottom',
    },
  ];

  const handleStartTour = () => {
    setShowWelcome(false);
    setRunTour(true);
  };

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setRunTour(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {showWelcome ? (
        <div className="bg-white p-6 rounded-lg shadow-xl max-w-md text-center">
          <h2 className="text-xl font-bold mb-4">Bienvenido a la guía tutorial</h2>
          <p className="text-gray-600 mb-4">
            Te guiaremos a través de las principales características de nuestra aplicación.
          </p>
          <div className="flex justify-center">
            <button 
              onClick={handleStartTour}
              className="mt-4 px-4 py-2 bg-[#004f59] text-white rounded hover:bg-[#006d7a] transition-colors duration-300 shadow-lg"
            >
              Comenzar Tour
            </button>
          </div>
        </div>
      ) : (
        <Joyride
          steps={steps}
          run={runTour}
          continuous
          showSkipButton
          showProgress
          styles={{
            options: {
              primaryColor: '#004f59',
              textColor: '#004f59',
            },
          }}
          locale={{
            back: 'Anterior',
            close: 'Cerrar',
            last: 'Finalizar',
            next: 'Siguiente',
            skip: 'Saltar',
          }}
          callback={handleJoyrideCallback}
        />
      )}
    </div>
  );
};

export default TutorialGuide;
