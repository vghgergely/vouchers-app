package com.wecan.vouchers.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wecan.vouchers.entity.Voucher;
import com.wecan.vouchers.service.VoucherService;

@RestController
@RequestMapping("/api/vouchers")
public class VoucherRedemptionController {

    @Autowired
    private VoucherService voucherService;

    @PostMapping("/redeem")
    public ResponseEntity<Voucher[]> redeemVouchers(String[] codes) {
        // Voucher redeemedVoucher = voucherService.redeemVoucher(code);
        // return ResponseEntity.ok().body(redeemedVoucher);

        
        return ResponseEntity.ok().body(null);
    }
}

