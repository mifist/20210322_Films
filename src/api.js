import axios from "axios";

const api = {
  films: {
    fetchAll: () => axios.get("/api/films").then((res) => res.data.films),
    create: (film) =>
      axios.post("/api/films", { film }).then((res) => res.data.film),
    update: (film) =>
      axios
        .put(`/api/films/${film._id}`, { film })
        .then((res) => res.data.film),
  },
};

export default api;
