package com.wecan.vouchers.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wecan.vouchers.dto.ApiRequestUserRole;
import com.wecan.vouchers.dto.BulkVoucherCreationRequest;
import com.wecan.vouchers.dto.SingleVoucherCreationRequest;
import com.wecan.vouchers.entity.Voucher;
import com.wecan.vouchers.exceptions.UnauthorizedException;
import com.wecan.vouchers.service.VoucherService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/vouchers")
public class VoucherManagementController {

    @Autowired
    private VoucherService voucherService;

    @PostMapping("/create/bulk")
    public ResponseEntity<List<Voucher>> createVouchers(@Valid @RequestBody BulkVoucherCreationRequest request) {
        // Basic placeholder impleementation to avoid implementing a full authorization system
        if (request.getUserRole() != ApiRequestUserRole.OPERATOR) {
            throw new UnauthorizedException("Client role is not authorized to create vouchers");
        }

        List<Voucher> createdVouchers = voucherService.createVouchers(request.getVoucherCreationRequests()); 
        return ResponseEntity.status(HttpStatus.CREATED).body(createdVouchers);
    }

    @PostMapping("/create")
    public ResponseEntity<Voucher> createVoucher(@Valid @RequestBody SingleVoucherCreationRequest request) {
        // Basic placeholder impleementation to avoid implementing a full authorization system
        if (request.getUserRole() != ApiRequestUserRole.OPERATOR) {
            throw new UnauthorizedException("Client role is not authorized to create voucher");
        }

        Voucher createdVoucher = voucherService.createVoucher(request.getVoucherCreationRequest()); 
        return ResponseEntity.status(HttpStatus.CREATED).body(createdVoucher);
    }

    @GetMapping()
    public List<Voucher> getAllVouchers() {
        return voucherService.getAllVouchers();
    }
}