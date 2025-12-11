import React from 'react'
import Container from './dashboardComponents/Container'
import { getUser } from '@/lib/user'

const IntroText = async () => {
    const user = await getUser();
    return (
        <Container className={'bg-white p-4 rounded-lg max-sm:mt-0'}>
            <div className="max-w-2xl">
                <h1 className="font-bold text-2xl md:text-4xl">Welcome to the Nova Protocols
                    <br />
                    {user?.name} - {user?.agency || user?.companyName}
                </h1>
                <p className="mt-3 text-black">This isn’t just a portal. It’s your agency’s control center, giving you complete visibility over projects, performance, and priority support. Everything is built to keep your workflow smooth, fast, and scalable.</p>

                <ul className='list-disc marker:text-[#4B0082] ml-6'>
                    <li className='mt-3 text-2xl font-medium dark:text-background text-indent-[-0.5em]'>Launch Projects Instantly</li>
                    <p className="mt-1 text-black">Submit client campaigns in just a few clicks. Our team picks up new tasks within hours so your agency never slows down.</p>
                    <li className='mt-3 text-2xl font-medium dark:text-background text-indent-[-0.5em]'>Explore Services Effortlessly</li>
                    <p className="mt-1 text-black">From SEO and Google Ads to web development and creative support, browse all services with clear details designed to help you scale confidently.</p>
                    <li className='mt-3 text-2xl font-medium dark:text-background text-indent-[-0.5em]'>Support on Demand</li>
                    <p className="mt-1 text-black">Get instant answers through live chat. No long waits, no back-and-forth delays. Just fast, reliable communication whenever you need it.</p>
                    <li className='mt-3 text-2xl font-medium dark:text-background text-indent-[-0.5em]'>Fast-Tracked Delivery</li>
                    <p className="mt-1 text-black">Every project is moved into production quickly. No downtime, no bottlenecks, just consistent progress for you and your clients.</p>

                </ul>

                <p className="mt-4 text-black">We’re excited to partner with your agency and help you deliver exceptional results, every time.</p>
            </div>
        </Container>
    )
}

export default IntroText