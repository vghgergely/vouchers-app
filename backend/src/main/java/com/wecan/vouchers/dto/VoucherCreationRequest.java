package com.wecan.vouchers.dto;

import java.util.Date;

import com.wecan.vouchers.entity.Voucher;

public class VoucherCreationRequest {
    private String code;
    private int maxRedemptionCount;
    private Date expiryDate;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Date getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(Date expiryDate) {
        this.expiryDate = expiryDate;
    }

    public int getMaxRedemptionCount() {
        return maxRedemptionCount;
    }

    public void setMaxRedemptionCount(int maxRedemptions) {
        this.maxRedemptionCount = maxRedemptions;
    }

    public Voucher toEntity() {

        Voucher voucher = new Voucher();
        voucher.setCode(this.code);
        voucher.setRedemptionCount(0);
        voucher.setMaxRedemptionCount(maxRedemptionCount);
        voucher.setExpiryDate(this.expiryDate);
        voucher.setVoucherStatus(Voucher.VoucherStatus.ACTIVE);

        return voucher;

    }
}
