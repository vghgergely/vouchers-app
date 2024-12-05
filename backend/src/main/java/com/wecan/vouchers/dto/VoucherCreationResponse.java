package com.wecan.vouchers.dto;

import java.time.LocalDate;

public class VoucherCreationResponse {
    private Long id;

    private String code;
    
    private int redemptionCount;
    private int maxRedemptionCount;
    
    private VoucherStatus voucherStatus;
    
    private LocalDate expiryDate;

    public enum VoucherStatus {
        ACTIVE,
        REDEEMED,
        EXPIRED
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getMaxRedemptionCount() {
        return this.maxRedemptionCount;
    }

    public void setMaxRedemptionCount(int maxRedemptionCount) {
        this.maxRedemptionCount = maxRedemptionCount;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public int getRedemptionCount() {
        return redemptionCount;
    }

    public void setRedemptionCount(int redemptionCount) {
        this.redemptionCount = redemptionCount;
    }

    public VoucherStatus getVoucherStatus() {
        return voucherStatus;
    }

    public void setVoucherStatus(VoucherStatus redemptionStatus) {
        this.voucherStatus = redemptionStatus;
    }

    public LocalDate getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(LocalDate expiryDate) {
        this.expiryDate = expiryDate;
    }

    public boolean isExpired() {
        return this.expiryDate.isBefore(LocalDate.now());
    }

    public boolean isRedeemable() {
        return this.voucherStatus == VoucherStatus.ACTIVE;
    }

    public VoucherCreationResponse(Long id, String code, int redemptionCount, int maxRedemptionCount, VoucherStatus voucherStatus, LocalDate expiryDate) {
        this.id = id;
        this.code = code;
        this.redemptionCount = redemptionCount;
        this.maxRedemptionCount = maxRedemptionCount;
        this.voucherStatus = voucherStatus;
        this.expiryDate = expiryDate;
    }

    public VoucherCreationResponse() {
    }
}
