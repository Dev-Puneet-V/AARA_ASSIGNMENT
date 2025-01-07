import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// @ts-ignore
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
const ProductDetails = () => {
    const [searchParams] = useSearchParams();
    const productId = searchParams.get("product_id");
    const variantId = searchParams.get("variant_id");
    const [variant, setVariant] = useState({
        color_variant_id: null,
        storage_variant_id: null,
        other_variant_id: null,
    });
    const [data, setData] = useState({});
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState<string | null>(null);
    const handleVariantChange = (type, id) => {
        setVariant((prev) => ({
            ...prev,
            [type]: id,
        }));
    };
    useEffect(() => {
        const fetchVariant = async () => {
            try {
                const token = "7c2b8693d001c79d4b5ed6ebc387ad6b862989dfjhjjhj";
                const response = await axios.get(`https://app1.crazzyhub.com/api/product-variant-filter-api/?product_id=${productId}&variant_id=${data?.data?.id}&color_variant_id=${variant?.color_variant_id}&storage_variant_id=${variant?.storage_variant_id}&other_variant_id=${variant?.other_variant_id}&search=other`, {
                    headers: {
                        Authorization: token,
                        "Content-Type": "application/json",
                    },
                });
                const product = response.data || {};
                setData(product);
                // setLoading(false);
            }
            catch (err) {
                // setError(err.message || "Something went wrong");
                // setLoading(false);
            }
        };
        if (variant?.color_variant_id &&
            variant?.other_variant_id &&
            variant?.storage_variant_id) {
            fetchVariant();
        }
    }, [variant]);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = "7c2b8693d001c79d4b5ed6ebc387ad6b862989dfjhjjhj";
                const response = await axios.get(`https://app1.crazzyhub.com/api/product-details-api/?product_id=${productId}&variant_id=${variantId}`, {
                    headers: {
                        Authorization: token,
                        "Content-Type": "application/json",
                    },
                });
                const product = response.data || {};
                setData(product);
                // setLoading(false);
            }
            catch (err) {
                // setError(err.message || "Something went wrong");
                // setLoading(false);
            }
        };
        fetchProducts();
    }, []);
    return (_jsxs("div", { className: "flex gap-6 mt-[10px]", children: [_jsxs("div", { className: "w-[30%] flex flex-col", children: [_jsx("img", { src: data?.data?.variant_image, className: "h-[400px] w-[80%] m-auto" }), _jsx("img", { src: data?.data?.variant_image, className: "h-[100px] w-[100px]" })] }), _jsxs("div", { children: [_jsx("p", { className: "font-bold text-xl", children: data?.data?.product_variant_name }), _jsx("p", { className: +data?.data?.quantity > 0 ? `text-green-400` : `text-pink-700`, children: +data?.data?.quantity > 0 ? "In Stock" : "Out Of Stock" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("p", { children: "₹" + data?.data?.price }), _jsx("p", { className: "line-through", children: "₹" + data?.data?.mrp }), _jsx("p", { children: ((+data?.data?.mrp - +data?.data?.price) / +data?.data?.mrp) *
                                    100 +
                                    "%" })] }), _jsx("p", { className: "font-bold", children: data?.data?.color_variant }), _jsx("div", { className: "flex gap-2", children: data?.data?.variant_color_values?.map((color) => {
                            return (_jsxs("div", { className: `cursor-pointer flex flex-col justify-center items-center ${variant.color_variant_id === color?.id
                                    ? "border-2 border-orange-500"
                                    : ""}`, onClick: () => handleVariantChange("color_variant_id", color?.id), children: [_jsx("img", { src: color?.variant_image, className: "h-[80px] w-[100px]" }), _jsx("p", { children: color?.value })] }, color?.id));
                        }) }), _jsx("p", { className: "font-bold", children: data?.data?.storage_variant }), _jsx("div", { className: "flex gap-2", children: data?.data?.variant_storage_values?.map((storage) => {
                            return (_jsx("div", { className: `cursor-pointer ${variant.storage_variant_id === storage?.id
                                    ? "border-2 border-orange-500"
                                    : ""}`, onClick: () => handleVariantChange("storage_variant_id", storage?.id), children: _jsx("p", { children: storage?.value }) }, storage?.id));
                        }) }), _jsx("p", { className: "font-bold", children: data?.data?.other_variant }), _jsx("div", { className: "flex gap-2", children: data?.data?.other_variant_values?.map((other) => {
                            return (_jsx("div", { className: `cursor-pointer ${variant.other_variant_id === other?.id
                                    ? "border-2 border-orange-500"
                                    : ""}`, onClick: () => handleVariantChange("other_variant_id", other?.id), children: _jsx("p", { children: other?.value }) }, other?.id));
                        }) })] })] }));
};
export default ProductDetails;
