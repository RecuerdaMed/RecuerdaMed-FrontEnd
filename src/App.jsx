import Header from './components/layout/Header';
import Calendar from './components/ui/Calendar';
import Footer from './components/layout/Footer';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <Calendar />
      <main className="flex-grow">
       <Outlet/>
      </main>

      <Footer />
    </div>
  );
}

export default App;