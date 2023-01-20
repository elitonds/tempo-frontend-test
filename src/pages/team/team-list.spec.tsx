import { render, screen } from "@testing-library/react";
import { TeamDTO } from "../../dto/team/team.dto";
import TeamList from "./team-list";
import mockAxios from "jest-mock-axios";
import TeamService from "../../services/team/team.service";
import { BASE_URL } from "../../services/api";
import { act } from "react-dom/test-utils";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock("axios");

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
  it("should call TeamList correctly", () => {
    const { container } = render(<TeamList />);
    expect(container).toBeTruthy();
  });

  it("should have a search field", () => {
    render(<TeamList />);
    expect(screen.getByPlaceholderText("Search..."));
  });
  it("should have a card with Team title", () => {
    render(<TeamList />);
    expect(screen.getByText("Teams"));
  });

  it("should have a table from ant-design", () => {
    const { container } = render(<TeamList />);
    expect(container.getElementsByClassName("ant-table")).toBeTruthy();
  });

  it("should return teams list after http request", async () => {
    await act(async () => render(<TeamList />));
    const teams: TeamDTO[] = [
      {
        id: "1324564",
        name: "Test 1",
      },
      { id: "a111aa1", name: "Test 2" },
    ];

    mockAxios.get.mockResolvedValueOnce(teams);

    const result = await TeamService.findAll();

    expect(mockAxios.get).toHaveBeenCalledWith(`${BASE_URL}/teams`);
    expect(result).toEqual(teams);
  });
});
