import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "./Admin";
import CinemaAdmin from "./CinemaAdmin";
import Discounts from "./Discounts";
import Home from './Home';
import Login from './Login';
import Movies from "./Movies";
import Premium from "./Premium";
import Profile from "./Profile";
import SignUp from "./SignUp";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='movies' element={<Movies />} />
        <Route path='discounts' element={<Discounts />} />
        <Route path='admin' element={<Admin />} />
        <Route path='profile' element={<Profile />} />
        <Route path='sign-up' element={<SignUp />} />
        <Route path='premium' element={<Premium />} />
        <Route path='cinema-admin' element={<CinemaAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;