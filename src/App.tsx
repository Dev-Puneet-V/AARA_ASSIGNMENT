// @ts-ignore
import ProductDetails from "./pages/ProductInfo";
import Products from "./pages/Products";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/info" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
