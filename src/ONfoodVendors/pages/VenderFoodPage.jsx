import React, { useMemo, useRef, useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import FoodVendorMealCategory from "../components/FoodVendor/FoodVendorMealCategory";
import FoodVendorProducts from "../containers/FoodVendor/FoodVendorProducts";
import PaginationButtons from "../components/FoodVendor/PaginationButtons";
import ProductViewModal from "../containers/FoodVendor/ProductViewModal";
import { useLiveGetCategoriesFromVendor } from "../../services/hooks/menu/useLiveGetCategoriesFromVendor";
import { useCurrentUser } from "../../services/hooks/profile/useCurrentUserLiveData";
import { useVendorFoodsLivePaginated } from "../../services/hooks/menu/useLiveGetAllProductsPaginated";

const getLocalizedField = (item, field, isArabic) =>
  isArabic ? item?.[`${field}Arabic`] || item?.[field] : item?.[field];

const VenderFoodPage = () => {
  const [pageSize, setPageSize] = useState(12);
  useEffect(() => {
    const updatePageSize = () => {
      if (window.innerWidth < 1524) { 
        setPageSize(10);
      } else { 
        setPageSize(12);
      }
    };

    updatePageSize(); // initial
    window.addEventListener("resize", updatePageSize);

    return () => window.removeEventListener("resize", updatePageSize);
  }, []);
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const { selectedVendorMealCategory, searchTerm, sortOption } = useSelector((state) => state.food);

  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const productsRef = useRef(null);
  const [viewModalItem, setViewModalItem] = useState({});

  const { data: currentVendor, isLoading: isCurrentVendorLoading } = useCurrentUser();

  const {
    pages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isFoodsLoading,
  } = useVendorFoodsLivePaginated(currentVendor?.id, selectedVendorMealCategory, pageSize);

  const { categories: vendorCategories, loading: isCategoryLoading } = useLiveGetCategoriesFromVendor(currentVendor?.id);

  const scrollToProducts = () =>
    productsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const handleNext = useCallback(() => {
    if (currentPageIndex + 1 < (pages?.length || 0)) {
      setCurrentPageIndex((prev) => prev + 1);
      scrollToProducts();
    } else if (hasNextPage) {
      Promise.resolve(fetchNextPage()).then(() => {
        setCurrentPageIndex((prev) => prev + 1);
        scrollToProducts();
      });
    }
  }, [currentPageIndex, pages?.length, hasNextPage, fetchNextPage]);

  const handlePrevious = useCallback(() => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex((prev) => prev - 1);
      scrollToProducts();
    }
  }, [currentPageIndex]);

  const isNextDisabled =
    (!hasNextPage && currentPageIndex === (pages?.length || 0) - 1) || isFetchingNextPage;

  const filteredFoods = useMemo(() => {
    const currentFoods = pages?.[currentPageIndex]?.foods || [];
    let result = currentFoods;

    if (selectedVendorMealCategory && selectedVendorMealCategory !== "All") {
      result = result.filter((food) => food?.category === selectedVendorMealCategory);
    }

    if (searchTerm?.trim()) {
      const lower = searchTerm.toLowerCase();
      result = result.filter((food) =>
        ["name", "description", "category"].some((field) =>
          getLocalizedField(food, field, isArabic)?.toLowerCase().includes(lower)
        )
      );
    }

    if (sortOption === "lowToHigh") {
      result = [...result].sort((a, b) => (a.itemPrice ?? 0) - (b.itemPrice ?? 0));
    } else if (sortOption === "highToLow") {
      result = [...result].sort((a, b) => (b.itemPrice ?? 0) - (a.itemPrice ?? 0));
    }

    return result;
  }, [pages, currentPageIndex, selectedVendorMealCategory, searchTerm, sortOption, isArabic]);

  const limitedFoods = useMemo(() => filteredFoods.slice(0, 12), [filteredFoods]);

  const venderLogo = currentVendor?.image;
  const isOnline = currentVendor?.isOnline;

  if (isCurrentVendorLoading) return <div>Loading...</div>;

  const handleClickView = (item) => setViewModalItem(item);

  return (
    <div className="min-h-screen scrollbar-hide bg-gradient-to-br from-gray-50 to-gray-100" dir={isArabic ? "rtl" : "ltr"}>
      <div className="overflow-y-hidden bg-gradient-to-br from-white to-offwhite rounded-t-2xl z-30 -mt-4 scrollbar-hide">
        <div ref={productsRef} className="bg-gradient-to-br from-white to-offwhite shadow-sm sm:shadow-xl p-2 sm:p-4">
          <div className="mb-3 sm:mb-4">
            <FoodVendorMealCategory
              setCurrentPageIndex={setCurrentPageIndex}
              isOnline={isOnline}
              isLoading={isCategoryLoading}
              categories={vendorCategories}
              selectedCategory={selectedVendorMealCategory}
            />
          </div>

          <FoodVendorProducts
            isLoading={isFoodsLoading}
            isOnline={isOnline}
            foodItems={limitedFoods}
            isArabic={isArabic}
            venderLogo={venderLogo}
            currentVendor={currentVendor}
            onClickView={handleClickView}
          />

          {!isFoodsLoading && (
            <div className="mt-3 sm:mt-4">
              <PaginationButtons
                isOnline={isOnline}
                currentPageIndex={currentPageIndex}
                handleNext={handleNext}
                handlePrevious={handlePrevious}
                isArabic={isArabic}
                isFetchingNextPage={isFetchingNextPage}
                isNextDisabled={isNextDisabled}
              />
            </div>
          )}
        </div>
      </div>

      {viewModalItem && Object.keys(viewModalItem).length > 0 && (
        <ProductViewModal item={viewModalItem} onClose={() => setViewModalItem(null)} />
      )}
    </div>
  );
};

export default VenderFoodPage;
