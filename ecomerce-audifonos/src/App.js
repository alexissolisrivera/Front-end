import './App.css';
import AppRouter from './routes/AppRouter';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
function App() {
  return (
    <>
      <PayPalScriptProvider options={{ "client-id": "AZJ7rVG8aY2PkdLBCNDKAg13UU_sHLjrb_zP-qLJ-F0xOp4W6mdohswTZQoJMjgzqA_fzwI79GlSQkDU" }}>
        <Navbar />
        <AppRouter />
        <Footer />
      </PayPalScriptProvider>
    </>
  );
}

export default App;
