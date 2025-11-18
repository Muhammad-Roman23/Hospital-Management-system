import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { HomeLayout } from "../HomeLayout/HomeLayout";
import { About } from "../pages/About/About";
import { Appointment } from "../pages/Appointment/Appointment";
import { HospitalPage } from "../pages/Hospitals/Hospitals";
import { ContactPage } from "../pages/Contact/ContactPage";
import { LoginPage } from "../pages/LogIn/LogInPage";
import { RegisterPage } from "../pages/Register/Register";
import { SidebarLayout } from "../pages/AdminDashboard/Adminlayout";
import { Overview } from "../pages/AdminDashboard/overview";
import { Hospitals } from "../pages/AdminDashboard/Hospitals";
import { Patients } from "../pages/AdminDashboard/Patients";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* public route */}
        <Route  element={<HomeLayout />} >
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/hospitals" element={<HospitalPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route element={<SidebarLayout/>}>
             <Route path="/admindashboard" element={<Overview />} />
             <Route path="/adminhospitals" element={<Hospitals />} />
             <Route path="/Patients" element={<Patients />} />
             {/* <Route path="/dashboard" element={<Overview />} /> */}
        </Route>

      </Routes>


    </BrowserRouter>
  );
};
