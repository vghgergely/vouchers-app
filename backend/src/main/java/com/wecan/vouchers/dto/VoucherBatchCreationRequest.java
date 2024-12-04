package com.wecan.vouchers.dto;

public class VoucherBatchCreationRequest {
    VoucherCreationRequest[] voucherCreationRequests;
    ApiRequestUserRole userRole;

    public VoucherCreationRequest[] getVoucherCreationRequests() {
        return voucherCreationRequests;
    }

    public ApiRequestUserRole getUserRole() {
        return userRole;
    }
}