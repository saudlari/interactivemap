'use client'

import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function Terms() {
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

          <h1 className="text-3xl font-bold mb-6 text-[#004f59]">Términos de Servicio</h1>
          
          <div className="prose prose-lg">
            <p className="text-gray-600 mb-6">
              Última actualización: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-[#004f59]">
                1. Aceptación de los Términos
              </h2>
              <p className="text-gray-600 mb-4">
                Al acceder y utilizar esta aplicación, aceptas estar sujeto a estos términos de servicio. 
                Si no estás de acuerdo con alguna parte de estos términos, no podrás usar nuestros servicios.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-[#004f59]">
                2. Uso del Servicio
              </h2>
              <p className="text-gray-600 mb-4">
                Te comprometes a:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Proporcionar información precisa y veraz</li>
                <li>No crear marcadores con contenido ofensivo o ilegal</li>
                <li>No interferir con el funcionamiento normal de la aplicación</li>
                <li>Respetar los derechos de otros usuarios</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-[#004f59]">
                3. Contenido del Usuario
              </h2>
              <p className="text-gray-600 mb-4">
                Al crear marcadores en el mapa, garantizas que:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Tienes el derecho de compartir dicha información</li>
                <li>El contenido no infringe derechos de terceros</li>
                <li>La información es precisa y actualizada</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-[#004f59]">
                4. Modificaciones del Servicio
              </h2>
              <p className="text-gray-600 mb-4">
                Nos reservamos el derecho de:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Modificar o discontinuar el servicio en cualquier momento</li>
                <li>Actualizar estos términos cuando sea necesario</li>
                <li>Eliminar contenido que viole estos términos</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-[#004f59]">
                5. Limitación de Responsabilidad
              </h2>
              <p className="text-gray-600 mb-4">
                No nos hacemos responsables de:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>La precisión de la información proporcionada por usuarios</li>
                <li>Pérdidas o daños derivados del uso de la aplicación</li>
                <li>Interrupciones temporales del servicio</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-[#004f59]">
                6. Contacto
              </h2>
              <p className="text-gray-600">
                Para cualquier consulta sobre estos términos, contáctanos en:
                <br />
                Email: legal@example.com
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
