import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapComponentProps {
    latitude: number;
    longitude: number;
}

const MapComponent: React.FC<MapComponentProps> = ({ latitude, longitude }) => {
    const position: LatLngExpression = [latitude, longitude];
    const zoom = 13;

    return (
        <div style={{ width: '100%', height: '400px' }}>
            <MapContainer center={position} zoom={zoom} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position}>
                    <Popup>Location: {latitude}, {longitude}</Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default MapComponent;
