import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";

const WhatsappButton = () => {
    const phoneNumber = '14709248045';
    const whatsappUrl = `https://wa.me/${phoneNumber}`;

    return (
        <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="fixed bottom-5 right-5 z-50">
            <Image src={'/whatsapp.svg'} height={56} width={56} />
        </Link>
    )
}

export default WhatsappButton