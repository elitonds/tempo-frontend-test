import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import TeamService from "../../services/team/team.service";
import TeamList from "./team-list";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("TeamList tests", () => {
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

  const getComponentRender: any = async () => {
    return await act(async () => {
      return await render(<TeamList />);
    });
  };
  it("should call TeamList correctly", async () => {
    const component: any = await getComponentRender();
    expect(component.container).toBeTruthy();
  });

  it("should have a search field", async () => {
    await getComponentRender();
    expect(screen.getByPlaceholderText("Search..."));
  });
  it("should have a card with Team title", async () => {
    await getComponentRender();
    expect(screen.getByText("Teams"));
  });

  it("should have a table from ant-design", async () => {
    const { container } = await getComponentRender();
    expect(container.getElementsByClassName("ant-table")).toBeTruthy();
  });

  it("should return teams list after http request", async () => {
    await getComponentRender();
    const result = await TeamService.findAll();
    expect(result).toBeInstanceOf(Object);
  });
});
