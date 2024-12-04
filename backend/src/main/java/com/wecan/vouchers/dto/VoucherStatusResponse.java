package com.wecan.vouchers.dto;

import com.wecan.vouchers.entity.Voucher.VoucherStatus;

public class VoucherStatusResponse {
    private String code;
    private VoucherStatus redemptionStatus;
    private String expiryStatus;
    private int remainingRedemptions;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getExpiryStatus() {
        return this.expiryStatus;
    }

    public void setExpiryStatus(String expiryStatus) {
        this.expiryStatus = expiryStatus;
    }

    public int getRemainingRedemptions() {
        return remainingRedemptions;
    }

    public void setRemainingRedemptions(int remainingRedemptions) {
        this.remainingRedemptions = remainingRedemptions;
    }

    public VoucherStatus getRedemptionStatus() {
        return redemptionStatus;
    }

    public void setRedemptionStatus(VoucherStatus redemptionStatus) {
        this.redemptionStatus = redemptionStatus;
    }
}
