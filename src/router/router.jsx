// import { BrowserRouter, Route, Routes } from "react-router";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
import { Vaccines } from "../pages/AdminDashboard/Vaccines";
import { HospitalLayout } from "../pages/HospitalDashboard/HospitalLayout";
import { HospitalsOverview } from "../pages/HospitalDashboard/HospitalsOverview";
import { HospitalProfile } from "../pages/HospitalDashboard/HospitalProfile";

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
        {/* privat route */}
 
        <Route element={<SidebarLayout/>}>
             <Route path="/admindashboard" element={<Overview />} />
             <Route path="/adminhospitals" element={<Hospitals />} />
             <Route path="/Patients" element={<Patients />} />
             <Route path="/vaccines" element={<Vaccines />} />
             {/* <Route path="/dashboard" element={<Overview />} /> */}
        </Route>


          <Route element={<HospitalLayout />}>
    <Route path="/hospitaldashboard" element={<HospitalsOverview />} />
    <Route path="/hospitalprofile" element={<HospitalProfile />} />
    {/* <Route path="/hospitalvaccines" element={<HospitalVaccines />} /> */}
    {/* aur hospital ke aur pages */}
  </Route>


      </Routes>


    </BrowserRouter>
  );
};
