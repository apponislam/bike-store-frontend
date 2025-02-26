import { useState } from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { toast } from "sonner";
import { useCreateProductMutation, useGetProductsQuery } from "../../../redux/features/products/productApi"; // Import createProduct mutation
import { useAppSelector } from "../../../redux/hooks";
import { currentToken } from "../../../redux/features/auth/authSlice";
import axios from "axios";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";

const AddProduct = () => {
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, reset, setValue } = useForm();
    const [createProduct] = useCreateProductMutation(); // Use createProduct mutation
    const { refetch } = useGetProductsQuery({});

    const token = useAppSelector(currentToken);

    const onSubmit = async (data: any) => {
        if (!token) {
            toast.error("You are not allowed to add a product");
            return;
        }

        const inStock = data.quantity > 0;

        const maindata = { ...data, inStock };

        // console.log(maindata);

        try {
            const res = await createProduct({ productData: maindata, token });

            if ((res as any)?.error) {
                const errMsg = (res as any).error.data.errorSources[0].message;
                toast.error(errMsg);
                return;
            }

            toast.success("Product added successfully!");
            setOpen(false);
            refetch(); // Refetch the product list
            reset(); // Reset the form
        } catch (err: any) {
            toast.error("Failed to add product");
            console.log(err);
        }
    };

    const uploadImage = (file: File) => {
        const formData = new FormData();
        formData.append("image", file);

        axios
            .post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGAPI}`, formData)
            .then((response) => {
                console.log(response.data.data);
                setValue("photo", response.data.data.url); // Set the image URL in the form
            })
            .catch((error) => {
                toast.error("Failed to upload image");
                console.error(error);
            });
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            uploadImage(file);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Add New Product</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                    <DialogDescription>Fill in the details to add a new product</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right col-span-1">
                                Name
                            </Label>
                            <Input id="name" {...register("name", { required: true })} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="brand" className="text-right col-span-1">
                                Brand
                            </Label>
                            <Input id="brand" {...register("brand", { required: true })} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="price" className="text-right col-span-1">
                                Price
                            </Label>
                            <Input id="price" type="number" {...register("price", { required: true, valueAsNumber: true })} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="category" className="text-right col-span-1">
                                Category
                            </Label>
                            <Select
                                onValueChange={(value) => setValue("category", value)} // Update form value
                            >
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Mountain">Mountain</SelectItem>
                                    <SelectItem value="Road">Road</SelectItem>
                                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                                    <SelectItem value="Electric">Electric</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right col-span-1">
                                Description
                            </Label>
                            <Input id="description" {...register("description", { required: true })} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="quantity" className="text-right col-span-1">
                                Quantity
                            </Label>
                            <Input id="quantity" type="number" {...register("quantity", { required: true, valueAsNumber: true })} className="col-span-3" />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="photo" className="text-right col-span-1">
                                Image Upload
                            </Label>
                            <Input id="photo" type="file" onChange={handleFileChange} className="col-span-3" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Add Product</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddProduct;
