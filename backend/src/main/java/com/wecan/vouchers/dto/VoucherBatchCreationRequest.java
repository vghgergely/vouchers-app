package com.wecan.vouchers.dto;

public class VoucherBatchCreationRequest {
    VoucherCreationRequest[] voucherCreationRequests;

    public VoucherCreationRequest[] getVoucherCreationRequests() {
        return voucherCreationRequests;
    }
}