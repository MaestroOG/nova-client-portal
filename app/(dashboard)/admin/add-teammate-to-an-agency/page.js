import AddTeammateToAgencyForm from '@/components/add-teammate-to-agency-form'
import Container from '@/components/dashboardComponents/Container'
import { getAllCompanyNames } from '@/lib/admin';
import { getUser } from '@/lib/user';
import { redirect } from 'next/navigation';
import React from 'react'

const AddTeammatePage = async () => {
    const user = await getUser();
    const companies = await getAllCompanyNames();

    if (user?.role !== 'superadmin') {
        redirect('/');
    }

    return (
        <Container className="bg-white px-2 md:px-4 py-3 shadow-sm overflow-hidden">
            <h1 className="text-2xl md:text-4xl font-bold">Add a Teammate to an Agency</h1>
            <div className='mt-6'>
                {/* Add your form or content for adding a teammate here */}
                <AddTeammateToAgencyForm companies={companies} />
            </div>
        </Container>
    )
}

export default AddTeammatePage