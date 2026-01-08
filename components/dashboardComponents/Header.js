'use client';

import { CircleDollarSign, FolderCog, House, Shield, Video, MessageCircle, Receipt, Files, Menu, X, Settings, MessageCircleQuestionMark, Users, ClipboardCheck, SearchCheck } from "lucide-react";
import Image from 'next/image'
import React, { useActionState, useEffect, useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '../ui/button'
import { signOutUser } from '@/action/user';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTrigger,
} from "@/components/ui/drawer"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NotificationBtn from './NotificationBtn';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { countUnreadNotifications } from '@/utils/notificationUtils';
import Linkify from 'linkify-react';
import Loader from '../Loader';
import { useCountry } from "@/hooks/useCountry";
import { ModeToggle } from "../mode-toggle";
import { ScrollArea } from "@/components/ui/scroll-area"

const Header = ({ userFromDB, pfpLink }) => {
    const pathname = usePathname();
    const [notifications, setNotifications] = useState(null);


    const [state, formAction, isPending] = useActionState(signOutUser, "")

    const { countryCode, loading, error } = useCountry();

    const [count, setCount] = useState(0)
    const getNotifications = async () => {
        const res = await fetch("/api/get-notifications");
        const data = await res.json();
        console.log(data)
        setNotifications(data);
    }

    const handleOpen = async () => {
        if (count > 0) {
            await fetch('/api/notifications/mark-read', { method: 'POST' });
            setCount(0)
        }
    }

    useEffect(() => {
        const fetchUnread = async () => {
            const res = await fetch("/api/notifications/unread");
            const data = await res.json();
            console.log(data)
            const unreadNotifs = countUnreadNotifications(data.notifications, userFromDB?._id);
            setCount(unreadNotifs);
        };
        fetchUnread();
    }, [userFromDB]);



    useEffect(() => {
        getNotifications();
    }, []);


    const links = [
        {
            icon: <House />,
            title: "Dashboard",
            href: "/",
        },
        ...(userFromDB?.role !== "manager" || userFromDB?.role !== 'team-member'
            ? [
                {
                    icon: <FolderCog />,
                    title: "Projects",
                    href: "/projects",
                },
            ]
            : []),
        {
            icon: <Video />,
            title: "How-To",
            href: '/how-to'
        },
        {
            icon: <Files />,
            title: "Resources",
            href: '/resources'
        },
        {
            icon: <MessageCircleQuestionMark />,
            title: "FAQs",
            href: '/faqs'
        },
        ...(userFromDB?.role !== "team-member"
            ? [
                {
                    icon: <CircleDollarSign />,
                    title: "Pricing",
                    href: "/pricing",
                },
            ]
            : []),
        {
            icon: <MessageCircle />,
            title: "Comments",
            href: "/comments"
        },
        {
            icon: <SearchCheck />,
            title: "Audits",
            href: "/audits"
        },
        ...(userFromDB?.role === "superadmin"
            ? [
                {
                    icon: <Receipt />,
                    title: "Invoices",
                    href: "/invoices",
                },
                {
                    icon: <ClipboardCheck />,
                    title: "Tasks",
                    href: "/tasks",
                },
                {
                    icon: <Users />,
                    title: "Discussions",
                    href: "/discussions"
                },
                {
                    icon: <Shield />,
                    title: "Admin Panel",
                    href: "/admin",
                },
            ]
            : []),
    ];


    return (
        <header className='w-full px-8 py-2 md:py-9 flex items-center dark:bg-background bg-background-gray justify-between md:justify-end gap-4 sticky top-0 z-50'>

            <Link href={'/'} className='block dark:hidden md:hidden'><Image src='/logo.svg' alt="Nova Protocols logo" width={135} height={37} priority /></Link>
            <Link href={'/'} className='hidden dark:block md:hidden md:dark:hidden'><Image src='/logo-light.png' alt="Nova Protocols logo" width={135} height={37} priority /></Link>
            <div className='flex items-center gap-4'>
                <ModeToggle />
                <div className="flex items-center gap-4">

                    {userFromDB?.credit > 0 && <div className="max-sm:hidden flex items-center gap-2 p-2 border border-primary">
                        <CircleDollarSign className="text-foreground" />
                        <p className="text-foreground">${Number(userFromDB?.credit).toFixed(2)}</p>
                    </div>}
                    {/* <div className="flex items-center">
                        {loading && <Loader size="h-4 w-4" />}
                        {!loading && !error && countryCode && <Image
                            src={countryCode.trim() === 'ZA' ? '/south-africa.svg' : "/australia.svg"}
                            width={32}
                            height={32}
                            alt="country_flag"
                            className="cursor-pointer hidden md:block"
                        />
                        }

                    </div> */}
                    <Popover onOpenChange={handleOpen}>
                        <PopoverTrigger> <NotificationBtn length={count} /></PopoverTrigger>
                        <PopoverContent className={'w-[400px] h-96 overflow-y-auto'}>
                            <div className='flex items-center justify-between'>
                                <h4 className='font-semibold'>Notifications</h4>
                            </div>
                            <div className='mt-2'>
                                {notifications?.length === 0 && <div className='p-4 text-center'>No Notifications For Now.</div>}
                                {notifications?.length > 0 && notifications?.map(notification => (
                                    <div key={notification?._id} className='mt-2'>
                                        <Alert variant="default" key={notification?._id}>
                                            <AlertTitle>{notification?.title}</AlertTitle>
                                            <AlertDescription>
                                                <Linkify options={{ target: '_blank', className: 'text-blue-500 underline' }}>{notification?.description}</Linkify>
                                            </AlertDescription>
                                        </Alert>
                                    </div>
                                ))}
                            </div>

                        </PopoverContent>
                    </Popover>
                </div>
                <div className="flex items-center">
                    <Popover>
                        <PopoverTrigger>
                            <div className='relative w-10 h-10'>
                                {userFromDB && <Image src={pfpLink || '/placeholder-avatar.svg'} fill className='rounded-full cursor-pointer object-cover' priority alt='avatar' />}
                            </div>
                        </PopoverTrigger>
                        <PopoverContent>
                            <Link href={'/profile'}><Button variant={'outline'} className={'mb-2 w-full'}>Profile</Button></Link>
                            <form action={formAction}>
                                <Button disabled={isPending} type="submit" className={'w-full flex items-center justify-center gap-2'}>
                                    {isPending && <Loader size='h-4 w-4' />}
                                    <span>Sign Out</span>
                                </Button>
                            </form>
                            {state && <span>{state}</span>}
                        </PopoverContent>
                    </Popover>
                </div>

                <div className="flex items-center md:hidden">
                    <Drawer direction="left">
                        <DrawerTrigger className="md:hidden">
                            <Menu className="text-foreground" size={23} />
                        </DrawerTrigger>

                        <DrawerContent className="bg-background-gray dark:bg-background h-full flex flex-col">

                            {/* Header */}
                            <DrawerHeader className="shrink-0">
                                <div className="mt-2">
                                    {/* You can add stuff here if needed */}
                                    <DrawerClose asChild>
                                        <X className="text-foreground" size={23} />
                                    </DrawerClose>
                                </div>
                            </DrawerHeader>

                            {/* Scrollable links */}
                            <ScrollArea className="flex-1 overflow-y-auto px-4">
                                <div className="sidebar-menu py-2">
                                    {links.map((link, i) => {
                                        const isActive =
                                            pathname === link.href ||
                                            pathname.startsWith(link.href + "/");

                                        return (
                                            <DrawerClose asChild key={i}>
                                                <Link
                                                    href={link.href}
                                                    className={`${isActive
                                                        ? "bg-primary text-background dark:text-foreground"
                                                        : "text-foreground"
                                                        } sidebar-link flex items-center gap-2 py-3`}
                                                >
                                                    {/* {link.icon} */}
                                                    <span className="text-lg font-bold">{link.title}</span>
                                                </Link>
                                            </DrawerClose>
                                        );
                                    })}
                                </div>
                            </ScrollArea>

                            {/* Footer */}
                            <DrawerFooter className="shrink-0 w-full">
                                <DrawerClose asChild>
                                    <Link href="/profile">
                                        <Button className="flex items-center gap-2 w-full">
                                            <Settings size={32} />
                                            <span className="text-white text-lg font-semibold">
                                                Profile Setting
                                            </span>
                                        </Button>
                                    </Link>
                                </DrawerClose>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>

                </div>
            </div>
        </header>
    )
}

export default Header