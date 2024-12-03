package com.wecan.vouchers.exceptions;

public class VoucherAlreadyExistsException extends VoucherException {
    public VoucherAlreadyExistsException(String code) {
        super(code);
    }
}
