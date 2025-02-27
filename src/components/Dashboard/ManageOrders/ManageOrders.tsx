import { useGetOrdersQuery } from "../../../redux/features/Orders/orderApi";
import { useAppSelector } from "../../../redux/hooks";
import { currentToken } from "../../../redux/features/auth/authSlice";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { TailSpin } from "react-loader-spinner";
import OrderProgress from "../ManageMyProducts/OrderProgress";
import OrderStatusDialog from "./OrderStatusDialog";
import { format } from "date-fns";

const ManageMyOrders = () => {
    const token = useAppSelector(currentToken) ?? "";

    const { data, isLoading, error, refetch } = useGetOrdersQuery(token, { pollingInterval: 1000 });

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
                <h2 className="text-center font-bold text-2xl mb-5 uppercase">Error loading orders</h2>
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

    // const handleCancel = (orderId: string) => {
    //     // Handle cancel logic (make an API call, etc.)
    //     console.log(orderId);
    // };

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">All users order</h2>
            <div className="space-y-4">
                {orders?.map((order) => (
                    <Card key={order._id}>
                        <CardHeader>
                            <CardTitle>Order ID: {order._id}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-500">User email:</span>
                                <span className="font-semibold">{order.user?.email}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">User name:</span>
                                <span className="font-semibold">{order.user?.name}</span>
                            </div>
                            <hr />
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

                            <OrderProgress status={order.status}></OrderProgress>

                            {/* Cancel Button (only for Pending and Processing orders) */}
                            {order.status === "Pending" || order.status === "Paid" || order.status === "Shipped" ? <OrderStatusDialog order={order} refetch={refetch}></OrderStatusDialog> : null}
                            {/* <OrderStatusDialog orderid={order._id}></OrderStatusDialog> */}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ManageMyOrders;
