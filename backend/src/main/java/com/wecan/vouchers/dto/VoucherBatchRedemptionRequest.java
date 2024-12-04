package com.wecan.vouchers.dto;

public class VoucherBatchRedemptionRequest {
    VoucherRedemptionRequest[] voucherRedemptionRequests;
    ApiRequestUserRole userRole;

    public VoucherRedemptionRequest[] getVoucherRedemptionRequests() {
        return voucherRedemptionRequests;
    }

    public ApiRequestUserRole getUserRole() {
        return userRole;
    }
}
