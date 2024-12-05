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

    public void setVoucherCreationRequests(List<VoucherCreationRequest> voucherCreationRequests) {
        this.voucherCreationRequests = voucherCreationRequests;
    }

    public void setUserRole(ApiRequestUserRole userRole) {
        this.userRole = userRole;
    }
}