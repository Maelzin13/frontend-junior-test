import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const defaultIcon = new L.Icon({
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const UserMap = ({ users }) => {
  const getAvatarPath = (userId) => {
    return `assets/users/avatar-${userId}.png`;
  };

  return (
    <div className="h-3/4 w-3/4 mx-auto">
      <div className="h-96">
        <MapContainer center={[0, 0]} zoom={2} className="h-full w-full">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {users.map(user => (
            <Marker key={user.id} position={[user.address.geo.lat, user.address.geo.lng]} icon={defaultIcon}>
              <Popup className="bg-white p-1 shadow-md rounded-lg">
                <div className="flex flex-col items-center">
                  <img
                    src={getAvatarPath(user.id)}
                    alt={`Avatar de ${user.name}`}
                    onError={(e) => { e.target.src = 'assets/users/avatar-placeholder.png'; }}
                    className="max-w-xs mb-4 rounded-full"
                  />
                  <div className="text-center">
                    <strong>{user.name}</strong><br />
                    {user.email}<br />
                    {user.address.city}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default UserMap;
