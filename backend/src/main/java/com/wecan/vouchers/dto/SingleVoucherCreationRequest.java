package com.wecan.vouchers.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

public class SingleVoucherCreationRequest {
    @NotNull
    ApiRequestUserRole userRole;

    @NotNull
    @Valid
    VoucherCreationRequest voucherCreationRequest;

    public ApiRequestUserRole getUserRole() {
        return userRole;
    }

    public VoucherCreationRequest getVoucherCreationRequest() {
        return voucherCreationRequest;
    }

    public void setUserRole(ApiRequestUserRole userRole) {
        this.userRole = userRole;
    }

    public void setVoucherCreationRequest(VoucherCreationRequest voucherCreationRequest) {
        this.voucherCreationRequest = voucherCreationRequest;
    }
}
