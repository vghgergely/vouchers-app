package com.wecan.vouchers.dto;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

public class BulkVoucherRedemptionRequest {
    @NotNull
    @Valid
    List<VoucherRedemptionRequest> voucherRedemptionRequests;

    @NotNull
    ApiRequestUserRole userRole;

    public List<VoucherRedemptionRequest> getVoucherRedemptionRequests() {
        return voucherRedemptionRequests;
    }

    public ApiRequestUserRole getUserRole() {
        return userRole;
    }
}
