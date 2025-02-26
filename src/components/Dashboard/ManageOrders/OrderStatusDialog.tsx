import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../../ui/dialog";
import { Button } from "../../ui/button";

import { Label } from "../../ui/label";
import { Popover, PopoverTrigger, PopoverContent } from "../../ui/popover";
import { Calendar } from "../../ui/calendar";
import { format } from "date-fns";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../ui/select";
import { Order2, useUpdateOrderAdminMutation } from "../../../redux/features/Orders/orderApi";
import { useAppSelector } from "../../../redux/hooks";
import { currentToken } from "../../../redux/features/auth/authSlice";
import { toast } from "sonner";

const statusOptions = ["Pending", "Paid", "Shipped", "Completed", "Cancelled"];

const OrderStatusDialog = ({ order, refetch }: { order: Order2; refetch: () => void }) => {
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState(order.status);
    const [date, setDate] = useState<Date | undefined>();

    const handleDateChange = (newDate: Date | undefined | null) => {
        setDate(newDate ?? undefined);
    };

    const token = useAppSelector(currentToken);

    const [updateOrder] = useUpdateOrderAdminMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const updateData = {
            status,
            estimateTime: date ? date.toISOString() : "No date selected",
        };
        console.log(updateData);

        if (!token) {
            toast.error("You can't change status");
            return;
        }
        const res = await updateOrder({ orderId: order._id, token, updateData }).unwrap();
        if (res.success) {
            toast.success("Order updated successfully");
            setStatus(updateData.status);
            refetch();
        }
        setDate(undefined);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Change order status</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Update Order</DialogTitle>
                    <DialogDescription>Modify order status and select a date</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    {/* Status Dropdown */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right col-span-1">Status</Label>
                        <Select onValueChange={setStatus} value={status}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                {statusOptions.map((option) => (
                                    <SelectItem key={option} value={option}>
                                        {option}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    {/* Date Picker */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right col-span-1">Date</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="col-span-3">
                                    {date ? format(date, "PPP") : "Pick a date"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent align="start" className="p-0">
                                <Calendar mode="single" selected={date} onSelect={handleDateChange} />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default OrderStatusDialog;
