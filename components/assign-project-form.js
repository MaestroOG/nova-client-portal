'use client';

import { assignProject } from "@/action/project.actions";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useActionState, useEffect, useState } from "react";

const AssignProjectForm = ({ assignableUsers, projectId }) => {

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [assignedTo, setAssignedTo] = useState("");

    const [state, formAction, isPending] = useActionState(assignProject, {});

    const handleOpenClick = () => {
        setConfirmOpen(true);
    }

    useEffect(() => {
        if (state?.success || state?.message) {
            setConfirmOpen(false);
            setOpen(true);
        }
    }, [state])
    return (
        <>
            <Button onClick={handleOpenClick}>Assign Project</Button>

            <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <form action={formAction}>
                        <input type='hidden' name='projectId' value={projectId} />
                        <DialogHeader>
                            <DialogTitle>Assign project</DialogTitle>
                            <DialogDescription>
                                Choose who you want to assign this project?
                            </DialogDescription>
                        </DialogHeader>

                        <div className='w-full mt-4'>
                            <Select onValueChange={(value) => setAssignedTo(value)} name='selectedUser'>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Assign to..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {assignableUsers.map((user) => (
                                        <SelectItem key={user._id} value={user._id}>
                                            <div className="flex items-center gap-2">
                                                <span>{user.name}</span>
                                                <span className="text-xs text-muted-foreground capitalize">
                                                    ({user.role})
                                                </span>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <input type="hidden" name='selectedUser' value={assignedTo} />
                        <DialogFooter className={'mt-5'}>
                            <DialogClose asChild>
                                <Button variant="secondary">Cancel</Button>
                            </DialogClose>
                            <Button disabled={isPending} type="submit">Confirm</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {state.success ? "✅ Success" : "⚠️ Error"}
                        </DialogTitle>
                    </DialogHeader>
                    <p>{state.message}</p>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default AssignProjectForm