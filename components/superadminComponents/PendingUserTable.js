'use client';
import { addUser } from '@/action/addUser';
import { rejectUser } from '@/action/rejectUser';
import { Button } from '@/components/ui/button'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Image from 'next/image'
import { useActionState, useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '../ui/dialog';
import Link from 'next/link';
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const PendingUserTable = ({ pendingUsers }) => {
    const [open, setOpen] = useState(false);
    const [message, addUserFormAction, isPending] = useActionState(addUser, { err: "", success: false });
    const [rejMessage, rejectUserFormAction, isRejectPending] = useActionState(rejectUser, { rejErr: "", success: false });
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [checked, setChecked] = useState(false)

    const handleClick = () => {
        setIsConfirmOpen(true);
    }

    useEffect(() => {
        if (message?.success) {
            setOpen(true)
        }
    }, [message, rejMessage]);
    return (
        <div className='overflow-x-auto w-full'>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Business Name</TableHead>
                        <TableHead className={'max-sm:hidden'}>Owner Name</TableHead>
                        <TableHead className={'max-sm:hidden'}>Contact Email</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {pendingUsers?.map(user => (
                        <TableRow key={user?._id}>
                            <TableCell className="font-medium">{user?.companyName}</TableCell>
                            <TableCell className={'max-sm:hidden'}>{user?.name}</TableCell>
                            <TableCell className={'max-sm:hidden'}>{user?.email}</TableCell>
                            <TableCell className="text-right flex items-center justify-end gap-4">


                                <Button type='button' onClick={handleClick}>
                                    <Image src={'/tick.svg'} width={24} height={24} alt='tick' />
                                </Button>

                                <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <form action={addUserFormAction}>
                                            <DialogHeader>
                                                <DialogTitle>Do you want to assign credit to the user?</DialogTitle>
                                                <DialogDescription>
                                                    You can assign credit later as well.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="grid gap-4 mt-4">
                                                <div className="flex items-center gap-3">
                                                    <Checkbox checked={checked}
                                                        onCheckedChange={(value) => setChecked(!!value)}
                                                        id="credit" />
                                                    <Label htmlFor="credit">Assign Credit</Label>
                                                </div>
                                                <div className="grid gap-3">
                                                    <Label htmlFor="creditAmount">Credit Amount</Label>
                                                    <Input type="number" id="creditAmount" name="creditAmount" disabled={!checked} placeholder="Enter credit amount" />
                                                </div>
                                            </div>
                                            <input type="hidden" name='userId' value={user?._id} />
                                            <DialogFooter className={'mt-4'}>
                                                <DialogClose asChild>
                                                    <Button variant="outline">Cancel</Button>
                                                </DialogClose>
                                                <Button type="submit" disabled={isPending}>Add User</Button>
                                            </DialogFooter>
                                        </form>
                                    </DialogContent>
                                </Dialog>

                                <form action={rejectUserFormAction}>

                                    <input type="hidden" name='userId' value={user?._id} />
                                    <Button type='submit' disabled={isRejectPending}>
                                        <Image src={'/cancel.svg'} width={24} height={24} alt='cancel' />
                                    </Button>
                                </form>
                                <Link href={`/pending-users/${user?._id}`}><Button><Image src={'/eye-open.svg'} width={24} height={24} alt='cancel' /></Button></Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>



                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent>
                        <DialogHeader className={'flex items-center justify-center flex-col gap-3'}>
                            <DialogTitle><Image width={100} height={100} src={'/check-circle.svg'} alt="check-circle" /></DialogTitle>
                            <DialogDescription className={'text-lg'}>
                                Action completed successfully!
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </Table>
        </div>
    )
}

export default PendingUserTable