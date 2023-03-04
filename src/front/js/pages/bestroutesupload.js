import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/forall.css";

export const Bestroutesupload = () => {
  const { store, actions } = useContext(Context);
  const [userFavoriteRoutes, setUserFavoriteRoutes] = useState([]);
  const [pPLo, setPPLo] = useState([]);
  const [pPLa, setPPLa] = useState([]);
  const [pLLo, setPLLo] = useState([]);
  const [pLLa, setPLLa] = useState([]);
  const [routeName, setRouteName] = useState([]);
  const [startName, setStartName] = useState([]);
  const [interest, setInterest] = useState([]);
  const [endName, setEndName] = useState([]);
  const [photo, setRoutePhoto] = useState([]);
  const [routeSend, setRouteSend] = useState(false);

  useEffect(() => {
    getFavorites();
  }, []);

  const getFavorites = async () => {
    await actions.getFavorites();
    console.log(store.favorites);
    setUserFavoriteRoutes(store.favorites.filter((obj) => obj.route != null));
  };

  const sendRoute = async () => {
    const response = await fetch(store.backendurl + "routes", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify([
        {
          name: routeName,
          start_location_text: startName,
          end_location_text: endName,
          interest_text: interest,
          start_location_name: startName,
          start_latitude: pPLa,
          start_longitude: pPLo,
          end_location_name: endName,
          end_latitude: pLLa,
          end_longitude: pLLo,
        },
      ]),
    });
    if (response.ok) {
      const responseData = await response.json();
      const newRouteId = responseData.route_ids[0]; // obtenemos la primera ID de la lista
      uploadPhoto(photo, newRouteId);
    } else {
      setError(true);
    }
  };

  const uploadPhoto = async (photo, newRouteId) => {
    const formData = new FormData();
    formData.append("photo", photo[0]);
    formData.append("photo_type", "route");
    formData.append("id", newRouteId);
    console.log(formData);
    const response = await fetch(store.backendurl + "photos", {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      console.log(response.data);
      setRouteSend(true);
    } else {
      console.log(response);
    }
  };

  return (
    <>
      {routeSend == false ? (
        <div className="mx-auto">
          <div>
            <h1 className="text-white">Mis rutas</h1>
            <div className="text-white">
              {userFavoriteRoutes.map((route, index) => {
                return <p key={index}>Una Ruta</p>;
              })}
            </div>
          </div>
          <div>
            <div className="text-white">Punto de partida Longitud</div>
            <input
              onChange={(e) => {
                setPPLo(e.target.value);
              }}
            ></input>
            <div className="text-white">Punto de partida Latitud</div>
            <input
              onChange={(e) => {
                setPPLa(e.target.value);
              }}
            ></input>
          </div>
          <div className="text-white">Punto de llegada Longitud</div>
          <input
            onChange={(e) => {
              setPLLo(e.target.value);
            }}
          ></input>
          <div className="text-white">Punto de llegada Latitud</div>
          <input
            onChange={(e) => {
              setPLLa(e.target.value);
            }}
          ></input>
          <div className="text-white mt-5">
            Detalles
            <div className="text-white">Nombre de la ruta</div>
            <input
              onChange={(e) => {
                setRouteName(e.target.value);
              }}
            ></input>
            <div className="text-white">Sitio de salida</div>
            <input
              onChange={(e) => {
                setStartName(e.target.value);
              }}
            ></input>
            <div className="text-white">Puntos de interes</div>
            <input
              onChange={(e) => {
                setInterest(e.target.value);
              }}
            ></input>
            <div className="text-white">Fin de la ruta</div>
            <input
              onChange={(e) => {
                setEndName(e.target.value);
              }}
            ></input>
          </div>
          <div className="text-white">Foto</div>
          <input
            onChange={(e) => {
              setRoutePhoto(e.target.files);
            }}
            type="file"
          />

          <button
            onClick={() => {
              sendRoute();
            }}
          >
            Publicar
          </button>

          <button
            onClick={() => {
              uploadPhoto();
            }}
          >
            Publicar
          </button>
        </div>
      ) : (
        <div>
          <div className="text-white"> Route send succesfully!</div>
          <button
            onClick={() => {
              setRouteSend(true);
            }}
          >
            Click Here to upgrade another 1
          </button>
        </div>
      )}
    </>
  );
};
