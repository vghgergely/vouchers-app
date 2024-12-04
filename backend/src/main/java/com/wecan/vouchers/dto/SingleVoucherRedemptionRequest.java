package com.wecan.vouchers.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

public class SingleVoucherRedemptionRequest {
    @NotNull
    ApiRequestUserRole userRole;

    @NotNull
    @Valid
    VoucherRedemptionRequest voucherRedemption;

    public ApiRequestUserRole getUserRole() {
        return userRole;
    }

    public VoucherRedemptionRequest getVoucherRedemption() {
        return voucherRedemption;
    }
}
