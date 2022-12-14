import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import SearchControl from "./searchControl";
import L from 'leaflet';
import React, { ReactNode, useEffect, useState } from "react";
import { Hotel } from "../../models/models";
import Button from '@mui/material/Button';
import { Modal } from "../modal/modal";
import InfoForm from "../infoForm/infoForm";

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

interface Props {
  hotels: Hotel[]
}

interface Icon {
  icon: L.Icon
}

const icons: { [name: string]: Icon } = {
  // 1 star -> Red
  1: {
    icon: new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    })
  },
  // 2 stars -> Violet
  2: {
    icon: new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    })
  },
  // 3 stars -> Blue
  3: {
    icon: new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    })
  },
  // 4 stars -> Green
  4: {
    icon: new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    })
  },
  // 5 stars -> Gold
  5: {
    icon: new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    })
  }
}

function Legend(position: number, content: ReactNode){

}

function Map(props: Props) {
  const [modal, setModal] = useState<React.ReactNode>(null)

  const setHotelModal = (hotel: Hotel) => {
    setModal(
      <Modal show={true} onClose={() => setModal(null)} title={hotel['HOTEL_NAME']} footer={<i>{hotel['ADDRESS']} ({hotel['REVIEW_DATE']})</i>}>
        <InfoForm hotel={hotel}></InfoForm>
      </Modal>
    )
  }

  const colorButton = (rating: number) => {
    let classname: "error" | "inherit" | "warning" | "primary" | "secondary" | "success" | "info" = "info"

    switch (rating) {
      case 1:
        classname = "error"
        break;
      case 2:
        classname = "secondary"
        break;
      case 3:
        classname = "primary"
        break;
      case 4:
        classname = "success"
        break;
      case 5:
        classname = "warning"
        break;
    }

    return classname
  }

  return (
    <div>
      {modal}
      <MapContainer center={[50, 9]} zoom={6} scrollWheelZoom={true} style={{ height: "80vh", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <SearchControl />
        {props.hotels.map((hotel) => {
          return (
            <Marker key={hotel["HOTEL_NAME"]} position={[hotel['LATITUDE'] || 0, hotel['LONGITUDE'] || 0]} icon={icons[hotel['OVERALL_RATING']].icon}>
              <Popup>
                <div>
                  <p><strong>Hotel: </strong> {hotel['HOTEL_NAME']}</p>
                  <p><strong>Rating: </strong>{hotel['OVERALL_RATING']}</p>
                  <Button variant="contained" color={colorButton(hotel['OVERALL_RATING'])} onClick={() => setHotelModal(hotel)}>More Info</Button>
                </div>
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
    </div>
  );
}

export default Map;
