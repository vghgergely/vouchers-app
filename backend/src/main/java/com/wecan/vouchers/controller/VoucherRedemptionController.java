package com.wecan.vouchers.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wecan.vouchers.exceptions.VoucherException;
import com.wecan.vouchers.service.VoucherService;

@RestController
@RequestMapping("/api/vouchers/redemption")
public class VoucherRedemptionController {

    @Autowired
    private VoucherService voucherService;

    @PostMapping("/{code}/redeem")
    public ResponseEntity<String> redeemVoucher(@PathVariable String code) {
        try {
            voucherService.redeemVoucher(code);
            return ResponseEntity.ok().body("hello");
        } catch (VoucherException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Other methods...
}

