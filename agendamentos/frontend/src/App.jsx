import AppRoutes from './routes/AppRoutes';
import Header from './components/Header';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <AppRoutes />
    </div>
  );
}

export default App;
