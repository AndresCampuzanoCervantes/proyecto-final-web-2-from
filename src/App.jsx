import { Route, Routes } from "react-router";
import "./app.css"
import Login from "./pages/login";

const App = () => {
  return (
    <div className="container-custom">
      <div className='text-center my-4 fs-1 fw-bolder' style={{ paddingRight: "100px" }}>
        CRUD PELISPLUS
      </div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/home" element={<div />}/>
        {/* <Route path="/edit/:id" element={<Edit />} />  */}
        </Routes>      
    </div>
  );
}

export default App;

