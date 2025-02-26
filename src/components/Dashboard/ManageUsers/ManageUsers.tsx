import { useChangeUserStatusMutation, useGetAllUsersQuery } from "../../../redux/features/Users/userApi";
import { Card } from "../../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Button } from "../../ui/button";
import { TailSpin } from "react-loader-spinner";
import { useAppSelector } from "../../../redux/hooks";
import { currentToken } from "../../../redux/features/auth/authSlice";
import Swal from "sweetalert2";
import { toast } from "sonner";

const ManageUsers = () => {
    const { data, isLoading, error, refetch } = useGetAllUsersQuery();
    const [changeUserStatus] = useChangeUserStatusMutation();
    const token = useAppSelector(currentToken);

    const users = data?.data;

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

    const handleUserStatus = (user: any) => {
        console.log("Hii", user);

        const userId = user._id;

        Swal.fire({
            title: "Are you sure?",
            text: "You want to update this",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
        }).then(async (result) => {
            try {
                if (result.isConfirmed) {
                    const res = await changeUserStatus({ userId, token });
                    console.log(res);
                    refetch();
                    Swal.fire({
                        title: "Updated!",
                        text: `${res?.data?.data?.name} status changed to ${res?.data?.data?.status}`,
                        icon: "success",
                    });
                }
            } catch {
                toast.error("User statuc change failed");
            }
        });
    };

    return (
        <Card className="w-full p-6">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Photo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users?.map((user) => (
                        <TableRow key={user._id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                            <TableCell>
                                <Avatar className="w-12 h-12 rounded-full border-2">
                                    <AvatarImage src={user?.photo} alt={user.name} />
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                            </TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell className="text-right">
                                <Button onClick={() => handleUserStatus(user)} className={`w-28 ${user?.status === "active" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"} text-white`}>
                                    {user?.status === "active" ? "Block User" : "Activate User"}
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    );
};

export default ManageUsers;
