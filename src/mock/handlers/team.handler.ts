import { rest } from "msw";
import { BASE_URL } from "../../services/api";

export const TeamHandler = [
  rest.get(`${BASE_URL}/teams`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: "1324564",
          name: "Test 1",
        },
        { id: "a111aa1", name: "Test 2" },
      ])
    );
  }),
  rest.get(`${BASE_URL}/teams/1`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          id: "1",
          name: "Test 1",
        },
      })
    );
  }),
];
