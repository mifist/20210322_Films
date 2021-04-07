import { renderHook, act } from "@testing-library/react-hooks";
import { useLogin, useLogout, UserContextProvider } from "contexts/UserContext";
import jwtDecode from "jwt-decode";
import { setAuthorizationHeader } from "api";

const mockToken = "12345";
jest.mock("jwt-decode", () => jest.fn());
jest.mock("api");

const wrapper = ({ children }) => (
  <UserContextProvider>{children}</UserContextProvider>
);

afterEach(() => {
  jest.restoreAllMocks();
  delete localStorage.filmsToken;
});

test("useLogin should return function", async () => {
  jwtDecode.mockImplementation(() => ({ user: {} }));

  const { result } = renderHook(() => useLogin(), { wrapper });

  act(() => result.current(mockToken));

  expect(jwtDecode).toHaveBeenCalledTimes(1);
  expect(jwtDecode).toHaveBeenCalledWith(mockToken);

  expect(setAuthorizationHeader).toHaveBeenCalledTimes(1);
  expect(setAuthorizationHeader).toHaveBeenCalledWith(mockToken);

  expect(localStorage.filmsToken).toBe(mockToken);
});

test("useLogout should remove from localStorage", async () => {
  jwtDecode.mockImplementation(() => ({ user: {} }));

  const { result } = renderHook(() => useLogout(), { wrapper });

  act(() => result.current());

  expect(setAuthorizationHeader).toHaveBeenCalledTimes(1);
  expect(setAuthorizationHeader).toHaveBeenCalledWith();
});
