import { Avatar } from "@radix-ui/react-avatar";
import { currentUser } from "../../../redux/features/auth/authSlice";
import { useAppSelector } from "../../../redux/hooks";
import { Badge } from "../../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { UserRoundPen } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import { useChangePasswordMutation } from "../../../redux/features/Users/userApi";

interface PasswordForm {
    oldPassword: string;
    repeatOldPassword: string;
    newPassword: string;
}

const Profile = () => {
    const user = useAppSelector(currentUser);
    if (!user) {
        return <p className="text-center text-lg">User not found</p>;
    }

    const [changePassword] = useChangePasswordMutation();

    const [open, setOpen] = useState(false);

    const { register, handleSubmit, reset } = useForm<PasswordForm>();

    const onSubmit = async (data: PasswordForm) => {
        console.log("Submitted Data:", data);

        if (data.newPassword.length < 6) {
            toast.info("password must be at least 6 characters");
            return;
        }

        if (data.oldPassword !== data.repeatOldPassword) {
            toast.warning("Old password and repeated password are not same");
            return;
        }

        const newData = {
            oldPassword: data.oldPassword,
            newPassword: data.newPassword,
        };

        console.log(newData);

        const res = await changePassword(newData);

        if (res?.data?.success) {
            toast.success("password changed successfully");
            reset();
            setOpen(false);
        } else if (!res?.data?.success) {
            toast.error("Password does not match");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh] relative">
            <Card className="w-full max-w-md shadow-lg border border-gray-200 dark:border-gray-700">
                <CardHeader className="flex flex-col items-center relative">
                    <Avatar className="w-52 h-52 border-4 border-gray-300 dark:border-gray-600 rounded-full">
                        <AvatarImage src={user.photo} alt={user.name} className="rounded-full object-cover" />
                        <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-xl mt-3">{user.name}</CardTitle>

                    <div>
                        {/* <Dialog open={open} onOpenChange={setOpen}> */}
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Dialog
                                open={open}
                                onOpenChange={(isOpen) => {
                                    setOpen(isOpen);
                                }}
                            >
                                <DialogTrigger asChild>
                                    <Button variant="outline" className="absolute top-6 right-6">
                                        <UserRoundPen />
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Edit profile</DialogTitle>
                                        <DialogDescription>Update your password</DialogDescription>
                                    </DialogHeader>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="grid gap-4 py-4">
                                            <div className="grid grid-cols-5 items-center gap-4">
                                                <Label htmlFor="password1" className="text-right col-span-2">
                                                    Old password
                                                </Label>
                                                <Input id="password1" type="password" placeholder="Old password" {...register("oldPassword", { required: true })} className="col-span-3" />
                                            </div>
                                            <div className="grid grid-cols-5 items-center gap-4">
                                                <Label htmlFor="password2" className="text-right col-span-2">
                                                    Repeat old password
                                                </Label>
                                                <Input id="password2" type="password" placeholder="Repeat old password" {...register("repeatOldPassword", { required: true })} className="col-span-3" />
                                            </div>
                                            <div className="grid grid-cols-5 items-center gap-4">
                                                <Label htmlFor="password3" className="text-right col-span-2">
                                                    New password
                                                </Label>
                                                <Input id="password3" type="password" placeholder="New password" {...register("newPassword", { required: true })} className="col-span-3" />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button type="submit">Save changes</Button>
                                        </DialogFooter>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </form>
                    </div>
                </CardHeader>
                <CardContent className="text-center space-y-3">
                    <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
                    <Badge className="px-3 py-1">{user.role}</Badge>
                </CardContent>
            </Card>
        </div>
    );
};

export default Profile;
