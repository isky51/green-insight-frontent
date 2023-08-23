import { act, cleanup, render, screen, waitFor } from '@testing-library/react';
import LoginView from '../pages/login/LoginView';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/redux.hooks';
import userEvent from '@testing-library/user-event';
import * as authDataSlice from '../store/auth/authDataSlice';

// Mocking Redux hooks and react-router-dom
jest.mock('../store/redux.hooks', () => ({
  ...jest.requireActual('../store/redux.hooks'),
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe("Login component", () => {
  const dispatch = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    // Mocking the hooks' behavior
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
    (useAppSelector as jest.Mock).mockReturnValue(() => ({
      auth: {
        isError: false,
        isSuccess: false,
        isLoading: false,
        isAuthLoginLoading: false,
        isOtpVerifyLoading: false,
        message: "",
        loginDetails: null,
        isOtp: false,
        otpSuccess: false,
        otpError: false
      }
    }));
  });

  afterEach(() => {
    // Clearing mocks and cleaning up after each test
    jest.clearAllMocks();
    cleanup();
  });

  // Test: Rendering the Login component
  it('renders Login component successfully.', () => {
    render(
      <LoginView />
    );
    const linkElement = screen.getByTestId('login');
    expect(linkElement).toBeInTheDocument();
  });

  // Test: Rendering the title correctly
  it('renders title correctly', async () => {
    render(
      <LoginView />
    );

    const newTitle = 'Login';
    // Retrieve and check the updated tab title
    await waitFor(() => {
      expect(document.title).toBe(`GreenSight | ${newTitle}`);
    });
  });

  // Test: Rendering email and password input components
  it('renders email and password input components', () => {
    render(
      <LoginView />
    );
    const emailInput = screen.getByPlaceholderText('Enter your email');
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  // Test: Submitting the form with text inputs
  it('submits when form inputs contain text', async () => {
    const { getByTestId } = render(
      <LoginView />
    );

    await act(async () => {
      userEvent.type(getByTestId('login-email'), 'test@yupmail.com');
      userEvent.type(getByTestId('login-password'), '2hKJjj45f');
    });

    await act(() => {
      userEvent.click(getByTestId('login_btn'));
    });

    expect(screen.getByDisplayValue('test@yupmail.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2hKJjj45f')).toBeInTheDocument();
  });

  // Test: Displaying an error for wrong email format
  it('displays an error for wrong email format', async () => {
    const { getByTestId } = render(
      <LoginView />
    );

    await act(() => {
      userEvent.type(getByTestId('login-email'), 'test');
      userEvent.type(getByTestId('login-password'), 'testpassword');
    });

    await act(() => {
      userEvent.click(getByTestId('login_btn'));
    });

    await waitFor(() => {
      expect(screen.getByDisplayValue('test')).toBeInTheDocument();
      expect(screen.getByDisplayValue('testpassword')).toBeInTheDocument();
      expect(getByTestId('email-error')).toHaveTextContent('Please enter a valid Email');
    });
  });

  // Test: Displaying errors for empty email and password
  it('displays errors for empty email and password', async () => {
    const { getByTestId } = render(
      <LoginView />
    );

    await act(() => {
      userEvent.click(getByTestId('login_btn'));
    });

    await waitFor(() => {
      expect(getByTestId('email-error')).toHaveTextContent('Email should not be empty');
      expect(getByTestId('password-error')).toHaveTextContent('Password should not be empty');
    });
  });

  // Test: Calling loginPost function on form submission
  it('calls loginPost function on form submission', async () => {
    const mockLoginPost = jest.fn();
    jest.spyOn(authDataSlice, 'loginPost').mockImplementation(mockLoginPost);

    const { getByTestId } = render(
      <LoginView />
    );

    await act(() => {
      userEvent.type(getByTestId('login-email'), 'test@example.com');
      userEvent.type(getByTestId('login-password'), 'testpassword');
    });

    await act(() => {
      userEvent.click(getByTestId('login_btn'));
    });

    await waitFor(() => {
      expect(mockLoginPost).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'testpassword',
      });
    });
  });
});
