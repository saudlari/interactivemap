'use client'

import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function About() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        toggleVerticalNav={() => {}} 
        setUserLocation={() => {}}
      />
      
      <main className="flex-grow container mx-auto px-4 py-8 mt-[60px]">
        <div className="max-w-3xl mx-auto">
          <button 
            onClick={() => router.back()}
            className="mb-6 text-[#004f59] hover:text-[#006d7a] transition-colors"
          >
            ← Volver
          </button>

          <h1 className="text-3xl font-bold mb-6 text-[#004f59]">Sobre Nosotros</h1>
          
          <div className="prose prose-lg">
            <p className="text-gray-600 mb-4">
              Somos una plataforma dedicada a mapear y visualizar información relevante 
              sobre conflictos, propuestas e iniciativas en nuestra comunidad.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4 text-[#004f59]">
              Nuestra Misión
            </h2>
            <p className="text-gray-600 mb-4">
              Facilitar la participación ciudadana y la transparencia en la gestión 
              de asuntos comunitarios a través de herramientas de visualización geográfica.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4 text-[#004f59]">
              Contacto
            </h2>
            <p className="text-gray-600">
              Para más información o consultas, puedes contactarnos en:
              <br />
              Email: info@example.com
              <br />
              Teléfono: +34 XXX XXX XXX
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
