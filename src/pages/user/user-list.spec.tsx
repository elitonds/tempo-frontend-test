import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import  Router  from "react-router-dom";
import TeamService from "../../services/team/team.service";
import UserService from "../../services/user/user.service";
import UserList from "./user-list";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
  useParams: jest.fn(),
}));

describe("UserList tests", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });
  
  beforeEach(() => {    
    jest.spyOn(Router, 'useParams').mockReturnValue({ teamId: '1' });
  })

  const getComponentRender: any = async () => {
    return await act(async () => {
      return await render(<UserList />);
    });
  };
  it("should call UserList correctly", async () => {
    const { container } = await getComponentRender();
    expect(container).toBeTruthy();
  });

  it("should have a search field", async () => {
    await getComponentRender();
    expect(screen.getByPlaceholderText("Search..."));
  });
  it("should have a card with User title", async () => {
    await getComponentRender();
    expect(screen.getByText("Users"));
  });

  it("should have a table from ant-design", async () => {
    const { container } = await getComponentRender();
    expect(container.getElementsByClassName("ant-table")).toBeTruthy();
  });

  it("should return user list after http request", async () => {
    await getComponentRender();
    const result = await UserService.findAll();
    expect(result).toBeInstanceOf(Object);
  });

  it("should return the team detail", async () => {
    jest.spyOn(Router, 'useParams').mockReturnValue({ teamId: '1' })
    await getComponentRender();
    const result = await TeamService.findById("1");
    expect(result).toBeInstanceOf(Object);
  });
});
