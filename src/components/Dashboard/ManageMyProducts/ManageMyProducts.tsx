import { useCancelOrderMutation, useGetAllOrdersQuery } from "../../../redux/features/Orders/orderApi";
import { useAppSelector } from "../../../redux/hooks";
import { currentToken } from "../../../redux/features/auth/authSlice";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { TailSpin } from "react-loader-spinner";
import OrderProgress from "./OrderProgress";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { format } from "date-fns";

const ManageMyOrders = () => {
    const token = useAppSelector(currentToken) ?? "";

    const { data, isLoading, error, refetch } = useGetAllOrdersQuery(token, { pollingInterval: 1000 });
    const [cancelOrder] = useCancelOrderMutation();

    const orders = data?.data;

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

    // const formatDate = (isoDate: string) => {
    //     return new Date(isoDate).toLocaleDateString("en-US", {
    //         year: "numeric",
    //         month: "long",
    //         day: "numeric",
    //     });
    // };

    const getEstimatedDelivery = (order: any) => {
        if (order.estimateTime) {
            return format(new Date(order.estimateTime), "MMMM dd, yyyy");
        }
        const createdAt = new Date(order.createdAt);
        const estimatedDate = new Date(createdAt.setDate(createdAt.getDate() + 3));
        return format(estimatedDate, "MMMM dd, yyyy");
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Pending":
                return "bg-yellow-500"; // Pending status - Yellow
            case "Paid":
                return "bg-green-500"; // Paid status - Green
            case "Shipped":
                return "bg-blue-500"; // Shipped status - Blue
            case "Completed":
                return "bg-purple-500"; // Completed status - Purple
            case "Cancelled":
                return "bg-red-500"; // Cancelled status - Red
            default:
                return "bg-gray-500"; // Default color - Gray
        }
    };

    const handleCancel = (orderId: string) => {
        console.log(`Cancelling order with ID: ${orderId}`);

        if (!token) {
            toast.warning("You are not allowed to delete");
            return;
        }

        Swal.fire({
            title: "Are you sure?",
            text: "You want to cancel this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!",
        }).then(async (result) => {
            try {
                if (result.isConfirmed) {
                    const res = await cancelOrder({ orderId, token });
                    console.log(res);
                    refetch();
                    Swal.fire({
                        title: "Order cancelled!",
                        text: "Your order has been cancelled.",
                        icon: "success",
                    });
                }
            } catch (err: any) {
                toast.error(err?.data?.errorSources[0]?.message);
            }
        });
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Track My Order</h2>
            <div className="space-y-4">
                {orders?.map((order) => (
                    <Card key={order._id}>
                        <CardHeader>
                            <CardTitle>Order ID: {order._id}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {order.products.map((item: any) => (
                                <div key={item._id} className="flex justify-between">
                                    <span>
                                        {item.product.name} × {item.quantity}
                                    </span>
                                    <span className="font-semibold">${item.product.price * item.quantity}</span>
                                </div>
                            ))}
                            <div className="flex justify-between">
                                <span className="text-gray-500">Total Price:</span>
                                <span className="font-semibold">${order.totalPrice}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Estimated Delivery:</span>
                                <span className="font-semibold">{getEstimatedDelivery(order)}</span>
                            </div>
                            {/* <div className="flex justify-between">
                                <span className="text-gray-500">Estimated Delivery:</span>
                                <span className="font-semibold">{formatDate(order?.createdAt as string)}</span>
                            </div> */}
                            <div className="flex justify-between">
                                <span className="text-gray-500">Payment Status:</span>
                                <Badge className={`${getStatusColor(order?.status)} text-white`}>{order?.status}</Badge>
                            </div>

                            {/* Progress Bar */}
                            {/* <div className="my-4">
                                <span className="text-gray-500">Order Progress:</span>
                                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${getProgress(order.status)}%` }}></div>
                                </div>
                            </div> */}
                            {order?.status === "Cancelled" ? null : <OrderProgress status={order.status}></OrderProgress>}

                            {/* Cancel Button (only for Pending and Processing orders) */}
                            {order.status === "Pending" || order.status === "Paid" || order.status === "Shipped" ? (
                                <button onClick={() => handleCancel(order._id)} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                                    Cancel Order
                                </button>
                            ) : null}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ManageMyOrders;
