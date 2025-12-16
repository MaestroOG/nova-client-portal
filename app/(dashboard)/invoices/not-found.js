'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function InvoiceNotFoundPage() {
    return (
        <main className="flex h-screen flex-col items-center justify-center text-center px-4">
            <h1 className="text-6xl font-bold mb-2">✅</h1>
            <p className="text-lg text-gray-500 mb-6">
                The invoice you’re looking for doesn’t exist or has been deleted.
            </p>
            <Link
                href="/"
                className="rounded-lg transition"
            >
                <Button>Go Home</Button>
            </Link>
        </main>
    )
}