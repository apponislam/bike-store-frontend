import { TailSpin } from "react-loader-spinner";
import { useGetProductsQuery } from "../../../redux/features/products/productApi";
import ProductCardAdmin from "./ProductCardAdmin";
import AddProduct from "./AddProducts";

const ManageProducts = () => {
    const filter = {};
    const { data, isLoading, error } = useGetProductsQuery(filter, { pollingInterval: 5000 });

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
    const products = data?.data || [];

    // Filter area

    return (
        <div className="container mx-auto my-4">
            <div className="mx-5 sm:mx-0">
                <h2 className="text-center font-bold text-2xl mb-5 uppercase">All Products</h2>

                <div className="mb-4 flex items-center justify-end">
                    <AddProduct></AddProduct>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                    {products?.map((product) => (
                        <ProductCardAdmin key={product._id} product={product}></ProductCardAdmin>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ManageProducts;
