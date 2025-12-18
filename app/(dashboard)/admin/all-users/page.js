import Container from '@/components/dashboardComponents/Container'
import { Badge } from '@/components/ui/badge';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { getAllAgenciesWithUsers } from '@/lib/admin'

const AllUsersPage = async () => {

    const agencies = await getAllAgenciesWithUsers();
    return (
        <Container className="bg-white px-2 md:px-4 py-3 shadow-sm">
            <h1 className="font-bold text-2xl md:text-4xl mb-4">All Users</h1>
            <div className="space-y-4">
                {Object.entries(agencies).map(([agencyName, users]) => (
                    <Alert key={agencyName} variant="default" className="flex-col items-start">
                        <AlertTitle className="font-bold">{agencyName}:</AlertTitle>
                        <AlertDescription className="mt-2 space-y-1">
                            {users.map(user => (
                                <div key={user._id}>
                                    {user.name} {user.role === "user" ? <Badge>Owner</Badge> : <Badge variant="secondary">{user?.position}</Badge>}
                                </div>
                            ))}
                        </AlertDescription>
                    </Alert>
                ))}
            </div>
        </Container>
    )
}

export default AllUsersPage