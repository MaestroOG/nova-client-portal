'use client';
import { useActionState, useEffect, useState } from 'react';
import { Button } from './ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { changeUserIsPrivate } from '@/action/admin.actions';

const MakeClientPrivateForm = ({ userName, userId }) => {
    const [open, setOpen] = useState(false);
    const [stateMessageOpen, setStateMessageOpen] = useState(false);
    const [state, formAction, isPending] = useActionState(changeUserIsPrivate, {})

    const handleClick = () => {
        setOpen(true);
    }

    useEffect(() => {
        if (state?.success || state?.message) {
            setOpen(false);
            setStateMessageOpen(true);
        }
    }, [state])
    return (
        <>
            <Button onClick={handleClick}>Make Private</Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <form action={formAction}>
                        <DialogHeader>
                            <DialogTitle>Make {userName} Private?</DialogTitle>
                            <DialogDescription>
                                Make changes to your user here.
                            </DialogDescription>
                        </DialogHeader>

                        <DialogFooter className={'mt-6'}>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button disabled={isPending} type="submit">{isPending ? 'Changing Visibility' : 'Yes, Go Ahead'}</Button>
                        </DialogFooter>

                        <input type="hidden" name='userId' value={userId} />
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={stateMessageOpen} onOpenChange={setStateMessageOpen}>
                <DialogContent>
                    <DialogHeader className={'flex items-center justify-center flex-col gap-3'}>
                        <DialogTitle>
                            {state.success ? 'Success ✅' : 'Error ⚠️'}
                        </DialogTitle>
                        <DialogDescription className={'text-lg'}>
                            {state?.message}
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default MakeClientPrivateForm