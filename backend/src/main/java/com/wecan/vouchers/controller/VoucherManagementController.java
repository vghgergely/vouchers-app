package com.wecan.vouchers.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wecan.vouchers.dto.VoucherCreationRequest;
import com.wecan.vouchers.entity.Voucher;
import com.wecan.vouchers.service.VoucherService;

@RestController
@RequestMapping("/api/vouchers")
public class VoucherManagementController {

    @Autowired
    private VoucherService voucherService;

    @PostMapping("/create")
    public ResponseEntity<Object> createVoucher(@RequestBody VoucherCreationRequest request) {
        if (request == null) {
            return ResponseEntity.badRequest().body("Request body is required");
        }
        if (request.getExpiryDate() != null && request.getExpiryDate().getTime() < System.currentTimeMillis()) {
            return ResponseEntity.badRequest().body("Expiry date has to be in the future");
        }
        if (request.getMaxRedemptionCount() < 1) {
            return ResponseEntity.badRequest().body("Max redemption count has to be more than 0");
        }
        try {
            Voucher createdVoucher = voucherService.createVoucher(request.toEntity());
            return ResponseEntity.created(null).body(createdVoucher);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}