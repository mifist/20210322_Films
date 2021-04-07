import { rest } from "msw";
import films from "test/films";
import users from "test/users";

let firstFilm = { ...films[0] };
firstFilm._id = "12345";

const handlers = [
  rest.get("/api/authfilms", async (req, res, ctx) => {
    return res(ctx.json({ films }));
  }),
  rest.post("/api/auth", async (req, res, ctx) => {
    return res(ctx.json({ token: users[0].token }));
  }),
  rest.put(`/api/authfilms/:_id`, async (req, res, ctx) => {
    return res(ctx.json({ film: firstFilm }));
  }),
  rest.post(`/api/authfilms`, async (req, res, ctx) => {
    return res(ctx.json({ film: firstFilm }));
  }),
];

export { handlers };
