'use client';

import { changeProfilePicture } from "@/action/profile.actions";
import Container from "@/components/dashboardComponents/Container"
import { Button } from "@/components/ui/button";
import { useActionState, useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

const ChangePicturePage = () => {
    const [state, formAction, isPending] = useActionState(changeProfilePicture, {})
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (state?.success || state?.message) {
            setOpen(true);
        }
    }, [state])
    return (
        <>
            <Container className={'bg-white p-2 md:p-4'}>
                <h1 className="text-2xl md:text-4xl font-bold">Change Profile Picture</h1>
                <form className="mt-4" action={formAction}>
                    <input
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 p-4"
                        type="file"
                        accept="image/png, image/jpeg"
                        id="image"
                        name="image"
                    />
                    <Button type='submit' className={'mt-2'} disabled={isPending}>Upload Image</Button>
                </form>

            </Container>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {state.success ? "✅ Success" : "⚠️ Error"}
                        </DialogTitle>
                    </DialogHeader>
                    {state.message && <p>{state.message}</p>}
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ChangePicturePage