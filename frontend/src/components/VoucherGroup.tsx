import { type } from "os";
import { Voucher } from "../types";
import VoucherCard from "./VoucherCard";


interface VoucherGroupProps {
    vouchers: Voucher[];
    type: 'redeemable' | 'expired' | 'redeemed';
    selectedVouchers?: { [voucherId: number]: number };
  }

function VoucherGroup ({ vouchers, type, selectedVouchers }: VoucherGroupProps) {
  const getClassName = () => {
    switch (type) {
      case 'redeemable':
        return 'hover:border-blue-500 hover:bg-blue-100 cursor-pointer';
      case 'expired':
      case 'redeemed':
        return 'bg-gray-300 text-gray-500 cursor-not-allowed';
      default:
        return '';
    }
  };

  return (
    <div className="p-3 dark flex flex-row flex-wrap bg-gray-300 rounded-md justify-center">
      {vouchers.map((voucher) => {
        const voucherWithRedemptionsLeft = {
          ...voucher,
          redemptionsLeft: voucher.maxRedemptionCount - voucher.redemptionCount,
        };
        return (
        <VoucherCard
          key={voucher.id}
          className={`py-10 bg-slate-300 flex-grow-0 ${getClassName()}`}
          voucher={voucherWithRedemptionsLeft}
          selected={!!selectedVouchers?.[voucher.id]}
        />
      );
      })}
    </div>
  );
};

export default VoucherGroup;