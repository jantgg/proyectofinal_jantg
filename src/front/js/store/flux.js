const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      userType: null,
      backendurl:
        "https://3001-jantgg-proyectofinaljan-8qcrycd9o76.ws-eu88.gitpod.io/api/",
      questions: [],
      answers: [],
    },
    actions: {
      getQuestions: async () => {
        const response = await fetch(getStore().backendurl + "questions");
        const data = await response.json();
        setStore({ questions: data.body });
      },
      getAnswers: async () => {
        const response = await fetch(getStore().backendurl + "answers");
        const data = await response.json();
        setStore({ answers: data.body });
      },
      //user status
      syncuser: async () => {
        const response = await fetch(getStore().backendurl + "sync", {
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("type", data.type);
          setStore({ userType: data.type });
        }
      },
      logout: () => {
        try {
          localStorage.removeItem("token");
          setStore({ userType: null });
          return true;
        } catch (e) {
          console.log(e);
          return false;
        }
      },
    },
  };
};

export default getState;
