import { useGetProductsQuery } from "../../redux/features/products/productApi";
import { TailSpin } from "react-loader-spinner";
import ProductCard from "./ProductCard";

const AllProducts = () => {
    const { data, isLoading, error } = useGetProductsQuery();

    const products = data?.data || [];

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
                <h2 className="text-center font-bold text-2xl mb-5 uppercase">All Products</h2>
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
