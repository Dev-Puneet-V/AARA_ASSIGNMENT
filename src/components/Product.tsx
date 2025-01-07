import { FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export interface ProductDetails {
  quantity: string;
  price: number;
  whishlist_status: string;
  variant_id: number;
  variant_name: string;
  actual_price: number;
  image: string;
  color_variant_id: number;
  color_variant_name: string;
  storage_variant_id: number;
  storage_variant_name: string;
  other_variant_id: number;
  other_variant_name: string;
  stock_sataus: string;
  id: number;
  Meta_Title: string;
  Meta_Keyword: string;
  Meta_Description: string;
  title: string;
  HSN: string;
  description: string;
  arriving_soon: boolean;
  show_for_user: boolean;
  is_bestseller: boolean;
  admin_permission: string;
  lastedit_date: string;
  permission: number;
  slug: string;
  main_category_id: number;
  main_category: string;
  sub_category_id: number;
  sub_category: string;
  sub_sub_category_id: string;
  sub_sub_category: string;
  brand_id: number;
  brand_name: string;
  store_id: number;
}

const Product = (props: ProductDetails) => {
  const {
    image,
    variant_name,
    price,
    stock_sataus,
    actual_price,
    id,
    variant_id,
  } = props;
  const navigate = useNavigate();
  const handleImageClick = () => {
    navigate(`/info?product_id=${id}&variant_id=${variant_id}`);
  };
  return (
    <div className="cursor-pointer relative rounded p-[5px] flex flex-col shadow-md shadow-grey-500/50 w-[250px] h-[340px]">
      <img
        src={image}
        className="h-[150px] w-[130px] m-auto"
        onClick={handleImageClick}
      />
      <p className="font-bold">{variant_name}</p>
      <p className="text-lg text-emerald-400 font-bold text-green-10">
        {stock_sataus}
      </p>
      <p className="font-bold">{"₹" + price}</p>
      <div className="flex gap-[5px] items-center">
        <p className="line-through">{"₹" + actual_price}</p>
        <div className="font-semibold bg-green-500 p-[1px] pl-[5px] rounded w-[60px] text-gray-100">
          {((actual_price - price) / actual_price) * 100 + " %off"}
        </div>
      </div>
      <FaRegHeart className="absolute top-[10px] right-[10px]" />
    </div>
  );
};

export default Product;
