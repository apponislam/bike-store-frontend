import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
// import demo from "../../assets/demo.jpg";
import { Link } from "react-router-dom";

interface Product {
    _id: string;
    name: string;
    brand: string;
    price: number;
    photo?: string;
    category: string;
    isDelected?: boolean;
    description: string;
    quantity: number;
    inStock: boolean;
    imageUrl?: string;
    createdAt: string;
}

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    // console.log(demo);
    return (
        <Card className="w-full  shadow-md dark:bg-gray-900 transition-all hover:shadow-xl">
            <div className="relative w-full overflow-hidden">
                <img src={product?.photo ? product.photo : "/src/assets/demo.jpg"} alt={product.name} className="object-cover h-44 w-full rounded-t-xl" />
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

            <CardFooter className="flex justify-between p-4">
                <Link className="w-full" to={`/product/${product._id}`}>
                    <Button className="w-full">View details</Button>
                </Link>
            </CardFooter>
        </Card>
    );
};

export default ProductCard;
