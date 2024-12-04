interface Voucher {
    id: number;
    code: string;
    expiryDate: string;
    redemptionCount: number;
    redeemable: boolean;
    expired: boolean;
  }
  
  interface VoucherCardProps {
    voucher: Voucher;
    className: string;
    onClick?: () => void;
    selected?: boolean;
  }

function VoucherCard({ voucher, className, onClick, selected}: VoucherCardProps) {
  return (
    <div className={`${className} - w-64 p-4 m-2 bg-white rounded-lg shadow-md ${selected ? 'border-2 border-red-500' : ''}`} onClick={onClick}>
        <div className="font-bold text-lg">{voucher.code}</div>
        <div>{voucher.redeemable ? "Not Redeemed" : "Redeemed"}</div>
        <div>{voucher.expiryDate}</div>
        <div>{voucher.redemptionCount}</div>
        <div>{voucher.expired ? "Expired" : "Not Expired"}</div>
    </div>
  );
}

export default VoucherCard;