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

const Profile = () => {
    const user = useAppSelector(currentUser);
    // console.log(user);
    if (!user) {
        return <p className="text-center text-lg">User not found</p>;
    }

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
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline" className="absolute top-6 right-6">
                                    <UserRoundPen />
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Edit profile</DialogTitle>
                                    <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-5 items-center gap-4">
                                        <Label htmlFor="password1" className="text-right col-span-2">
                                            Old password
                                        </Label>
                                        <Input id="password1" defaultValue="" placeholder="Old password" className="col-span-3" />
                                    </div>
                                    <div className="grid grid-cols-5 items-center gap-4">
                                        <Label htmlFor="password2" className="text-right col-span-2">
                                            Reapet old password
                                        </Label>
                                        <Input id="password2" defaultValue="" placeholder="Old password" className="col-span-3" />
                                    </div>
                                    <div className="grid grid-cols-5 items-center gap-4">
                                        <Label htmlFor="password3" className="text-right col-span-2">
                                            New password
                                        </Label>
                                        <Input id="password3" defaultValue="" placeholder="New password" className="col-span-3" />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit">Save changes</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
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
