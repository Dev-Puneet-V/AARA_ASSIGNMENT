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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleVariantChange = (type: string, id: number) => {
    setVariant((prev) => ({
      ...prev,
      [type]: id,
    }));
  };

  useEffect(() => {
    const fetchVariant = async () => {
      try {
        const token = "7c2b8693d001c79d4b5ed6ebc387ad6b862989dfjhjjhj";
        const response = await axios.get(
          `https://app1.crazzyhub.com/api/product-variant-filter-api/?product_id=${productId}&variant_id=${data?.data?.id}&color_variant_id=${variant?.color_variant_id}&storage_variant_id=${variant?.storage_variant_id}&other_variant_id=${variant?.other_variant_id}&search=other`,
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          }
        );
        const product = response.data || {};
        setData(product);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
        setLoading(false);
      }
    };

    if (
      variant?.color_variant_id &&
      variant?.other_variant_id &&
      variant?.storage_variant_id
    ) {
      fetchVariant();
    }
  }, [variant]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = "7c2b8693d001c79d4b5ed6ebc387ad6b862989dfjhjjhj";
        const response = await axios.get(
          `https://app1.crazzyhub.com/api/product-details-api/?product_id=${productId}&variant_id=${variantId}`,
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          }
        );

        const product = response.data || {};
        setData(product);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex gap-6 mt-[10px]">
      <div className="w-[30%] flex flex-col">
        <img
          src={data?.data?.variant_image}
          className="h-[400px] w-[80%] m-auto"
        />
        <img src={data?.data?.variant_image} className="h-[100px] w-[100px]" />
      </div>
      <div>
        <p className="font-bold text-xl">{data?.data?.product_variant_name}</p>
        <p
          className={
            +data?.data?.quantity > 0 ? `text-green-400` : `text-pink-700`
          }
        >
          {+data?.data?.quantity > 0 ? "In Stock" : "Out Of Stock"}
        </p>

        <div className="flex items-center gap-2">
          <p>{"₹" + data?.data?.price}</p>
          <p className="line-through">{"₹" + data?.data?.mrp}</p>
          <p>
            {((+data?.data?.mrp - +data?.data?.price) / +data?.data?.mrp) *
              100 +
              "%"}
          </p>
        </div>
        <p className="font-bold">{data?.data?.color_variant}</p>
        <div className="flex gap-2">
          {data?.data?.variant_color_values?.map((color) => {
            return (
              <div
                className={`cursor-pointer flex flex-col justify-center items-center ${
                  variant.color_variant_id === color?.id
                    ? "border-2 border-orange-500"
                    : ""
                }`}
                key={color?.id}
                onClick={() =>
                  handleVariantChange("color_variant_id", color?.id)
                }
              >
                <img
                  src={color?.variant_image}
                  className="h-[80px] w-[100px]"
                />
                <p>{color?.value}</p>
              </div>
            );
          })}
        </div>
        <p className="font-bold">{data?.data?.storage_variant}</p>
        <div className="flex gap-2">
          {data?.data?.variant_storage_values?.map((storage) => {
            return (
              <div
                key={storage?.id}
                className={`cursor-pointer ${
                  variant.storage_variant_id === storage?.id
                    ? "border-2 border-orange-500"
                    : ""
                }`}
                onClick={() =>
                  handleVariantChange("storage_variant_id", storage?.id)
                }
              >
                <p>{storage?.value}</p>
              </div>
            );
          })}
        </div>
        <p className="font-bold">{data?.data?.other_variant}</p>
        <div className="flex gap-2">
          {data?.data?.other_variant_values?.map((other) => {
            return (
              <div
                className={`cursor-pointer ${
                  variant.other_variant_id === other?.id
                    ? "border-2 border-orange-500"
                    : ""
                }`}
                key={other?.id}
                onClick={() =>
                  handleVariantChange("other_variant_id", other?.id)
                }
              >
                <p>{other?.value}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
