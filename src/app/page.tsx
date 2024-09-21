// app/page.tsx o pages/index.tsx
import dynamic from 'next/dynamic';
import VerticalNav from '../components/VerticalNav';
// Cargamos el componente Map dinámicamente solo en el cliente
const Map = dynamic(() => import('../components/Map'), { ssr: false });

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ display: 'flex', flex: 1 }}>
        <div style={{ width: '250px', minWidth: '200px' }}>
          <VerticalNav />
        </div>
        <div style={{ flex: 1 }}>
          <Map />
        </div>
      </div>
    </div>
  );
}
