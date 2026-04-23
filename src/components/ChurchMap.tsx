import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Custom marker to avoid default icon issues in React/Vite
const customMarkerIcon = L.divIcon({
  html: `<div class="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-xl border border-gray-100 transform transition-transform hover:scale-110">
           <div class="w-8 h-8 rounded-full bg-[#B89B72]/10 flex items-center justify-center">
             <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B89B72" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-church"><path d="m18 7 4 2v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9l4-2"/><path d="M14 22v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4"/><path d="m18 7-5-4a1 1 0 0 0-2 0L6 7"/><path d="M12 7v5"/><path d="M10 9h4"/></svg>
           </div>
         </div>`,
  className: 'custom-church-icon',
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

export default function ChurchMap() {
  // Coordinates for "Av. Paraíba, 48 - Cidade Esperança, Natal - RN"
  const position: [number, number] = [-5.8242, -35.2505];

  return (
    <div className="w-full h-full rounded-[48px] overflow-hidden shadow-inner relative z-10 border border-gray-100">
      <MapContainer 
        center={position} 
        zoom={16} 
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={customMarkerIcon}>
          <Popup className="church-popup">
            <div className="text-center p-2">
              <h3 className="font-black text-gray-900 mb-1">Assembleia de Deus</h3>
              <p className="text-xs text-gray-500 font-medium">Av. Paraíba, 48 - Cidade Esperança</p>
              <div className="mt-2 text-[10px] text-blue-500 font-bold uppercase tracking-widest">
                Portas Abertas
              </div>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
