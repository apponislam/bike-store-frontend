// import demo from "../../assets/demo.jpg";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "../../ui/card";
import { Button } from "../../ui/button";
import { useDeleteProductMutation, useGetProductsQuery } from "../../../redux/features/products/productApi";
import { useAppSelector } from "../../../redux/hooks";
import { currentToken } from "../../../redux/features/auth/authSlice";
import { toast } from "sonner";
import Swal from "sweetalert2";
import ProductUpdate from "./ProductUpdate";

interface Product {
    _id: string;
    name: string;
    brand: string;
    price: number;
    photo?: string;
    category: string;
    description: string;
    quantity: number;
    inStock: boolean;
    imageUrl?: string;
    createdAt: string;
    isDelected?: boolean;
}

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

const ProductCardAdmin: React.FC<{ product: Product }> = ({ product }) => {
    const [deleteProduct] = useDeleteProductMutation();
    const { refetch } = useGetProductsQuery({}); // This refetches the products after the delete action

    const token = useAppSelector(currentToken);

    const handleDelete = (_id: string) => {
        if (!token) {
            toast.warning("You are not allowed to delete");
            return;
        }

        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            try {
                if (result.isConfirmed) {
                    const res = await deleteProduct({ _id, token });
                    console.log(res);
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success",
                    });
                }
            } catch (err: any) {
                toast.error(err?.data?.errorSources[0]?.message);
            }
        });
    };

    return (
        <Card className="w-full  shadow-md dark:bg-gray-900 transition-all hover:shadow-xl">
            <div className="relative w-full overflow-hidden">
                <img src={product?.photo ? product.photo : "/src/assets/demo.jpg"} alt={product.name} className="object-cover h-40 w-full rounded-t-xl" />
            </div>

            <CardContent className="p-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    {product.brand} | {product.category}
                </p>
                <p className="text-xl font-bold mt-2">${product.price}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Added: {formatDate(product.createdAt)}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">{product.description}</p>
            </CardContent>

            <CardFooter className="p-4">
                <div className="flex-1">
                    <div className="mb-2 flex items-center">
                        {/* <Button className="w-1/2 mr-2" variant="outline">
                            Update
                        </Button> */}
                        <ProductUpdate product={product}></ProductUpdate>

                        <Button onClick={() => handleDelete(product._id)} className="w-1/2" variant="destructive">
                            Delete
                        </Button>
                    </div>
                    <div>
                        <Link className="w-full" to={`/product/${product._id}`}>
                            <Button className="w-full">View details</Button>
                        </Link>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
};

export default ProductCardAdmin;
