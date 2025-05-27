import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { UserRoundPen, Lock, Mail, Calendar, Shield } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import { currentUser } from "../../../redux/features/auth/authSlice";
import { useAppSelector } from "../../../redux/hooks";
import { useChangePasswordMutation } from "../../../redux/features/Users/userApi";

interface PasswordForm {
    oldPassword: string;
    repeatOldPassword: string;
    newPassword: string;
}

const Profile = () => {
    const user = useAppSelector(currentUser);
    const [changePassword] = useChangePasswordMutation();
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, reset } = useForm<PasswordForm>();

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-lg">User not found</p>
            </div>
        );
    }

    const onSubmit = async (data: PasswordForm) => {
        if (data.newPassword.length < 6) {
            toast.info("Password must be at least 6 characters");
            return;
        }

        if (data.oldPassword !== data.repeatOldPassword) {
            toast.warning("Old passwords don't match");
            return;
        }

        try {
            const res = await changePassword({
                oldPassword: data.oldPassword,
                newPassword: data.newPassword,
            }).unwrap();

            if (res.success) {
                toast.success("Password changed successfully");
                reset();
                setOpen(false);
            } else {
                toast.error(res.message || "Password change failed");
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        }
    };

    const formattedDate = new Date(user?.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="min-h-screen bg-gradient-to-br  p-4 md:p-8">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Profile Card */}
                    <div className="lg:col-span-1">
                        <Card className="h-full shadow-lg border border-gray-200 dark:border-gray-700">
                            <CardHeader className="flex flex-col items-center relative pb-8">
                                <div className="relative">
                                    <Avatar className="w-40 h-40 border-4 border-primary rounded-full">
                                        <AvatarImage src={user.photo} alt={user.name} className="object-cover" />
                                        <AvatarFallback className="text-4xl font-bold">{user.name?.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <Dialog open={open} onOpenChange={setOpen}>
                                        <DialogTrigger asChild>
                                            <Button variant="outline" size="icon" className="absolute -bottom-2 -right-2 rounded-full w-12 h-12 bg-white dark:bg-gray-800 shadow-md">
                                                <UserRoundPen className="w-5 h-5" />
                                            </Button>
                                        </DialogTrigger>
                                    </Dialog>
                                </div>
                                <CardTitle className="text-2xl mt-6 text-center">{user.name}</CardTitle>
                                <Badge variant="outline" className="mt-2 px-4 py-1 text-sm">
                                    {user.role}
                                </Badge>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <Mail className="w-5 h-5 text-gray-500" />
                                    <span className="text-gray-700 dark:text-gray-300">{user.email}</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Calendar className="w-5 h-5 text-gray-500" />
                                    <span className="text-gray-700 dark:text-gray-300">Joined {formattedDate}</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Shield className="w-5 h-5 text-gray-500" />
                                    <span className="text-gray-700 dark:text-gray-300">Admin privileges</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Content Area */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Card className="p-4">
                                <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
                                <p className="text-2xl font-bold mt-1">24</p>
                            </Card>
                            <Card className="p-4">
                                <h3 className="text-sm font-medium text-gray-500">Products Added</h3>
                                <p className="text-2xl font-bold mt-1">56</p>
                            </Card>
                            <Card className="p-4">
                                <h3 className="text-sm font-medium text-gray-500">Active Users</h3>
                                <p className="text-2xl font-bold mt-1">128</p>
                            </Card>
                        </div>

                        {/* Recent Activity */}
                        <Card className="p-6">
                            <CardTitle className="text-xl mb-4">Recent Activity</CardTitle>
                            <div className="space-y-4">
                                {[
                                    { action: "Updated product", item: "Mountain Bike Pro", time: "2 hours ago" },
                                    { action: "Processed order", item: "#ORD-45678", time: "5 hours ago" },
                                    { action: "Added new product", item: "Road Bike Elite", time: "1 day ago" },
                                ].map((activity, index) => (
                                    <div key={index} className="flex items-start pb-4 border-b border-gray-100 dark:border-gray-700 last:border-0">
                                        <div className="bg-primary/10 p-2 rounded-full mr-3">
                                            <UserRoundPen className="w-4 h-4 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-medium">
                                                {activity.action}: <span className="text-primary">{activity.item}</span>
                                            </p>
                                            <p className="text-sm text-gray-500">{activity.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Password Change Dialog */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="flex items-center">
                            <Lock className="w-5 h-5 mr-2" />
                            Change Password
                        </DialogTitle>
                        <DialogDescription>Ensure your account security with a strong password</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="oldPassword">Current Password</Label>
                                <Input id="oldPassword" type="password" placeholder="Enter current password" {...register("oldPassword", { required: true })} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="repeatOldPassword">Confirm Current Password</Label>
                                <Input id="repeatOldPassword" type="password" placeholder="Confirm current password" {...register("repeatOldPassword", { required: true })} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="newPassword">New Password</Label>
                                <Input id="newPassword" type="password" placeholder="Enter new password (min 6 characters)" {...register("newPassword", { required: true })} />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Update Password</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Profile;
