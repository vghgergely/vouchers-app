package com.wecan.vouchers.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public class VoucherRedemptionRequest {
    @NotBlank
    String voucherCode;

    @Min(1)
    int amount;

    public String getVoucherCode() {
        return voucherCode;
    }

    public int getAmount() {
        return amount;
    }
}
