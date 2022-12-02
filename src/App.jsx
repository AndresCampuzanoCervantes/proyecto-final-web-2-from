import { Route, Routes } from "react-router";
import "./app.css"
import { FilsList, Home, Login, SearchMovies, ViewList } from "./pages";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/searchMovies" element={<SearchMovies />} />
      <Route path="/listFilms" element={<FilsList />} />
      <Route path="/listFilms/:id" element={<ViewList />} />
    </Routes>
  );
}

export default App;

