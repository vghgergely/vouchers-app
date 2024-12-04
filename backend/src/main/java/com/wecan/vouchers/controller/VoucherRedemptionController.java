package com.wecan.vouchers.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wecan.vouchers.dto.ApiRequestUserRole;
import com.wecan.vouchers.dto.BulkVoucherRedemptionRequest;
import com.wecan.vouchers.dto.SingleVoucherRedemptionRequest;
import com.wecan.vouchers.entity.Voucher;
import com.wecan.vouchers.exceptions.UnauthorizedException;
import com.wecan.vouchers.service.VoucherService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/vouchers")
public class VoucherRedemptionController {

    @Autowired
    private VoucherService voucherService;

    @PostMapping("/redeem/bulk")
    public ResponseEntity<List<Voucher>> redeemVouchers(@Valid @RequestBody BulkVoucherRedemptionRequest request) {
        // Basic placeholder implementation to avoid implementing a full authorization system
        if (request.getUserRole() == ApiRequestUserRole.OPERATOR) {
            throw new UnauthorizedException("Operator role is not authorized to redeem vouchers");
        }

        List<Voucher> redeemedVouchers = voucherService.redeemVouchers(request.getVoucherRedemptionRequests());
        return ResponseEntity.ok().body(redeemedVouchers);
    }

    @PostMapping("/redeem")
    public ResponseEntity<Voucher> redeemVoucher(@Valid @RequestBody SingleVoucherRedemptionRequest request) {
        // Basic placeholder implementation to avoid implementing a full authorization system
        if (request.getUserRole() == ApiRequestUserRole.OPERATOR) {
            throw new UnauthorizedException("Operator role is not authorized to redeem vouchers");
        }

        Voucher redeemedVoucher = voucherService.redeemVoucher(request.getVoucherRedemption().getVoucherCode(), request.getVoucherRedemption().getAmount());
        return ResponseEntity.ok().body(redeemedVoucher);
    }
}

