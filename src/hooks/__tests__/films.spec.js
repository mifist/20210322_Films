import { renderHook } from "@testing-library/react-hooks";
import { useLoadFilms, useSaveFilm } from "hooks/films";
import { AppProviders } from "contexts";
import { QueryCache } from "react-query";
import films from "test/films";

const queryCache = new QueryCache();

afterEach(() => {
  queryCache.clear();
});

const wrapper = ({ children }) => <AppProviders>{children}</AppProviders>;

test("should load all films", async () => {
  const { result, waitFor } = renderHook(() => useLoadFilms(), { wrapper });
  await waitFor(() => result.current.isSuccess);
  expect(result.current.data).toEqual(films);
});

const firstFilm = { ...films[0] };
firstFilm._id = "12345";

test("should correct update", async () => {
  const { result, waitFor } = renderHook(() => useSaveFilm(firstFilm), {
    wrapper,
  });
  result.current.mutate(films[0]);
  await waitFor(() => result.current.isSuccess);
  expect(result.current.data).toEqual(firstFilm);
});

test("should create film", async () => {
  const { result, waitFor } = renderHook(() => useSaveFilm(firstFilm), {
    wrapper,
  });
  result.current.mutate({});
  await waitFor(() => result.current.isSuccess);
  expect(result.current.data).toEqual(firstFilm);
});
