import { Voucher } from "../types";
import VoucherGroup from "./VoucherGroup";

interface RedeemableVoucherGroupProps {
    vouchers: Voucher[];
    selectedVouchers: { [voucherId: number]: number };
  }

function RedeemableVoucherGroup({vouchers, selectedVouchers}: RedeemableVoucherGroupProps) {
    return (
        <VoucherGroup vouchers={vouchers} selectedVouchers={selectedVouchers} type={"redeemable"} />
    )
}

export default RedeemableVoucherGroup;