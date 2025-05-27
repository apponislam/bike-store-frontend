import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { Button } from "../../ui/button";
import { useDeleteContactMutation, useGetAllContactsQuery } from "../../../redux/features/Contacts/contactApi";
import { toast } from "sonner";

const ContactMessagesTable = () => {
    const { data: contacts, isLoading, refetch } = useGetAllContactsQuery();

    const [deleteContact] = useDeleteContactMutation();

    const handleDelete = async (id: string) => {
        try {
            const result = await deleteContact(id);
            console.log(result);
            toast.success("Message deleted successfully");
            refetch();
        } catch (error) {
            toast.error("Failed to delete message");
        }
    };

    if (isLoading) return <div>Loading messages...</div>;

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead className="w-[300px]">Message</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {contacts?.data?.length ? (
                        contacts.data.map((contact) => (
                            <TableRow key={contact._id}>
                                <TableCell>{contact.name}</TableCell>
                                <TableCell>{contact.email}</TableCell>
                                <TableCell>{contact.subject}</TableCell>
                                <TableCell className="truncate max-w-[300px]">{contact.message}</TableCell>
                                <TableCell>{new Date(contact.createdAt || "").toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <Button variant="destructive" size="sm" onClick={() => handleDelete(contact._id)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} className="h-24 text-center">
                                No messages found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default ContactMessagesTable;
