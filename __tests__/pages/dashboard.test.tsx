import {
  render,
  screen,
  fireEvent,
  RenderResult,
  cleanup,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import Dashboard from "@/app/(DashboardLayout)/dashboard/page";

jest.mock("next/navigation");

describe("Test: Dashboard Page", () => {
  let component: RenderResult;

  beforeEach(() => {
    component = render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );
  });

  afterEach(() => {
    cleanup();
  });

  describe("Rendering of Dashboard Page", () => {
    it("renders dashboard perfectly", () => {
      expect(screen.getByTestId("balance")).toBeInTheDocument();
      expect(screen.getByTestId("balanceAmount")).toBeInTheDocument();
      expect(screen.getByTestId("incomeExpense")).toBeInTheDocument();
      expect(screen.getByTestId("tableTitle")).toBeInTheDocument();
      expect(screen.getByTestId("desktopButton")).toBeInTheDocument();
      expect(screen.getByTestId("mobileButton")).toBeInTheDocument();
    });
  });

  describe("Adding a new transaction", () => {
    it("toggles the entry form modal", () => {
      const addTransactionButton = screen.getByTestId("desktopButton");

      expect(screen.getByTestId('entryForm')).toBeInTheDocument()
      fireEvent.click(addTransactionButton);
    });
  });
});
