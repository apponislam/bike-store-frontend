import { TailSpin } from "react-loader-spinner";
import { useGetAllOrdersQuery } from "../../../redux/features/Orders/orderApi";
import { Card } from "../../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";

const ManageOrders = () => {
    const { data, isLoading, error } = useGetAllOrdersQuery();

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

    return (
        <Card className="p-4">
            <h2 className="text-lg font-semibold mb-4">Orders</h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Email</TableHead>
                        <TableHead>Product ID</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Total Price</TableHead>
                        <TableHead>Created At</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders?.map((order) => (
                        <TableRow key={order._id}>
                            <TableCell>{order.email}</TableCell>
                            <TableCell>{order?.product?.name}</TableCell>
                            <TableCell>{order.quantity}</TableCell>
                            <TableCell>${order.totalPrice}</TableCell>
                            <TableCell>{new Date(order.createdAt).toLocaleString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    );
};

export default ManageOrders;
