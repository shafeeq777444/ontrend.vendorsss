/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SlidersHorizontal, Search } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Input } from "../../../components/ui/input";
import Filter from "../menus/Filter";
import { setSearchTerm, setVendorMealCategory } from "../../../slices/food/foodSlice";
import SkeletonCategoryTabs from "../menus/SkeltonVendorFoodCategories";
import { useNavigate } from "react-router-dom";

import AddButton from "../common/AddButton";
import { useCurrentUser } from "../../../services/hooks/profile/useCurrentUserLiveData";

// Debounce hook
function useDebouncedValue(value, delay) {
    const [debounced, setDebounced] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debounced;
}

const FoodVendorMealCategory = ({ categories = [], selectedCategory, isLoading, isOnline, setCurrentPageIndex }) => {
    const dispatch = useDispatch();
    const { searchTerm, sortOption } = useSelector((state) => state.food);
    const [localSearch, setLocalSearch] = useState(searchTerm);
    const debouncedSearch = useDebouncedValue(localSearch, 400);
    const [showFilter, setShowFilter] = useState(false);
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const { data: currentVendor } = useCurrentUser();

    const filterRef = useRef(null);
    const filterButtonRef = useRef(null);
    const scrollRef = useRef(null);
    const searchInputRef = useRef(null);
    const navigate = useNavigate();
    // Sync debounced search
    useEffect(() => {
        if (debouncedSearch !== searchTerm) {
            dispatch(setSearchTerm(debouncedSearch));
            setCurrentPageIndex(0);
        }
    }, [debouncedSearch, searchTerm, dispatch, setCurrentPageIndex]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!filterRef.current?.contains(e.target) && !filterButtonRef.current?.contains(e.target)) {
                setShowFilter(false);
            }
        };
        if (showFilter) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showFilter]);

    const handleSearchIconClick = useCallback(() => {
        setIsSearchExpanded(true);
        setTimeout(() => searchInputRef.current?.focus(), 150);
    }, []);

    const handleSearchChange = useCallback((e) => setLocalSearch(e.target.value), []);

    const handleSearchBlur = useCallback(() => {
        if (!localSearch.trim()) setIsSearchExpanded(false);
    }, [localSearch]);

    const handleSearchKeyDown = useCallback(
        (e) => {
            if (e.key === "Escape") {
                setIsSearchExpanded(false);
                setLocalSearch("");
                dispatch(setSearchTerm(""));
            }
        },
        [dispatch]
    );

    const handleCategoryClick = useCallback(
        (category) => {
            dispatch(setVendorMealCategory(category));
            setCurrentPageIndex(0);
        },
        [dispatch, setCurrentPageIndex]
    );

    const handleFilterButtonClick = useCallback(() => {
        setShowFilter((prev) => !prev);
    }, []);

    const updateScrollButtons = useCallback(() => {
        const el = scrollRef.current;
        if (el) {
            setCanScrollLeft(el.scrollLeft > 0);
            setCanScrollRight(el.scrollLeft + el.offsetWidth < el.scrollWidth);
        }
    }, []);

    useEffect(() => {
        updateScrollButtons();
        const el = scrollRef.current;
        if (el) {
            el.addEventListener("scroll", updateScrollButtons);
            window.addEventListener("resize", updateScrollButtons);
        }
        return () => {
            el?.removeEventListener("scroll", updateScrollButtons);
            window.removeEventListener("resize", updateScrollButtons);
        };
    }, [updateScrollButtons]);

    const scrollByAmount = 200;

    const scrollLeft = () => {
        scrollRef.current?.scrollBy({ left: -scrollByAmount, behavior: "smooth" });
    };

    const scrollRight = () => {
        scrollRef.current?.scrollBy({ left: scrollByAmount, behavior: "smooth" });
    };

    const categoryButtons = useMemo(
        () =>
            categories.map((category, i) => {
                const isSelected = selectedCategory === category;
                return (
                    <button
                        key={category + i}
                        onClick={() => handleCategoryClick(category)}
                        className={`snap-start flex-shrink-0 px-4 sm:px-5 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200
            ${isSelected ? "bg-sky-500 text-white shadow-md" : "bg-gray-100 hover:bg-gray-200"}
            focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-white`}
                        aria-pressed={isSelected}
                    >
                        {category}
                    </button>
                );
            }),
        [categories, selectedCategory, handleCategoryClick]
    );

    if (isLoading) return <SkeletonCategoryTabs />;

    return (
        <div className="relative p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white shadow-sm sm:shadow-xl">
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Menu</h2>
                <div className="flex items-center gap-1.5 sm:gap-2">
                    <AnimatePresence mode="wait">
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate(`/menu/${currentVendor?.vendorType.split("/")[0]}/new/new`)}
                            className="flex items-center justify-center w-16 sm:w-20 h-8 sm:h-9 rounded-lg sm:rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs sm:text-sm font-medium duration-200 shadow-sm hover:shadow-md transition-all"
                            aria-label="Add New Item"
                        >
                            <span className="hidden sm:inline">Add New</span>
                            <span className="sm:hidden">+</span>
                        </motion.button>
                        {!isSearchExpanded ? (
                            <motion.button
                                key="search-icon"
                                onMouseDown={handleSearchIconClick}
                                className="p-1.5 sm:p-2 bg-gray-100 hover:bg-gray-200 rounded-lg sm:rounded-xl transition-colors duration-200"
                                aria-label="Search"
                            >
                                <Search size={18} className="text-gray-600 w-4 h-4 sm:w-5 sm:h-5" />
                            </motion.button>
                        ) : (
                            <motion.div
                                key="search-input"
                                initial={{ opacity: 0, width: 30 }}
                                animate={{ opacity: 1, width: 180 }}
                                exit={{ opacity: 0, width: 30 }}
                                transition={{ duration: 0.25 }}
                                className="sm:min-w-[200px]"
                            >
                                <Input
                                    ref={searchInputRef}
                                    type="text"
                                    placeholder="Search meals..."
                                    value={localSearch}
                                    onChange={handleSearchChange}
                                    onBlur={handleSearchBlur}
                                    onKeyDown={handleSearchKeyDown}
                                    className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <button
                        ref={filterButtonRef}
                        onClick={handleFilterButtonClick}
                        className="p-1.5 sm:p-2 bg-gray-100 hover:bg-gray-200 rounded-lg sm:rounded-xl transition-colors duration-200"
                        aria-label="Filter options"
                    >
                        <SlidersHorizontal size={18} className="text-gray-600 w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                </div>
            </div>

            {/* Filter Dropdown */}
            <AnimatePresence>
                {showFilter && (
                    <motion.div
                        ref={filterRef}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-10 right-4 border rounded-xl shadow-md z-20"
                    >
                        <Filter
                            setCurrentPageIndex={setCurrentPageIndex}
                            showFilter={showFilter}
                            setShowFilter={setShowFilter}
                            sortOption={sortOption}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Scrollable Category Tabs with Buttons */}
            <div className="relative mt-3 sm:mt-4">
                {canScrollLeft && (
                    <button
                        onClick={scrollLeft}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm p-1.5 sm:p-2 rounded-full shadow-sm hover:shadow-md transition-all duration-200 active:scale-95"
                        aria-label="Scroll left"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                )}

                <div
                    ref={scrollRef}
                    className="mx-6 sm:mx-8 flex gap-2.5 sm:gap-3 overflow-x-auto scroll-smooth scrollbar-hide pb-1 -mb-1"
                    style={{ scrollBehavior: "smooth", scrollbarWidth: 'none' }}
                >
                    {categoryButtons}
                </div>

                {canScrollRight && (
                    <button
                        onClick={scrollRight}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm p-1.5 sm:p-2 rounded-full shadow-sm hover:shadow-md transition-all duration-200 active:scale-95"
                        aria-label="Scroll right"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
};

export default React.memo(FoodVendorMealCategory);
