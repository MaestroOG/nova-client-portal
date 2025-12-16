import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getInvoiceDetails } from "@/lib/invoice"
import parse from "html-react-parser";
import { formatDateToYMD } from "@/utils/formUtils";
import InvoiceDeleteForm from "@/components/invoice-delete-form";
import InvoiceEditForm from "@/components/invoice-edit-form";
import { notFound } from "next/navigation";

const InvoiceDetail = async ({ params }) => {
    const { id } = await params

    const invoice = await getInvoiceDetails(id);

    if (!invoice) {
        notFound();
    }

    return (
        <div className="p-4">
            <Card className="rounded-2xl shadow-md">
                <CardHeader className={'flex items-center justify-between'}>
                    <CardTitle className="text-xl font-bold">INV-{id.slice(0, 6)}...</CardTitle>
                    <div className="flex items-center gap-2">
                        <InvoiceDeleteForm invoiceId={id} />
                        <InvoiceEditForm invoice={invoice} />
                    </div>
                </CardHeader>
                <CardContent className="space-y-2">
                    <p className="text-black dark:text-white">Partner: {invoice?.partner?.name}</p>
                    <p className="text-black dark:text-white">Date: {formatDateToYMD(invoice?.updatedAt)}</p>
                    <p className="text-black dark:text-white">Status: {invoice?.status}</p>

                    <div className="mt-4">
                        <p className="**:text-black **:dark:text-white">{parse(invoice?.detail)}</p>
                    </div>
                </CardContent>
            </Card>

            <div className="mt-4">
                <Button asChild variant="secondary">
                    <Link href="/invoices">← Back to Invoices</Link>
                </Button>
            </div>
        </div>
    )
}

export default InvoiceDetail