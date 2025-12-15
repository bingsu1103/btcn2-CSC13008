import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Outlet } from "react-router-dom";
import NavBar from "@/components/layout/NavBar";
import { Toaster } from "./components/ui/sonner";

const App = () => {
  return (
    <main className="min-h-screen flex flex-col">
      <Toaster richColors position="top-right" />
      <Header />
      <NavBar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};
export default App;
