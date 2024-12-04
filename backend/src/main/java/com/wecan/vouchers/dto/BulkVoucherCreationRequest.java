package com.wecan.vouchers.dto;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

public class BulkVoucherCreationRequest {
    @Valid
    @NotNull
    List<VoucherCreationRequest> voucherCreationRequests;

    @NotNull
    ApiRequestUserRole userRole;

    public List<VoucherCreationRequest> getVoucherCreationRequests() {
        return voucherCreationRequests;
    }

    public ApiRequestUserRole getUserRole() {
        return userRole;
    }
}