import {
  render,
  screen,
  fireEvent,
  RenderResult,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import Dashboard from "@/app/(DashboardLayout)/dashboard/page";

jest.mock("next/navigation");

describe('Test: Dashboard Page', () => {
    let component: RenderResult

    beforeEach(() => {
        render(
            <Provider store={store}>
                <Dashboard/>
            </Provider>
        )
    })

    describe('Rendering of Dashboard Page', () => {
        it('renders dashboard perfectly', () => {
            
        })
    })
})

