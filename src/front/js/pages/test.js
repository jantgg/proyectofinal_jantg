import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import "../../styles/test.css";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export const Test = () => {
  const { store, actions } = useContext(Context);
  const [currentQuestion, setCurrentQuestion] = useState("q1");
  const [currentAnswers, setCurrentAnswers] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [bikesResults, setBikesResults] = useState([]);
  const [previousQuestion, setPreviousQuestion] = useState("q1");
  const [movingQuestion, setMovingQuestion] = useState("q1");
  const [isMovingOut, setIsMovingOut] = useState(false);
  const isMounting = useRef(true);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray(".revealUp").forEach(function (elem) {
      ScrollTrigger.create({
        trigger: elem,
        start: "top 60%",
        end: "bottom 35%",
        once: true,
        onEnter: () => {
          gsap.fromTo(
            elem,
            { y: 700, autoAlpha: 0 },
            {
              duration: 1.25,
              y: 0,
              autoAlpha: 1,
              ease: "power1.out",
              overwrite: "auto",
            }
          );
        },
        onLeave: () => {},
        onEnterBack: () => {},
        onLeaveBack: () => {},
      });
    });
  }, []);

  useEffect(() => {
    if (isMounting.current) {
      isMounting.current = false;
    } else {
      setIsMovingOut(true);
      setTimeout(() => {
        setIsMovingOut(false);
        setMovingQuestion("q1");
      }, 500);
    } // Duración de la animación en milisegundos
  }, [movingQuestion]);

  useEffect(() => {
    actions.getQuestions();
    getAnswers();
  }, []);

  useEffect(() => {
    localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
  }, [userAnswers]);

  useEffect(() => {
    setCurrentAnswers(
      store.answers.filter((obj) => obj.current_question_id == currentQuestion)
    );
  }, [currentQuestion]);

  const getAnswers = async () => {
    await actions.getAnswers();
    setCurrentAnswers(
      store.answers.filter((obj) => obj.current_question_id == currentQuestion)
    );
  };

  const answerPop = () => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers.pop();
    setUserAnswers(updatedAnswers);
  };

  function changeQuestion() {
    const div = document.querySelector(".entrada");
    div.classList.add("salida");
  }

  function showQuestion() {
    const div = document.querySelector(".entrada");
    div.classList.remove("salida");
  }

  const addFavoriteBike = async () => {
    const response = await fetch(store.backendurl + "favorite", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        favorite_id: bike.id,
        favorite_type: "bike",
      }),
    });
    if (response.ok) {
      console.log("response ok");
    } else {
      console.log("response not ok");
    }
  };

  const sendAnswers = async () => {
    const response = await fetch(store.backendurl + "answers", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(userAnswers),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data.result);
      setBikesResults(data.result);
    } else {
      console.log("response not ok");
    }
  };

  return currentQuestion == "end" ? (
    <div
      key="losresultados @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
      className="row revealUp"
    >
      <div className="col-12 mx-auto  text-white">
        {store.userType != "user" && store.userType != "photographer" ? (
          <div className="col-4 mx-auto text-center mb-5  fs-3 text-wrap lh-sm border border-danger rounded pb-2">
            No vas a poder guardar los resultados en favoritos ya que no te has
            registrado
          </div>
        ) : null}
        <div className="col-8 mx-auto text-center mt-5 fs-1 text-wrap lh-sm border border-danger">
          //Estas son las mejores motos que hemos encontrado especialmente para
          ti
        </div>
      </div>
      <div
        key="slider @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
        className="col-12 border border-danger"
      >
        <div
          id="carouselExampleIndicators"
          className="carousel slide col-12 mx-auto"
          data-bs-ride="true"
        >
          <div
            key="carousel indicators @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
            className="carousel-indicators"
          >
            {bikesResults.map((bike, index) => {
              let number = index;
              let bikeinfo = bike;
              return (
                <>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to={number}
                    className={number == 0 ? "active" : ""}
                    aria-current={number == 0 ? "true" : ""}
                    aria-label={`Slide ${number + 1}`}
                  ></button>
                </>
              );
            })}
          </div>
          <div className="carousel-inner">
            {bikesResults.map((bike, index) => {
              let number = index;
              return (
                <>
                  <div
                    className={
                      number == 0 ? "carousel-item active" : "carousel-item"
                    }
                  >
                    <div
                      key="card @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
                      className="container"
                    >
                      <div className="row">
                        <div className="card text-bg-dark col-lg-6 col-md-8 col-sm-10 col-xs-11 mx-auto">
                          <img
                            src={bike.bike_photo}
                            className="card-img"
                            alt="..."
                          />
                          <div className="card-img-overlay mx-auto">
                            <div className="mx-auto">
                              <h5 className="mx-auto">{bike.model}</h5>
                              <p className="">Pedazo pepino e o no</p>
                              <p className="">
                                <small>{bike.ask_6_price}</small>
                              </p>
                              {store.userType == "user" ||
                              store.userType == "photographer" ? (
                                <button
                                  className=""
                                  onClick={() => addFavoriteBike()}
                                >
                                  Favorite
                                </button>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>

          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="col-12 mx-auto  text-white text-center">
        <div className="col-8 mx-auto text-center mt-5 fs-1 text-wrap lh-sm border border-danger">
          Todas estas motos están elegidas en función de como has respondido a
          las preguntas, si quieres volver a realizar el test pincha aqui. ¡No
          olvides guardar en favoritos las motos que mas te hayan gustado para
          poder revisarlas mas adelante!
        </div>
        <div className="">
          <button
            className="botonaco"
            onClick={() => {
              setCurrentQuestion("q1");
            }}
          >
            <span>REPETIR TEST</span>
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div
      key="elmismotest @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
      className="row ms-0 revealUp"
    >
      {store.questions.map((question) => {
        return currentQuestion == question.id ? (
          <div key={question.id}>
            <div className="col-12 mx-auto text-white">
              {store.userType != "user" && store.userType != "photographer" ? (
                <>
                  <div className="bordecitor col-8 mx-auto heightborders "></div>
                  <div className="col-9 mx-auto text-center  sizehome2 py-5 bordecitoall border-danger spartan imagenw">
                    Recuerda logearte antes de comenzar el test para poder
                    guardar los resultados
                  </div>
                </>
              ) : null}
              <div className="bordecitol col-7 mx-auto heightborder"></div>
            </div>

            <div className="col-10 mx-auto text-center mt-0 bordecitoall sizehomeq py-5 px-3 text-wrap spartan imagen4 text-white">
              <div className={`entrada ${isMovingOut ? "salidar" : ""}`}>
                <b>{question.question}</b>
              </div>

              {currentQuestion == "q1" ? null : (
                <div className="row mt-3 text-white">
                  <button
                    className="botonaco sizehomes px-2 py-3 mx-auto"
                    onClick={() => {
                      setCurrentQuestion(
                        userAnswers[userAnswers.length - 1].current_question_id
                      );
                      answerPop();
                      setMovingQuestion(answer.next_question_id);
                    }}
                  >
                    <span>Volver a la pregunta anterior</span>
                  </button>
                </div>
              )}
            </div>

            <div
              className={`entrada col-10 mx-auto text-white pb-5 mb-5 row ma ${
                isMovingOut ? "salidal" : ""
              }`}
            >
              {currentAnswers.map((answer) => {
                return (
                  <div
                    key={answer.id}
                    className="col-12 col-xxl-4 col-xl-11 col-lg-11 mx-auto"
                  >
                    <div className="row mx-auto">
                      <button
                        className="botonaco3 sizehomet py-5 imagena mx-auto"
                        onClick={() => {
                          setUserAnswers([...userAnswers, answer]);
                          setPreviousQuestion(answer.current_question_id);
                          setCurrentQuestion(answer.next_question_id);
                          setMovingQuestion(answer.next_question_id);
                        }}
                      >
                        <span className="py-5">{answer.answer}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="entrada col-10 col-xxl-6 mx-auto text-center sizehome2 bordecitoall mb-5 imagenn p-4 spartan text-white">
              <div className={`entrada ${isMovingOut ? "salidar" : ""}`}>
                {question.notes}
              </div>
            </div>

            <div className="row col-12 text-center">
              <button
                className="botonaco4 col-12 col-xxl-2 col-xl-11 col-lg-11 mb-4 me-5 ms-auto imagena"
                onClick={() => {
                  setCurrentQuestion("q1");
                  setUserAnswers("");
                }}
              >
                <span>
                  <b>REPETIR TEST</b>
                </span>
              </button>
              <button
                className="botonaco4 col-12 col-xxl-2 col-xl-12 col-lg-12 mb-4 ms-5 me-auto py-3 imagena"
                onClick={() => {
                  setCurrentQuestion("end");
                  sendAnswers();
                }}
              >
                <span>
                  <b>RESULTADOS</b>
                </span>
              </button>
            </div>
          </div>
        ) : null;
      })}
    </div>
  );
};
