package com.wecan.vouchers.exceptions;

public class VoucherAlreadyRedeemedException extends VoucherException {
    public VoucherAlreadyRedeemedException(String message) {
        super(message);
    }
}
