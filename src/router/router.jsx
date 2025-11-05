import { BrowserRouter, Route, Routes } from "react-router";
import { Home } from "../pages/Home/Home";
import { HomeLayout } from "../HomeLayout/HomeLayout";
import { About } from "../pages/About/About";
import { Appointment } from "../pages/Appointment/Appointment";
import { HospitalPage } from "../pages/Hospitals/Hospitals";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route  element={<HomeLayout />} >
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/hospitals" element={<HospitalPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
