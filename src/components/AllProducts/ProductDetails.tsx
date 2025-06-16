import { useNavigate, useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../redux/features/products/productApi";
import { TailSpin } from "react-loader-spinner";
// import demo from "../../assets/demo.jpg";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useState } from "react";
import { useCreateOrderMutation } from "../../redux/features/Orders/orderApi";
import { useAppSelector } from "../../redux/hooks";
import { currentToken } from "../../redux/features/auth/authSlice";
import { toast } from "sonner";

const ProductDetails = () => {
    const { id } = useParams();
    const validId = id || "";
    const { data, isLoading, error } = useGetProductByIdQuery(validId);
    const navigate = useNavigate();
    const [orderQuantity, setOrderQuantity] = useState(0);
    // console.log(demo);
    // const [createOrder, { isLoading: orderLoading, isSuccess, data: orderData, isError, error: orderError }] = useCreateOrderMutation();
    const [createOrder] = useCreateOrderMutation();
    const token = useAppSelector(currentToken);

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

    // Handle decrease
    const handleDecrease = () => {
        if (orderQuantity > 0) {
            setOrderQuantity(orderQuantity - 1);
        }
    };

    // Handle increase
    const handleIncrease = () => {
        if (orderQuantity < product.quantity) {
            setOrderQuantity(orderQuantity + 1);
        }
    };

    const handleBuyButton = async (_id: string) => {
        const toastId = "cart";

        try {
            toast.loading("Processing ...", { id: toastId });

            const payload = {
                products: [{ product: _id, quantity: orderQuantity }],
            };
            console.log(payload);
            const res = await createOrder({ payload, token }).unwrap();
            console.log(res);

            toast.success(res?.message, { id: toastId });

            if (res?.data) {
                setTimeout(() => {
                    window.location.href = res.data;
                }, 1000);
            }
        } catch (err) {
            toast.error(JSON.stringify(err), { id: toastId });
        }
    };

    return (
        <div className="w-full container mx-auto p-6">
            <Card className="bg-background text-foreground shadow-lg">
                <div className="relative w-full sm:h-96 overflow-hidden rounded-t-xl">
                    <img src={product?.photo ? product.photo : "/src/assets/demo.jpg"} alt={product.name} className="object-cover w-full h-full" />
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
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Brand: {product.brand}</p>
                        <div className="flex items-center">
                            <Button
                                onClick={handleDecrease}
                                variant="outline"
                                disabled={orderQuantity <= 0} // Disable if quantity is 0
                                className="w-8 h-8 p-0 flex items-center justify-center"
                            >
                                -
                            </Button>
                            <p className="mx-4 h-8 text-xl font-semibold">{orderQuantity}</p>
                            {/* <Button variant="secondary" className="w-16 h-8 text-xl font-semibold">
                                {orderQuantity}
                            </Button> */}
                            <Button
                                onClick={handleIncrease}
                                variant="outline"
                                disabled={orderQuantity >= product.quantity} // Disable if quantity reaches available stock
                                className="w-8 h-8 p-0 flex items-center justify-center"
                            >
                                +
                            </Button>
                        </div>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Category: {product.category}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Added on: {formatDate(product.createdAt)}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Last updated: {formatDate(product.updatedAt)}</p>
                </CardContent>

                <CardFooter className="flex justify-between p-4">
                    <Button onClick={goBack} variant="outline" className="w-1/2 mr-2">
                        Go Back
                    </Button>
                    <Button onClick={() => handleBuyButton(product._id)} disabled={!product.inStock} className="w-1/2">
                        Buy Now
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default ProductDetails;
