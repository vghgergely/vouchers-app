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
@RequestMapping("/api/vouchers/redemption")
public class VoucherRedemptionController {

    @Autowired
    private VoucherService voucherService;

    @PostMapping("/{code}/redeem")
    public ResponseEntity<Voucher> redeemVoucher(@PathVariable String code) {
        Voucher redeemedVoucher = voucherService.redeemVoucher(code);
        return ResponseEntity.ok().body(redeemedVoucher);
    }
}

