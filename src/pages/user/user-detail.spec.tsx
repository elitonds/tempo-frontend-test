import { act, queryByAttribute, render, screen } from "@testing-library/react";
import Router from "react-router-dom";
import UserDetail from "./user-detail";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
  useParams: jest.fn(),
}));

const getById = queryByAttribute.bind(null, "id");
describe("UserDetail tests", () => {
  beforeEach(() => {
    jest.spyOn(Router, "useParams").mockReturnValue({ userId: "1" });
  });

  const getComponentRender: any = async () => {
    return await act(async () => {
      return await render(<UserDetail />);
    });
  };
  it("should call UserList correctly", async () => {
    const { container } = await getComponentRender();
    expect(container).toBeTruthy();
  });

  it("should have a img field", async () => {
    await getComponentRender();
    expect(screen.getAllByRole("img"));
  });
  it("should have a full-name and user-name fields", async () => {
    const { container } = await getComponentRender();
    expect(getById(container, "full-name"));
    expect(getById(container, "user-name"));
  });
});
