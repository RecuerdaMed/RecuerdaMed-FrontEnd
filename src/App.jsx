import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import { Outlet } from 'react-router-dom';
import DrugCard from './components/medication/DrugCard.jsx';
import Calendar from './components/ui/Calendar.jsx';
import AddDrug from './pages/AddDrug.jsx';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow p-6 bg-gray-100">
        <DrugCard />
         <AddDrug/>
        <Calendar />
       
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default App;