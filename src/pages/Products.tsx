// @ts-ignore
import { useEffect, useState } from "react";
import axios from "axios";
import Product, { ProductDetails } from "../components/Product";
import { IoIosClose } from "react-icons/io";
interface DataToFilter {
  mainCategory: string[];
  subCategory: string[];
  subSubCategory: string[];
}

const Products = () => {
  const [products, setProducts] = useState<ProductDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>("Most Popular");
  const [selectDropdownStatus, setSelectDropdownStatus] = useState({
    mainCategory: false,
    subCategory: false,
    subSubCategory: false,
  });
  const [filteredProducts, setFilteredProducts] = useState<ProductDetails[]>(
    []
  );
  const [filters, setFilters] = useState({
    mainCategory: "",
    subCategory: "",
    subSubCategory: "",
  });
  const [dataToFilter, setDataToFilter] = useState<DataToFilter>({
    mainCategory: [],
    subCategory: [],
    subSubCategory: [],
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = "7c2b8693d001c79d4b5ed6ebc387ad6b862989dfjhjjhj";
        const response = await axios.post(
          "https://app1.crazzyhub.com/api/all-filter-product-list",
          {},
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          }
        );

        const productList = response.data?.data?.product_list || [];
        setProducts(productList);
        setFilteredProducts(productList);

        const mainCategories = Array.from<string>(
          new Set(productList.map((p: ProductDetails) => p.main_category))
        );

        setDataToFilter((prev) => ({
          ...prev,
          mainCategory: mainCategories,
        }));
        setLoading(false);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products;

    if (filters.mainCategory) {
      filtered = filtered.filter(
        (product) => product.main_category === filters.mainCategory
      );
      setSelectDropdownStatus((prevData) => ({
        ...prevData,
        mainCategory: false,
      }));
    }

    if (filters.subCategory) {
      filtered = filtered.filter(
        (product) => product.sub_category === filters.subCategory
      );
      setSelectDropdownStatus((prevData) => ({
        ...prevData,
        subCategory: false,
      }));
    }

    if (filters.subSubCategory) {
      filtered = filtered.filter(
        (product) => product.sub_sub_category === filters.subSubCategory
      );
    }
    setFilteredProducts([...filtered]);
  }, [filters, products]);
  useEffect(() => {
    console.log("Filtered", filteredProducts);
  }, [filteredProducts]);
  useEffect(() => {
    const subCategories = Array.from<string>(
      new Set(
        filteredProducts
          .filter(
            (p: ProductDetails) => filters?.mainCategory === p.main_category
          )
          .map((p: ProductDetails) => p.sub_category)
      )
    );
    setDataToFilter((prev) => ({
      ...prev,
      subCategory: subCategories,
    }));
  }, [filters.mainCategory]);
  useEffect(() => {
    const subSubCategories = Array.from<string>(
      new Set(
        filteredProducts
          .filter(
            (p: ProductDetails) =>
              filters?.mainCategory === p.main_category &&
              filters?.subCategory === p.sub_category
          )
          .map((p: ProductDetails) => p.sub_sub_category)
      )
    );
    setDataToFilter((prev) => ({
      ...prev,
      subSubCategory: subSubCategories,
    }));
  }, [filters.subCategory]);
  const handleFilterClick = (filter: string) => {
    setSelectedFilter(filter);
    // Add sorting logic based on `filter` if required
  };

  const handleFilterChange = (data: string, type: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [type]: data,
    }));
  };

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-[90vw] mx-auto">
      <div className="flex items-center justify-between py-4 border-b border-gray-200">
        <div className="flex items-center">
          {/* Main Category Filter */}
          <div className="w-[200px]">
            {filters?.mainCategory && (
              <p className="font-bold pl-[5px] text-lg">
                {filters?.mainCategory + " + "}
              </p>
            )}
            {!filters?.mainCategory && (
              <p
                className="bg-slate-200 flex justify-center items-center rounded font-bold text-center cursor-pointer p-[5px]"
                onClick={() => {
                  setSelectDropdownStatus((prevData) => ({
                    ...prevData,
                    mainCategory: !prevData.mainCategory,
                  }));
                }}
              >
                Select Main Category
              </p>
            )}
            {selectDropdownStatus.mainCategory && (
              <div className="w-[200px] bg-slate-100">
                {dataToFilter.mainCategory.map((data) => (
                  <p
                    key={data}
                    onClick={() => handleFilterChange(data, "mainCategory")}
                    className={`cursor-pointer text-center ${
                      filters.mainCategory === data ? "" : ""
                    }`}
                  >
                    {data}
                  </p>
                ))}
              </div>
            )}
          </div>
          {filters?.mainCategory?.trim() && (
            <div className="w-[200px] relative">
              {filters?.subCategory && (
                <div className="w-[100px] pl-[5px] text-sm bg-slate-200 flex items-center gap-2 p-[3px] rounded">
                  <p>{filters?.subCategory}</p>
                  <IoIosClose
                    className="cursor-pointer text-lg pt-[3px]"
                    onClick={() => {
                      setFilters((prevData) => ({
                        ...prevData,
                        subCategory: "",
                      }));
                      setSelectDropdownStatus((prevData) => ({
                        ...prevData,
                        subCategory: false,
                      }));
                    }}
                  />
                </div>
              )}
              {!filters?.subCategory && (
                <p
                  className="bg-slate-200 flex justify-center items-center rounded font-bold text-center cursor-pointer p-[5px]"
                  onClick={() => {
                    setSelectDropdownStatus((prevData) => ({
                      ...prevData,
                      subCategory: !prevData.subCategory,
                    }));
                  }}
                >
                  Select Sub Category
                </p>
              )}
              {selectDropdownStatus.subCategory && (
                <div className="w-[200px] bg-slate-100 absolute top-[35px]">
                  {dataToFilter.subCategory.map((data) => (
                    <p
                      key={data}
                      onClick={() => handleFilterChange(data, "subCategory")}
                      className={`cursor-pointer text-center ${
                        filters.subCategory === data ? "" : ""
                      }`}
                    >
                      {data}
                    </p>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sorting Options */}
        <div className="flex items-center gap-4">
          {["Most Popular", "Top Reviews", "Newest First"].map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilterClick(filter)}
              className={`px-4 py-2 text-sm font-medium border rounded ${
                selectedFilter === filter
                  ? "bg-red-500 text-white border-red-500"
                  : "bg-white text-gray-800 border-gray-300"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Product List */}
      <ul className="flex gap-[30px] flex-wrap mt-6 justify-center">
        {filteredProducts.map((product: ProductDetails, index: number) => (
          <Product key={index} {...product} />
        ))}
      </ul>
    </div>
  );
};

export default Products;
