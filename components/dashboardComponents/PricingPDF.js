'use client';

import { useCountry } from "@/hooks/useCountry";

const PricingPDF = () => {
    const { countryCode, loading, error } = useCountry();

    if (loading) return <p className="text-center p-4 text-black">Loading pricing document...</p>;
    if (error) return <p className="text-center p-4 text-black">Unable to load pricing document</p>;

    const pdfUrl = 'https://res.cloudinary.com/dux79mjbb/image/upload/v1766237656/nova-pricelist_lkk79h_1__compressed_bu79vk.pdf';

    return (
        <embed
            src={pdfUrl + "#toolbar=0&navpanes=0&scrollbar=0"}
            type="application/pdf"
            className="w-full h-full"
        />
    )
}

export default PricingPDF