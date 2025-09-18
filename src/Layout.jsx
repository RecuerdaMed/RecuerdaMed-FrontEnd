import { Outlet } from "react-router-dom";
import Header from "./components/common/Header";
import NavBar from "./components/common/NavBar";
import Footer from "./components/common/Footer";

export default function Layout() {
  return (
    <div className="min-h-dvh flex flex-col bg-gray-50 text-gray-900">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 bg-white border px-3 py-2 rounded-md shadow"
      >
        Saltar al contenido
      </a>

      <Header />
      <NavBar />

      <main id="content" role="main" className="container mx-auto w-full max-w-6xl p-4 flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
