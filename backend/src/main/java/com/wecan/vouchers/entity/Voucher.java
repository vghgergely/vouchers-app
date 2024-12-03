package com.wecan.vouchers.entity;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

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
    
    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable=true)
    private Date expiryDate;

    
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

    public Date getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(Date expiryDate) {
        this.expiryDate = expiryDate;
    }

    public boolean isExpired() {
        return this.expiryDate.before(new Date(System.currentTimeMillis()));
    }

    public boolean isRedeemable() {
        return this.voucherStatus == VoucherStatus.ACTIVE && !isExpired();
    }}
