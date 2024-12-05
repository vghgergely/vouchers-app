import { VoucherCreationRequest } from "../types";

interface VoucherListProps {
    vouchers: VoucherCreationRequest[];
    onRemoveVoucher: (code: string) => void;
}

function VoucherList({ vouchers, onRemoveVoucher }: VoucherListProps) {
    return (
        <ul>
          {vouchers.map(voucher => (
            <li key={voucher.code} className="flex justify-between items-center mb-2">
              <span>{voucher.code} - Expires: {voucher.expiryDate} - Max Redemptions: {voucher.maxRedemptionCount}</span>
              <button
                onClick={() => onRemoveVoucher(voucher.code)}
                className="ml-4 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      );
}

export default VoucherList;