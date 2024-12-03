package com.wecan.vouchers.exceptions;

public class VoucherExpiredException extends VoucherException {
    public VoucherExpiredException(String code) {
        super(code);
    }
}
