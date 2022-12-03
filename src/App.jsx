import { Route, Routes, useLocation } from "react-router";
import "./app.css"
import MenuBar from "./components/Navbar";
import { FilsList, Home, Login, SearchMovies, ViewList, User } from "./pages";

const App = () => {
  const url = useLocation()
  return (
    <>
      {
        (url.pathname !== "/" && url.pathname !== "/login") && (<MenuBar />)
      }
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/searchMovies" element={<SearchMovies />} />
        <Route path="/listFilms" element={<FilsList />} />
        <Route path="/user" element={<User />} />
        <Route path="/listFilms/:id" element={<ViewList />} />
      </Routes>
    </>

  );
}

export default App;

