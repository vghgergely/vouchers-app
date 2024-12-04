import { Voucher } from "../types";
import VoucherGroup from "./VoucherGroup";

interface RedeemedVoucherGroupProps {
    vouchers: Voucher[];
  }

function RedeemedVoucherGroup({vouchers}: RedeemedVoucherGroupProps) {
    return (
        <VoucherGroup vouchers={vouchers} type={"redeemed"} />
    )
}

export default RedeemedVoucherGroup;