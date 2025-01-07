import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// @ts-ignore
import { useEffect, useState } from "react";
import axios from "axios";
import Product from "../components/Product";
import { IoIosClose } from "react-icons/io";
const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedFilter, setSelectedFilter] = useState("Most Popular");
    const [selectDropdownStatus, setSelectDropdownStatus] = useState({
        mainCategory: false,
        subCategory: false,
        subSubCategory: false,
    });
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filters, setFilters] = useState({
        mainCategory: "",
        subCategory: "",
        subSubCategory: "",
    });
    const [dataToFilter, setDataToFilter] = useState({
        mainCategory: [],
        subCategory: [],
        subSubCategory: [],
    });
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = "7c2b8693d001c79d4b5ed6ebc387ad6b862989dfjhjjhj";
                const response = await axios.post("https://app1.crazzyhub.com/api/all-filter-product-list", {}, {
                    headers: {
                        Authorization: token,
                        "Content-Type": "application/json",
                    },
                });
                const productList = response.data?.data?.product_list || [];
                setProducts(productList);
                setFilteredProducts(productList);
                const mainCategories = Array.from(new Set(productList.map((p) => p.main_category)));
                setDataToFilter((prev) => ({
                    ...prev,
                    mainCategory: mainCategories,
                }));
                setLoading(false);
            }
            catch (err) {
                setError(err.message || "Something went wrong");
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);
    useEffect(() => {
        let filtered = products;
        if (filters.mainCategory) {
            filtered = filtered.filter((product) => product.main_category === filters.mainCategory);
            setSelectDropdownStatus((prevData) => ({
                ...prevData,
                mainCategory: false,
            }));
        }
        if (filters.subCategory) {
            filtered = filtered.filter((product) => product.sub_category === filters.subCategory);
            setSelectDropdownStatus((prevData) => ({
                ...prevData,
                subCategory: false,
            }));
        }
        if (filters.subSubCategory) {
            filtered = filtered.filter((product) => product.sub_sub_category === filters.subSubCategory);
        }
        setFilteredProducts([...filtered]);
    }, [filters, products]);
    useEffect(() => {
        console.log("Filtered", filteredProducts);
    }, [filteredProducts]);
    useEffect(() => {
        const subCategories = Array.from(new Set(filteredProducts
            .filter((p) => filters?.mainCategory === p.main_category)
            .map((p) => p.sub_category)));
        setDataToFilter((prev) => ({
            ...prev,
            subCategory: subCategories,
        }));
    }, [filters.mainCategory]);
    useEffect(() => {
        const subSubCategories = Array.from(new Set(filteredProducts
            .filter((p) => filters?.mainCategory === p.main_category &&
            filters?.subCategory === p.sub_category)
            .map((p) => p.sub_sub_category)));
        setDataToFilter((prev) => ({
            ...prev,
            subSubCategory: subSubCategories,
        }));
    }, [filters.subCategory]);
    const handleFilterClick = (filter) => {
        setSelectedFilter(filter);
        // Add sorting logic based on `filter` if required
    };
    const handleFilterChange = (data, type) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [type]: data,
        }));
    };
    if (loading)
        return _jsx("div", { children: "Loading products..." });
    if (error)
        return _jsxs("div", { children: ["Error: ", error] });
    return (_jsxs("div", { className: "w-[90vw] mx-auto", children: [_jsxs("div", { className: "flex items-center justify-between py-4 border-b border-gray-200", children: [_jsxs("div", { className: "flex items-center", children: [_jsxs("div", { className: "w-[200px]", children: [filters?.mainCategory && (_jsx("p", { className: "font-bold pl-[5px] text-lg", children: filters?.mainCategory + " + " })), !filters?.mainCategory && (_jsx("p", { className: "bg-slate-200 flex justify-center items-center rounded font-bold text-center cursor-pointer p-[5px]", onClick: () => {
                                            setSelectDropdownStatus((prevData) => ({
                                                ...prevData,
                                                mainCategory: !prevData.mainCategory,
                                            }));
                                        }, children: "Select Main Category" })), selectDropdownStatus.mainCategory && (_jsx("div", { className: "w-[200px] bg-slate-100", children: dataToFilter.mainCategory.map((data) => (_jsx("p", { onClick: () => handleFilterChange(data, "mainCategory"), className: `cursor-pointer text-center ${filters.mainCategory === data ? "" : ""}`, children: data }, data))) }))] }), filters?.mainCategory?.trim() && (_jsxs("div", { className: "w-[200px] relative", children: [filters?.subCategory && (_jsxs("div", { className: "w-[100px] pl-[5px] text-sm bg-slate-200 flex items-center gap-2 p-[3px] rounded", children: [_jsx("p", { children: filters?.subCategory }), _jsx(IoIosClose, { className: "cursor-pointer text-lg pt-[3px]", onClick: () => {
                                                    setFilters((prevData) => ({
                                                        ...prevData,
                                                        subCategory: "",
                                                    }));
                                                    setSelectDropdownStatus((prevData) => ({
                                                        ...prevData,
                                                        subCategory: false,
                                                    }));
                                                } })] })), !filters?.subCategory && (_jsx("p", { className: "bg-slate-200 flex justify-center items-center rounded font-bold text-center cursor-pointer p-[5px]", onClick: () => {
                                            setSelectDropdownStatus((prevData) => ({
                                                ...prevData,
                                                subCategory: !prevData.subCategory,
                                            }));
                                        }, children: "Select Sub Category" })), selectDropdownStatus.subCategory && (_jsx("div", { className: "w-[200px] bg-slate-100 absolute top-[35px]", children: dataToFilter.subCategory.map((data) => (_jsx("p", { onClick: () => handleFilterChange(data, "subCategory"), className: `cursor-pointer text-center ${filters.subCategory === data ? "" : ""}`, children: data }, data))) }))] }))] }), _jsx("div", { className: "flex items-center gap-4", children: ["Most Popular", "Top Reviews", "Newest First"].map((filter) => (_jsx("button", { onClick: () => handleFilterClick(filter), className: `px-4 py-2 text-sm font-medium border rounded ${selectedFilter === filter
                                ? "bg-red-500 text-white border-red-500"
                                : "bg-white text-gray-800 border-gray-300"}`, children: filter }, filter))) })] }), _jsx("ul", { className: "flex gap-[30px] flex-wrap mt-6 justify-center", children: filteredProducts.map((product, index) => (_jsx(Product, { ...product }, index))) })] }));
};
export default Products;
