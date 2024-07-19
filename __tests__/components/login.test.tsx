import {
  render,
  screen,
  fireEvent,
  RenderResult,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "../../src/components/Login";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

jest.mock("next/navigation");

describe("Test: Login component", () => {
  let component: RenderResult;

  beforeEach(() => {
    component = render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
  });

  describe("Rendering of login component", () => {
    it("renders login page perfectly", () => {
      expect(screen.getByTestId("logo")).toBeInTheDocument();
      expect(screen.getByTestId("cta")).toBeInTheDocument();
      expect(screen.getByTestId("form")).toBeInTheDocument();
      expect(screen.getByTestId("cInput")).toBeInTheDocument();
      expect(screen.getByTestId("button")).toBeInTheDocument();
    });
  });

  describe("Login logic", () => {
    it("tests if login logic works", () => {
      const usernameInput: HTMLInputElement = screen.getByTestId("cInput");
      fireEvent.change(usernameInput, { target: { value: "Oludamola" } });
      expect(usernameInput.value).toBe("Oludamola");
    });
  });

  describe("Login functionality", () => {
    it("goes through to the dashboard", () => {
      const usernameInput: HTMLInputElement = screen.getByTestId("cInput");
      const loginButton = screen.getByRole("button", { name: "Continue" });

      fireEvent.change(usernameInput, { target: { value: "Oludamola" } });
      fireEvent.click(loginButton);
    });
  });
});
