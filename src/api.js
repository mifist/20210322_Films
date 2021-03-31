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

    delete: (film) => axios.delete(`/api/films/${film._id}`),
  },
  users: {
    create: (user) => axios.post("/api/users/", { user }),
    login: (credentials) =>
      axios.post("/api/auth", { credentials }).then((res) => res.data.token),
  },
};

export default api;
