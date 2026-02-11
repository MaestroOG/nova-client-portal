import Container from "@/components/dashboardComponents/Container"
import NotificationCreationForm from "@/components/notification-creation-form"
import { getAllSimpleUsers } from "@/lib/admin"
import { getUser } from "@/lib/user"
import { redirect } from "next/navigation"


const CreateNotification = async () => {
    const user = await getUser();
    const users = await getAllSimpleUsers();

    if (user?.role !== 'superadmin') {
        redirect('/');
    }
    return (
        <Container className={'bg-white p-2 md:p-4'}>
            <h1 className="text-2xl md:text-4xl font-bold">Create a Notification</h1>
            <NotificationCreationForm users={users} />
        </Container>
    )
}

export default CreateNotification