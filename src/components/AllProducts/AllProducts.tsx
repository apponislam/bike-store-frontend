import { useGetProductBrandsQuery, useGetProductsQuery } from "../../redux/features/products/productApi";
import { TailSpin } from "react-loader-spinner";
import ProductCard from "./ProductCard";
import { Input } from "../ui/input";
import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Slider } from "../ui/slider";

const AllProducts = () => {
    const [value, setValue] = useState([0, 5000]);
    const [searchTerm, setSearchTerm] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [inStock, setInStock] = useState(true);

    const minPrice = value[0];
    const maxPrice = value[1];

    const params = { searchTerm, minPrice, maxPrice, brand, category, inStock };

    console.log(params);

    const { data, isLoading, error } = useGetProductsQuery(params);
    const { data: data2, isLoading: isLoding2, error: error2 } = useGetProductBrandsQuery();

    // Individual handlers for each filter
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        console.log("Search Term:", e.target.value);
    };

    const handleBrandChange = (value: string) => {
        setBrand(value === "all" ? "" : value);
        console.log("Brand:", value);
    };

    const handleCategoryChange = (value: string) => {
        setCategory(value === "all" ? "" : value);
        console.log("Category:", value);
    };

    const handleInStockChange = () => {
        setInStock(true); // Set inStock to true when "In Stock" is checked
        console.log("In Stock: true");
    };

    const handleOutOfStockChange = () => {
        setInStock(false); // Set inStock to false when "Out of Stock" is checked
        console.log("In Stock: false");
    };

    const handleResetFilters = () => {
        setSearchTerm("");
        setBrand("");
        setCategory("");
        setInStock(true);
        setValue([0, 5000]); // Reset price range
        console.log("Filters Reset");
    };

    if (isLoading || isLoding2)
        return (
            <div className="flex items-center justify-center my-20">
                <TailSpin color="#ff0000" />
            </div>
        );
    if (error || error2)
        return (
            <div className="flex items-center justify-center my-20">
                <h2 className="text-center font-bold text-2xl mb-5 uppercase">Error loading products</h2>
            </div>
        );
    const products = data?.data || [];
    const products2 = data2?.data || [];
    console.log(products2);

    const uniqueBrands = Array.from(new Set(products2?.map((p) => p.brand)));
    const uniqueCategories = Array.from(new Set(products2?.map((p) => p.category)));

    // search

    // const [searchTerm, setSearchTerm] = useState("");
    // const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setSearchTerm(e.target.value);
    //     console.log("Search Term:", e.target.value);
    // };

    // Filter area

    return (
        <div className="container mx-auto my-10">
            <div className="mx-5 sm:mx-0">
                <h2 className="text-center font-bold text-2xl mb-5 uppercase">All Products</h2>

                {/* filter area  */}

                {/* <div className="flex justify-center items-center mb-5">
                    <p className="text-xl font-bold mr-2">Search: </p>
                    <Input className="w-1/2" type="text" placeholder="Search" value={searchTerm} onChange={handleSearchChange} />
                </div> */}

                <div>
                    <div className="pb-4 space-y-4">
                        <h2 className="text-xl font-semibold">Product Search</h2>

                        {/* Search Input */}
                        <Input placeholder="Search for products" value={searchTerm} onChange={handleSearchChange} className="w-full" />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Price Range */}
                            <div>
                                <label className="block mb-3">
                                    Price Range: {minPrice} - {maxPrice}
                                </label>
                                <Slider value={value} onValueChange={(newValue) => setValue(newValue)} min={0} max={5000} step={1} minStepsBetweenThumbs={1} />
                            </div>

                            {/* Brand Select */}
                            <div>
                                <label className="block mb-3">Select Brand</label>
                                <Select onValueChange={handleBrandChange} value={brand}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a brand" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Brands</SelectItem> {/* Use "all" instead of "" */}
                                        {uniqueBrands.map((b) => (
                                            <SelectItem key={b} value={b ?? "all"}>
                                                {b}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Category Select */}
                            <div>
                                <label className="block mb-3">Select Categories</label>
                                <Select onValueChange={handleCategoryChange} value={category}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Categories</SelectItem> {/* Use "all" instead of "" */}
                                        {uniqueCategories.map((c) => (
                                            <SelectItem key={c} value={c ?? "all"}>
                                                {c}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* In-Stock Checkbox */}
                            <div>
                                <label className="block mb-3">Available</label>
                                <div className="flex flex-col space-y-2">
                                    {/* In Stock Checkbox */}
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="in-stock" checked={inStock === true} onCheckedChange={handleInStockChange} />
                                        <label htmlFor="in-stock">In Stock</label>
                                    </div>

                                    {/* Out of Stock Checkbox */}
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="out-of-stock" checked={inStock === false} onCheckedChange={handleOutOfStockChange} />
                                        <label htmlFor="out-of-stock">Out of Stock</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Apply Button */}
                        <Button onClick={handleResetFilters} className="w-full mt-4">
                            Reset
                        </Button>
                    </div>
                </div>

                {/* filter area end */}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                    {products?.map((product) => (
                        <ProductCard key={product._id} product={product}></ProductCard>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllProducts;
