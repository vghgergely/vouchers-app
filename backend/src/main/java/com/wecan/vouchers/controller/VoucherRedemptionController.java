package com.wecan.vouchers.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wecan.vouchers.dto.ApiRequestUserRole;
import com.wecan.vouchers.dto.VoucherBatchRedemptionRequest;
import com.wecan.vouchers.entity.Voucher;
import com.wecan.vouchers.exceptions.UnauthorizedException;
import com.wecan.vouchers.service.VoucherService;

@RestController
@RequestMapping("/api/vouchers")
public class VoucherRedemptionController {

    @Autowired
    private VoucherService voucherService;

    @PostMapping("/redeem")
    public ResponseEntity<Voucher[]> redeemVouchers(@RequestBody VoucherBatchRedemptionRequest request) {
        // Basic placeholder implmentation to avoid implementing a full authorization system
        if (request.getUserRole() == null) {
            throw new IllegalArgumentException("User role is required");
        }
        if (request.getUserRole() == ApiRequestUserRole.OPERATOR) {
            throw new UnauthorizedException("Operator role is not authorized to redeem vouchers");
        }
        // Voucher redeemedVoucher = voucherService.redeemVoucher(code);
        // return ResponseEntity.ok().body(redeemedVoucher);

        
        return ResponseEntity.ok().body(null);
    }
}

