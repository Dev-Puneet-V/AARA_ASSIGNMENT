import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// @ts-ignore
import ProductDetails from "./pages/ProductInfo";
import Products from "./pages/Products";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
    return (_jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Products, {}) }), _jsx(Route, { path: "/info", element: _jsx(ProductDetails, {}) })] }) }));
}
export default App;
