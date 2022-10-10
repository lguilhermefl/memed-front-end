import GlobalStyle from "./components/styles/globalStyles";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import EditTest from "./pages/EditTest";
import EditAppointment from "./pages/EditAppointment";
import Appointment from "./pages/Appointment";
import Test from "./pages/Test";

export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/history" element={<Home />} />
        <Route path="/tests/edit/:id" element={<EditTest />} />
        <Route path="/appointments/edit/:id" element={<EditAppointment />} />
        <Route path="/appointments/:id" element={<Appointment />} />
        <Route path="/tests/:id" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}
