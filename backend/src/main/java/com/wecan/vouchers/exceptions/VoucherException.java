package com.wecan.vouchers.exceptions;

public class VoucherException extends RuntimeException {
    private final String voucherCode;
    public VoucherException(String code) {
        super(code);
        this.voucherCode = code;
    }

    public String getVoucherCode() {
        return voucherCode;
    }
}
