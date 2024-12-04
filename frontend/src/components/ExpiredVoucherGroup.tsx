import { Voucher } from "../types";
import VoucherGroup from "./VoucherGroup";

interface ExpiredVoucherGroupProps {
    vouchers: Voucher[];
  }

function ExpiredVoucherGroup({vouchers}: ExpiredVoucherGroupProps) {
    return (
        <VoucherGroup vouchers={vouchers} type={"expired"}/>
    )
}

export default ExpiredVoucherGroup;