import { act, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { LoginPage } from "../pages/Login/LoginPage";
import { useAuth } from "../contexts/authContext";
import { mockLocation } from "../__mocks__/router-mock";

describe("LoginPage", () => {
  const loginMock = jest.fn();

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      login: loginMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("shows restricted area alert when `state.restricted` is true", () => {
    mockLocation.mockReturnValue({
      state: { restricted: true },
    });

    render(<LoginPage />);
    expect(
      screen.getByText(
        "You´re trying to reach restricted area. Please sign in first!"
      )
    ).toBeInTheDocument();
  });

  it("calls login function with email and password on submit", async () => {
    render(<LoginPage />);    
    (useAuth as jest.Mock).mockReturnValue({
      login: loginMock,
    });

    await act(async () => {
      userEvent.type(
        screen.getByPlaceholderText("me@example.com"),
        "name@gmail.com"
      );
      userEvent.type(screen.getByPlaceholderText("**********"), "pwd");
      userEvent.click(screen.getByRole("button", { name: /log in/i }));
    });

    expect(loginMock).toHaveBeenCalledWith("name@gmail.com", "pwd");
  });

  // TODO
  // Failed login --> show err notification
  // Succesfull login --> show success notification + redirect to My Articles
  // on Logout redirect to Recent articles
});
