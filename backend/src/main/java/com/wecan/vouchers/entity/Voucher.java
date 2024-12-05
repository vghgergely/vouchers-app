package com.wecan.vouchers.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "vouchers")
public class Voucher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String code;
    
    private int redemptionCount;
    private int maxRedemptionCount;
    
    @Enumerated(EnumType.STRING)
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

    public Voucher(Long id, String code, String expiryDate, int maxRedemptionCount, int redemptionCount) {
        this.id = id;
        this.code = code;
        this.expiryDate = LocalDate.parse(expiryDate);
        this.maxRedemptionCount = maxRedemptionCount;
        this.redemptionCount = redemptionCount;
        this.voucherStatus = VoucherStatus.ACTIVE;
    }

    public Voucher(String code, String expiryDate, int maxRedemptionCount) {
        this.code = code;
        this.expiryDate = LocalDate.parse(expiryDate);
        this.maxRedemptionCount = maxRedemptionCount;
        this.redemptionCount = 0;
        this.voucherStatus = VoucherStatus.ACTIVE;
    }

    public Voucher() {
    }
}