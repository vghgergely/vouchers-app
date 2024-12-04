import { type } from "os";
import { Voucher } from "../types";
import VoucherCard from "./VoucherCard";


interface VoucherGroupProps {
    vouchers: Voucher[];
    type: 'redeemable' | 'expired' | 'redeemed';
    selectedVouchers?: Set<number>;
    onSelectVoucher?: (id: number) => void;
  }

function VoucherGroup ({ vouchers, type, onSelectVoucher, selectedVouchers }: VoucherGroupProps) {
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
    <div className="pt-3 dark flex flex-row flex-wrap">
      {vouchers.map((voucher) => (
        <VoucherCard
          key={voucher.id}
          className={`py-10 bg-slate-300 flex-grow-0 ${getClassName()}`}
          voucher={voucher}
          onClick={() => onSelectVoucher && onSelectVoucher(voucher.id)}
          selected={selectedVouchers?.has(voucher.id)}
        />
      ))}
    </div>
  );
};

export default VoucherGroup;