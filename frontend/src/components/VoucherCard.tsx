import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setRedemptionCount, toggleSelectVoucher } from "../store/voucherSelectionSlice";

interface Voucher {
    id: number;
    code: string;
    expiryDate: string;
    redemptionsLeft: number;
    redeemable: boolean;
    expired: boolean;
  }
  
  interface VoucherCardProps {
    voucher: Voucher;
    className: string;
    selected?: boolean;
  }

function VoucherCard({ voucher, className, selected}: VoucherCardProps) {
  const dispatch = useDispatch();
  const redemptionCount = useSelector((state: RootState) => state.voucherSelection.selectedVouchers[voucher.id] || 1);

  const handleCardClick = () => {
    dispatch(toggleSelectVoucher(voucher.id));
  }

  return (
    <div className={`${className} - w-64 min-h-52 p-4 m-2 bg-white rounded-lg shadow-md ${selected ? 'border-2 border-blue-500 bg-blue-50' : ''}`} onClick={handleCardClick}>
        <div className="font-bold text-lg truncate">{voucher.code}</div>
        {voucher.redemptionsLeft != 0 && <div>{voucher.expired ? 'Expired' : 'Expires'} at: {voucher.expiryDate.split("T")[0]}</div>}
        {voucher.redeemable && (
          <div>
            Redemptions left: {voucher.redemptionsLeft}
            {selected && voucher.redemptionsLeft > 1 && (
            <div className="flex relative items-center justify-center mt-2">
              {redemptionCount > 1 && (
              <button
                className="absolute left-1/4 px-2 py-1 bg-gray-200 rounded-l"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(setRedemptionCount({voucherId: voucher.id, count: Math.max(1, redemptionCount - 1)}));
                }}
              >
                -
              </button>
              )}
              <div className="px-4 py-1 bg-gray-100">{redemptionCount}</div>
              {redemptionCount < voucher.redemptionsLeft && (
              <button
                className="absolute right-1/4 px-2 py-1 bg-gray-200 rounded-r"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(setRedemptionCount({voucherId: voucher.id, count: Math.min(voucher.redemptionsLeft, redemptionCount + 1)}));
                }}
              >
                +
              </button>
              )}
            </div>
          )}
          </div>
        )}
    </div>
  );
}

export default VoucherCard;