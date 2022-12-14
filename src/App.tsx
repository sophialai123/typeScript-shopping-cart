import { BrowserRouter as Rounter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import Store from "./pages/Store";
import Navbar from './components/Navbar';
import { ShoppingCartProvider } from './context/UserShoppingCart';

function App() {
  return (
    <Rounter>
      <ShoppingCartProvider>
        <Navbar />
        <Container className='mb-4'>
          <Routes>
            <Route path='/' element={<Store />}>
            </Route>
          </Routes>
        </Container>
      </ShoppingCartProvider >
    </Rounter>
  );
}

export default App;
