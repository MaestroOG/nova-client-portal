import { SignUpForm } from "@/components/signup-form";
import Image from "next/image";

export const metadata = {
    title: "Sign Up"
}

export default function SignUpPage() {
    return (
        (<div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10 bg-white">
                <div className="flex justify-center gap-2 md:justify-start">
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full">
                        <SignUpForm />
                    </div>
                </div>
            </div>
            <div className="bg-secondary relative hidden lg:flex items-center justify-center">
                <div className="w-[235px] h-[67px] z-50">
                    <Image src='/logo.svg' alt="Nova Protocol logo" width={235} height={67} className="block dark:hidden" priority />
                    <Image src='/logo-light.png' alt="Nova Protocol logo" width={235} height={67} className="hidden dark:block" priority />
                </div>
            </div>
        </div>)
    );
}
