package com.wecan.vouchers.dto;

public class VoucherRedemptionRequest {
    String voucherCode;
    Integer amount;

    public String getVoucherCode() {
        return voucherCode;
    }

    public Integer getAmount() {
        return amount;
    }
}
