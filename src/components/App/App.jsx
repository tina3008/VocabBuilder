import { Route, Routes } from "react-router-dom";
import { PrivateRoute, RestrictedRoute } from "../Navigation/RestrictedRoute.jsx";
import { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "../Navigation/Navigation.jsx";
import Loader from "../Loader/Loader.jsx";
import { selectLoading, selectError } from "../../redux/words/selectors.js";
import { HelmetProvider } from "react-helmet-async";
import { refreshUser } from "../../redux/auth/operations.js";
import { selectIsRefreshing } from "../../redux/auth/selectors.js";
import TrainingWordId from "../TrainingWord/TrainingWord.jsx";

const Homepage = lazy(() => import("../../pages/HomePage/HomePage.jsx"));
const DictionaryPage = lazy(() =>
  import("../../pages/DictionaryPage/DictionaryPage.jsx")
);
const RecommendPage = lazy(() =>
  import("../../pages/RecommendPage/RecommendPage.jsx")
);
const TrainingPage = lazy(() =>
  import("../../pages/TrainingPage/TrainingPage.jsx")
);
const RegisterPage = lazy(() =>
  import("../../pages/RegisterPage/RegisterPage.jsx")
);
const LoginPage = lazy(() => import("../../pages/RegisterPage/LoginPage.jsx"));

const NotFoundPage = lazy(() =>
  import("../../pages/NotFoundPage/NotFoundPage.jsx")
);
const HomePage = lazy(() => import("../../pages/HomePage/HomePage.jsx"));

export default function App() {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  if (isRefreshing) {
    return null;
  }
  // const isRegisterPage = location.pathname === "/register" || "/login";

  return (
    <div>
      <HelmetProvider>
        <Navigation />
        {loading && <Loader />}
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute
                  component={<DictionaryPage />}
                  redirectTo="/login"
                />
              }
            />
            <Route
              path="/register"
              element={
                <RestrictedRoute
                  component={<RegisterPage />}
                  redirectTo="/dictionary"
                />
              }
            />
            <Route
              path="/login"
              element={
                <RestrictedRoute
                  component={<LoginPage />}
                  redirectTo="/dictionary"
                />
              }
            />

            <Route
              path="/"
              element={
                <PrivateRoute component={<HomePage />} redirectTo="/login" />
              }
            />
            <Route
              path="/dictionary"
              element={
                <PrivateRoute
                  component={<DictionaryPage />}
                  redirectTo="/login"
                />
              }
            />
            <Route
              path="/recommend"
              element={
                <PrivateRoute
                  component={<RecommendPage />}
                  redirectTo="/login"
                />
              }
            />
            <Route
              path="/training"
              element={
                <PrivateRoute
                  component={<TrainingPage />}
                  redirectTo="/login"
                />
              }
            />

            <Route path="/training/:id" element={<TrainingWordId />}/>
             
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </HelmetProvider>
    </div>
  );
}
