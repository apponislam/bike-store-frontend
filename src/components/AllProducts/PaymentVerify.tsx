import { TailSpin } from "react-loader-spinner";
import { useVerifyOrderQuery } from "../../redux/features/Orders/orderApi";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { currentToken } from "../../redux/features/auth/authSlice";

const PaymentVerify = () => {
    const [searchParams] = useSearchParams();
    const order_id = searchParams.get("order_id");

    const token = useAppSelector(currentToken);

    const { isLoading, data } = useVerifyOrderQuery(
        { order_id, token },
        {
            refetchOnMountOrArgChange: true,
        }
    );

    if (isLoading)
        return (
            <div className="flex items-center justify-center my-20">
                <TailSpin color="#ff0000" />
            </div>
        );

    const orderData = data?.data?.[0];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <Card className="w-full max-w-lg shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl font-bold">Payment Verification</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Order ID: <strong>{orderData?.order_id}</strong>
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Amount:{" "}
                        <strong>
                            {orderData?.currency} {orderData?.amount}
                        </strong>
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Method: <strong>{orderData?.method}</strong>
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Status: <strong className={orderData?.bank_status === "Success" ? "text-green-500" : "text-red-500"}>{orderData?.bank_status}</strong>
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Transaction ID: <strong>{orderData?.bank_trx_id}</strong>
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Date & Time: <strong>{orderData?.date_time}</strong>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};

export default PaymentVerify;
