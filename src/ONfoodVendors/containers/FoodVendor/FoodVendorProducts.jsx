import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setVendorMealCategory } from "../../../slices/food/foodSlice.js";
import isEqual from "fast-deep-equal";
import FoodCardInVendor from "../../components/FoodVendor/FoodCardInVendor";
import SkeltonFoodCard from "../../components/menus/SkeltonFoodCard";
import { useNavigate } from "react-router-dom";

const FoodVendorProductsComponent = ({ foodItems = [], venderLogo, isLoading, isOnline ,currentVendor,onClickView}) => {
  const navigate=useNavigate()
  console.log(foodItems,"food items")
  if (isLoading) return <SkeltonFoodCard />;
  const vendorType=currentVendor?.vendorType?.split("/")[0]
  return (
    <div className="py-2 px-2 ] scrollbar-hide ">
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 bg-gradient-to-br  p-4 rounded-md">
        {foodItems?.map((item) => (
          <FoodCardInVendor
          onClickView={onClickView}
            key={item.id}
            item={item}
            isOnline={isOnline}
            venderLogo={venderLogo}
            onClick={()=>{navigate(`/menu/${vendorType}/${item.category}/${item.id}`)}}
          />
        ))}
      </div>
    </div>
  );
};

const FoodVendorProducts = React.memo(
  FoodVendorProductsComponent,
  (prev, next) =>
    prev.isLoading === next.isLoading &&
    prev.isOnline === next.isOnline &&
    prev.venderLogo === next.venderLogo &&
    isEqual(prev.foodItems, next.foodItems)
);

// Only run this effect once on mount, not on every render of the memoized component
export default function FoodVendorProductsWrapper(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setVendorMealCategory("All"));
    window.scrollTo({ top: 0, behavior: "smooth" });
    // Only on mount
    // eslint-disable-next-line
  }, [dispatch]);
  return <FoodVendorProducts {...props} />;
}
