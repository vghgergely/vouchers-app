package com.wecan.vouchers.controller;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wecan.vouchers.dto.ApiRequestUserRole;
import com.wecan.vouchers.dto.VoucherBatchCreationRequest;
import com.wecan.vouchers.entity.Voucher;
import com.wecan.vouchers.exceptions.UnauthorizedException;
import com.wecan.vouchers.service.VoucherService;

@RestController
@RequestMapping("/api/vouchers")
public class VoucherManagementController {

    @Autowired
    private VoucherService voucherService;

    @PostMapping("/create")
    public ResponseEntity<List<Voucher>> createVouchers(@RequestBody VoucherBatchCreationRequest request) {
        // Basic placeholder implmentation to avoid implementing a full authorization system
        if (request.getUserRole() == null) {
            throw new IllegalArgumentException("User role is required");
        }
        if (request.getUserRole() != ApiRequestUserRole.OPERATOR) {
            throw new UnauthorizedException("Client role is not authorized to create vouchers");
        }
        List<Voucher> createdVouchers = Arrays.stream(request.getVoucherCreationRequests())
            .map(voucherCreationRequest -> {
                if (voucherCreationRequest == null) {
                    throw new IllegalArgumentException("Request cannot be empty");
                }
                if (voucherCreationRequest.getCode() == null || voucherCreationRequest.getCode().isEmpty()) {
                    throw new IllegalArgumentException("Voucher code is required");
                }
                if (voucherCreationRequest.getExpiryDate() != null && voucherCreationRequest.getExpiryDate().getTime() < System.currentTimeMillis()) {
                    throw new IllegalArgumentException("Expiry date has to be in the future for voucher code: " + voucherCreationRequest.getCode());
                }
                if (voucherCreationRequest.getMaxRedemptionCount() < 1) {
                    throw new IllegalArgumentException("Max redemption count has to be more than 0 for voucher code: " + voucherCreationRequest.getCode());
                }
                return voucherService.createVoucher(voucherCreationRequest.toEntity());
            })
            .collect(Collectors.toList());
            
        
        return ResponseEntity.status(HttpStatus.CREATED).body(createdVouchers);
    }

    @GetMapping()
    public List<Voucher> getAllVouchers() {
        return voucherService.getAllVouchers();
    }
}