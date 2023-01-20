import "@testing-library/jest-dom";
import { server } from "./server";

beforeAll(() => {
  server.listen({ onUnhandledRequest: "bypass" });
});

beforeEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
