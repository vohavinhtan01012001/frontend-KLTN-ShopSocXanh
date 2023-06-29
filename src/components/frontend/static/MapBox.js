import React, { useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';

function MapBox() {
    const [showPopup, togglePopup] = useState(false);
    //10.738221051343983, 106.67783517358028
    //10.733920308928775, 106.67940158365393
    return <React.Fragment>
        <Map
            initialViewState={{
                width: "200px",
                height: "50vh",
                latitude: 10.738221051343983,
                longitude: 106.67783517358028,
                zoom: 15,
            }}
            /* style={{ width:'500px', height:'500px'}} */
            className = "MapBox"
            mapStyle="mapbox://styles/mapbox/streets-v9"
            mapboxAccessToken='pk.eyJ1IjoidmluaHRhbjAxMDEyMDAxIiwiYSI6ImNsYXIxbjR4azAxenYzcW1saWZ3N3M3bGgifQ.XdLXDFNYnDlgy95gWsbGZQ' >
            {showPopup && (
                <Popup
                    latitude={10.738221051343983}
                    longitude={106.67783517358028}
                    closeButton={true}
                    closeOnClick={true}
                    onClose={() => togglePopup(false)}
                    anchor="top-right"
                >
                    <div>Pop up marker</div>
                </Popup>
            )}
            <Marker
                latitude={10.738221051343983}
                longitude={106.67783517358028}
                offsetLeft={-20}
                offsetTop={-30}
                style={{marginTop:'-500px', marginLeft:"390px"}}
            >
                <img
                    onClick={() => togglePopup(true)}
                    style={{ height: 50, width: 50 , margin:'auto'}}
                    src="https://xuonginthanhpho.com/wp-content/uploads/2020/03/map-marker-icon.png"
                />
            </Marker>
        </Map>
    </React.Fragment>
}

export default MapBox;