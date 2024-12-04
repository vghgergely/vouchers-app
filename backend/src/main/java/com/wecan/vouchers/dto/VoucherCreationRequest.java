package com.wecan.vouchers.dto;

import java.util.Date;

import com.wecan.vouchers.entity.Voucher;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class VoucherCreationRequest {
    @NotBlank
    private String code;

    @Min(1)
    private int maxRedemptionCount;

    @Future
    @NotNull
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
