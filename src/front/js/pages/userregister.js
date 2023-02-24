import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/registerform.css";
import { useNavigate } from "react-router-dom";

export const Userregister = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [user_name, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [passworderror, setPasswordError] = useState(false);
  const [erroremail, setErrorEmail] = useState(false);
  const [errorusername, setErrorUsername] = useState(false);

  useEffect(() => {
    areEqual();
  }, [confirmpassword]);

  const sendUserRegister = async () => {
    const response = await fetch(store.backendurl + "register", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        user_name: user_name,
        email: email,
        password: password,
        confirmpassword: confirmpassword,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      navigate("/login");
    } else if (response.status == 409) {
      setErrorEmail(true);
    } else if (response.status == 410) {
      setErrorUsername(true);
    }
  };

  const areEqual = () => {
    if (password == confirmpassword) {
      setPasswordError(false);
    } else setPasswordError(true);
  };

  return (
    <main className="w-100 m-auto">
      <div className="container mt-3">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-sm">
              <div className="card-body">
                <h1 className="main-heading">
                  Registrate como usario en OnBikes <br></br> o <br></br>
                  <Link to={"/photographerregister"} className="text-center">
                    Registrarte como fotógrafo
                  </Link>
                </h1>
                <div>
                  <div className="row mb-3">
                    <label
                      htmlFor="user"
                      className="col-md-4 col-form-label text-md-end"
                    >
                      Usuario
                    </label>
                    <div className="col-md-6">
                      <input
                        className="form-control"
                        type="name"
                        value={user_name}
                        onChange={(e) => {
                          setErrorUsername(false);
                          setUserName(e.target.value);
                        }}
                        required
                        autoFocus
                      />
                      {errorusername ? (
                        <p className="text-danger">
                          *El nombre de usuario indicado ya esta siendo
                          utilizado por otro usuario.
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="email"
                      className="col-md-4 col-form-label text-md-end"
                    >
                      Email
                    </label>
                    <div className="col-md-6">
                      <input
                        className="form-control"
                        type="email"
                        required
                        autoFocus
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setErrorEmail(false);
                        }}
                      />
                      {erroremail ? (
                        <p className="text-danger">
                          *El email indicado ya esta siendo utilizado por otro
                          usuario.
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="password"
                      className="col-md-4 col-form-label text-md-end"
                    >
                      Contraseña
                    </label>
                    <div className="col-md-6">
                      <input
                        className="form-control"
                        type="password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        required
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="confirm_password"
                      className="col-md-4 col-form-label text-md-end"
                    >
                      Confirmar contraseña
                    </label>
                    <div className="col-md-6">
                      <input
                        className="form-control"
                        type="password"
                        value={confirmpassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                        }}
                        required
                      />
                      {passworderror == true ? (
                        <p className="text-danger">
                          *Las contraseñas no coinciden
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4 offset-md-4">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" />
                        <label
                          className="form-check-label"
                          htmlFor="temsAndConditions"
                        >
                          Acepto los terminos y condiciones.
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-0 mt-4">
                    <div className="col-md-8 offset-md-3">
                      <button
                        type="submit"
                        className="btn btn-warning btn-lg ms-2 text-white"
                        onClick={() => {
                          if (passworderror == false) {
                            sendUserRegister();
                          }
                        }}
                      >
                        <span>Registrarse</span>
                      </button>
                      <Link to={"/login"} className="text-decoration-none ps-4">
                        Tienes una cuenta?
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
