import { TailSpin } from "react-loader-spinner";
import { useGetProductsQuery } from "../../redux/features/products/productApi";
import ProductCard from "../AllProducts/ProductCard";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const SpecialProducts = () => {
    const { data, isLoading, error } = useGetProductsQuery();

    const products = data?.data || [];
    console.log(products);

    const topProducts = products
        .filter((product) => typeof product.quantity === "number")
        .sort((a, b) => (b.quantity || 0) - (a.quantity || 0))
        .slice(0, 6);

    if (isLoading)
        return (
            <div className="flex items-center justify-center my-20">
                <TailSpin color="#ff0000" />
            </div>
        );
    if (error)
        return (
            <div className="flex items-center justify-center my-20">
                <h2 className="text-center font-bold text-2xl mb-5 uppercase">Error loading products</h2>
            </div>
        );

    return (
        <div className="container mx-auto my-10">
            <div className="mx-5 sm:mx-0">
                <h2 className="text-center font-bold text-2xl mb-5 uppercase">Top Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                    {topProducts?.map((product) => (
                        <ProductCard key={product._id} product={product}></ProductCard>
                    ))}
                </div>
                <div className="flex items-center justify-center mt-4">
                    <Link to="/products">
                        <Button>VIEW ALL</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SpecialProducts;
