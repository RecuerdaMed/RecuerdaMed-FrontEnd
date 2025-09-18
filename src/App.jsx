import Header from './components/layout/Header';
import Calendar from './components/ui/Calendar';
import Footer from './components/layout/Footer';
import { Outlet } from 'react-router-dom';
import DrugCard from './components/medication/DrugCard';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow p-6 bg-gray-100">
        <DrugCard />

        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default App;