import { VoucherCreationRequest } from "../types";

interface VoucherListProps {
    vouchers: VoucherCreationRequest[];
}

function VoucherList({ vouchers }: VoucherListProps) {
    return (
        <ul className="list-disc pl-5">
            {vouchers.map((voucher, index) => (
                <li key={index}>
                    {voucher.code} - Expires on {voucher.expiryDate.split("T")} - Max Redemptions: {voucher.maxRedemptionCount}
                </li>
            ))}
        </ul>
    );
}

export default VoucherList;