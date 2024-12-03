package com.wecan.vouchers.exceptions;

public class VoucherNotFoundException extends VoucherException {
    public VoucherNotFoundException(String code) {
        super(code);
    }
}