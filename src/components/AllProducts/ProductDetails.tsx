import { useNavigate, useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../redux/features/products/productApi";
import { TailSpin } from "react-loader-spinner";
// import demo from "../../assets/demo.jpg";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

const ProductDetails = () => {
    const { id } = useParams(); // Get product ID from URL
    const { data, isLoading, error } = useGetProductByIdQuery(id || ""); // Fetch product details
    const navigate = useNavigate();
    // console.log(demo);

    const goBack = () => {
        navigate(-1);
    };

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

    const product = data?.data;

    if (!product)
        return (
            <div className="flex items-center justify-center my-20">
                <h2 className="text-center font-bold text-2xl mb-5 uppercase">No product found</h2>
            </div>
        );

    const formatDate = (isoDate: string) => new Date(isoDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

    return (
        <div className="max-w-4xl mx-auto p-6">
            <Card className="bg-background text-foreground shadow-lg">
                <div className="relative w-full sm:h-96 overflow-hidden rounded-t-xl">
                    <img src={"/src/assets/demo.jpg"} alt={product.name} className="object-cover w-full h-full" />
                    {product.inStock ? <Badge className="absolute top-2 right-2 bg-green-500 text-white">In Stock</Badge> : <Badge className="absolute top-2 right-2 bg-red-500 text-white">Out of Stock</Badge>}
                </div>

                <CardHeader>
                    <CardTitle className="text-2xl font-bold">{product.name}</CardTitle>
                    <p className="text-gray-500 dark:text-gray-400">{product.description}</p>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between">
                        <p className="text-lg font-semibold">${product.price}</p>
                        <p className="text-lg font-semibold">Available: {product.quantity}</p>
                        {/* <p className="text-sm text-gray-500 dark:text-gray-400">Available: {product.quantity}</p> */}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Brand: {product.brand}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Category: {product.category}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Added on: {formatDate(product.createdAt)}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Last updated: {formatDate(product.updatedAt)}</p>
                </CardContent>

                <CardFooter className="flex justify-between p-4">
                    <Button onClick={goBack} variant="outline" className="w-1/2 mr-2">
                        Go Back
                    </Button>
                    <Button disabled={!product.inStock} className="w-1/2">
                        Buy Now
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default ProductDetails;
