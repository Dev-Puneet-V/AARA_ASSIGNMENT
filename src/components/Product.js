import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Product = (props) => {
    const { image, variant_name, price, stock_sataus, actual_price, id, variant_id, } = props;
    const navigate = useNavigate();
    const handleImageClick = () => {
        navigate(`/info?product_id=${id}&variant_id=${variant_id}`);
    };
    return (_jsxs("div", { className: "cursor-pointer relative rounded p-[5px] flex flex-col shadow-md shadow-grey-500/50 w-[250px] h-[340px]", children: [_jsx("img", { src: image, className: "h-[150px] w-[130px] m-auto", onClick: handleImageClick }), _jsx("p", { className: "font-bold", children: variant_name }), _jsx("p", { className: "text-lg text-emerald-400 font-bold text-green-10", children: stock_sataus }), _jsx("p", { className: "font-bold", children: "₹" + price }), _jsxs("div", { className: "flex gap-[5px] items-center", children: [_jsx("p", { className: "line-through", children: "₹" + actual_price }), _jsx("div", { className: "font-semibold bg-green-500 p-[1px] pl-[5px] rounded w-[60px] text-gray-100", children: ((actual_price - price) / actual_price) * 100 + " %off" })] }), _jsx(FaRegHeart, { className: "absolute top-[10px] right-[10px]" })] }));
};
export default Product;
