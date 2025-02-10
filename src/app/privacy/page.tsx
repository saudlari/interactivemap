'use client'

import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function Privacy() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar 
        toggleVerticalNav={() => {}} 
        setUserLocation={() => {}}
      />
      
      <main className="flex-grow container mx-auto px-4 py-8 mt-[60px] mb-[60px] overflow-y-auto hide-scrollbar">
        <div className="max-w-3xl mx-auto">
          <button 
            onClick={() => router.back()}
            className="mb-6 text-[#004f59] hover:text-[#006d7a] transition-colors"
          >
            ← Volver
          </button>

          <h1 className="text-3xl font-bold mb-6 text-[#004f59]">Política de Privacidad</h1>
          
          <div className="prose prose-lg">
            <p className="text-gray-600 mb-6">
              Última actualización: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-[#004f59]">
                1. Información que Recopilamos
              </h2>
              <p className="text-gray-600 mb-4">
                Recopilamos la siguiente información cuando utilizas nuestra aplicación:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Ubicación geográfica (solo cuando lo permites)</li>
                <li>Información de los marcadores que creas</li>
                <li>Datos de uso de la aplicación</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-[#004f59]">
                2. Uso de la Información
              </h2>
              <p className="text-gray-600 mb-4">
                Utilizamos la información recopilada para:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Mostrar marcadores relevantes en el mapa</li>
                <li>Mejorar la experiencia del usuario</li>
                <li>Mantener la seguridad de la aplicación</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-[#004f59]">
                3. Compartir Información
              </h2>
              <p className="text-gray-600 mb-4">
                No compartimos tu información personal con terceros sin tu consentimiento, 
                excepto cuando sea requerido por ley.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-[#004f59]">
                4. Tus Derechos
              </h2>
              <p className="text-gray-600 mb-4">
                Tienes derecho a:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Acceder a tus datos personales</li>
                <li>Rectificar tus datos</li>
                <li>Solicitar la eliminación de tus datos</li>
                <li>Oponerte al procesamiento de tus datos</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-[#004f59]">
                5. Contacto
              </h2>
              <p className="text-gray-600">
                Para cualquier consulta sobre nuestra política de privacidad, puedes contactarnos en:
                <br />
                Email: privacy@example.com
                <br />
                Teléfono: +34 XXX XXX XXX
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
