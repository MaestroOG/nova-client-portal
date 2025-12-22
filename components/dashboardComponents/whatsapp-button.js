import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";

const WhatsappButton = () => {
    const phoneNumber = '14709248045';
    const whatsappUrl = `https://wa.me/${phoneNumber}`;

    return (
        <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="fixed bottom-5 right-5 z-50">
            <Button
                size="icon"
                className="h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg">
                <Image src={'/whatsapp.svg'} height={24} width={24} />
            </Button>
        </Link>
    )
}

export default WhatsappButton