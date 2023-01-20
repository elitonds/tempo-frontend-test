import { rest } from "msw";
import { BASE_URL } from "../../services/api";

export const UserHandler = [
  rest.get(`${BASE_URL}/users`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: "1324564",
          displayName: "Test User 1",
        },
        { id: "a111aa1", displayName: "Test User 2" },
      ])
    );
  }),

  rest.get(`${BASE_URL}/users/1`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          id: "1",
          firstName: "Jaren",
          lastName: "Kerluke",
          displayName: "jarenKerluke",
          avatarUrl: "https://cdn.fakercloud.com/avatars/victorstuber_128.jpg",
          location: "New Felixtown",
        },
      })
    );
  }),
];
