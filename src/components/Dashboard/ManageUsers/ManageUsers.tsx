import { useGetAllUsersQuery } from "../../../redux/features/Users/userApi";
import { Card } from "../../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Button } from "../../ui/button";
import { TailSpin } from "react-loader-spinner";

const ManageUsers = () => {
    const { data, isLoading, error } = useGetAllUsersQuery();

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
                                <Button variant="destructive">Block</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    );
};

export default ManageUsers;
