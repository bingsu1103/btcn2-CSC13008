import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Outlet } from "react-router-dom";
import NavBar from "@/components/layout/NavBar";
import { Toaster } from "./components/ui/sonner";

const App = () => {
  return (
    <>
      <Toaster richColors position="top-right" />
      <Header />
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};
export default App;
