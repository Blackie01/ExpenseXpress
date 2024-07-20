import {
  render,
  screen,
  fireEvent,
  RenderResult,
  cleanup,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import EntryForm from "../../src/components/EntryForm";
import axios from "axios";
import { setTransactionEntries } from "../../src/redux/transactionEntriesSlice";
import { setSnackBar } from "../../src/redux/snackBarSlice";

jest.mock("axios");
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock("../../src/redux/transactionEntriesSlice", () => ({
  setTransactionEntries: jest.fn(),
}));
jest.mock("../../src/redux/snackBarSlice", () => ({
  setSnackBar: jest.fn(),
}));

describe("Test: Entry Form", () => {
  let component: RenderResult;
  const dispatchMock = jest.fn();
  const setOpenFormMock = jest.fn();

  beforeEach(() => {
    (require("react-redux").useDispatch as jest.Mock).mockReturnValue(
      dispatchMock
    );
    jest.clearAllMocks();

    component = render(
      <Provider store={store}>
        <EntryForm openForm={true} setOpenForm={setOpenFormMock} />
      </Provider>
    );
  });

  afterEach(() => {
    cleanup();
  });

  describe("Rendering of Entry form", () => {
    it("renders the entry form", () => {
      expect(screen.getByTestId("dialogTitle")).toBeInTheDocument();
      expect(screen.getByTestId("incomeButton")).toBeInTheDocument();
      expect(screen.getByTestId("expenseButton")).toBeInTheDocument();
      expect(screen.getByTestId("descriptionLabel")).toBeInTheDocument();
      expect(screen.getByTestId("descriptionInput")).toBeInTheDocument();
      expect(screen.getByTestId("categoryLabel")).toBeInTheDocument();
      expect(screen.getByTestId("categorySelect")).toBeInTheDocument();
      expect(screen.getByTestId("dateLabel")).toBeInTheDocument();
      expect(screen.getByTestId("datePicker")).toBeInTheDocument();
      expect(screen.getByTestId("amountLabel")).toBeInTheDocument();
      expect(screen.getByTestId("amountInput")).toBeInTheDocument();
      expect(screen.getByTestId("saveTransactionButton")).toBeInTheDocument();
    });
  });

  describe("saving transactions", () => {
    it("saves expense transactions", async () => {
      (axios.post as jest.Mock).mockResolvedValue({
        status: 201,
        data: { id: 1 },
      });

      fireEvent.change(screen.getByTestId("descriptionInput"), {
        target: { value: "Rent payment" },
      });
      fireEvent.change(screen.getByTestId("categorySelect"), {
        target: { value: "Payments" },
      });
      fireEvent.change(screen.getByTestId("datePicker"), {
        target: { value: "2024-04-04" },
      });
      fireEvent.change(screen.getByTestId("amountInput"), {
        target: { value: "2000" },
      });
      fireEvent.click(screen.getByTestId("saveTransactionButton"));

      await waitFor(() => {
        expect(axios.post).toHaveBeenCalledWith(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/posts`,
          expect.objectContaining({
            type: false,
            title: "Rent payment",
            category: "Payments",
            date: "2024-04-04",
            amount: "2000",
          })
        );
      });

      expect(dispatchMock).toHaveBeenCalledWith(
        setTransactionEntries(expect.any(Object))
      );
      expect(dispatchMock).toHaveBeenCalledWith(
        setSnackBar({
          message: "Transaction recorded successfully",
          status: true,
          display: true,
        })
      );
    });

    it("saves income transactions", async () => {
      (axios.post as jest.Mock).mockResolvedValue({
        status: 201,
        data: { id: 2 },
      });

      fireEvent.click(screen.getByTestId("incomeButton"));
      fireEvent.change(screen.getByTestId("descriptionInput"), {
        target: { value: "Salary" },
      });
      fireEvent.change(screen.getByTestId("categorySelect"), {
        target: { value: "Income" },
      });
      fireEvent.change(screen.getByTestId("datePicker"), {
        target: { value: "2024-04-05" },
      });
      fireEvent.change(screen.getByTestId("amountInput"), {
        target: { value: "5000" },
      });
      fireEvent.click(screen.getByTestId("saveTransactionButton"));

      await waitFor(() => {
        expect(axios.post).toHaveBeenCalledWith(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/posts`,
          expect.objectContaining({
            type: true,
            title: "Salary",
            category: "Income",
            date: "2024-04-05",
            amount: "5000",
          })
        );
      });

      expect(dispatchMock).toHaveBeenCalledWith(
        setTransactionEntries(expect.any(Object))
      );
      expect(dispatchMock).toHaveBeenCalledWith(
        setSnackBar({
          message: "Transaction recorded successfully",
          status: true,
          display: true,
        })
      );
    });
  });
});
