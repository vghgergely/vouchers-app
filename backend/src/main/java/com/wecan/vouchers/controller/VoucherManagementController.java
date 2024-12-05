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
import com.wecan.vouchers.dto.VoucherCreationResponse;
import com.wecan.vouchers.entity.Voucher;
import com.wecan.vouchers.exceptions.UnauthorizedException;
import com.wecan.vouchers.mapper.VoucherMapper;
import com.wecan.vouchers.service.VoucherService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/vouchers")
public class VoucherManagementController {

    @Autowired
    private VoucherService voucherService;

    @Autowired
    private VoucherMapper voucherMapper;

    @PostMapping("/create/bulk")
    public ResponseEntity<List<VoucherCreationResponse>> createVouchers(@Valid @RequestBody BulkVoucherCreationRequest request) {
        // Basic placeholder implementation to avoid implementing a full authorization system
        if (request.getUserRole() != ApiRequestUserRole.OPERATOR) {
            throw new UnauthorizedException("Client role is not authorized to create vouchers");
        }

        List<Voucher> createdVouchers = voucherService.createVouchers(request.getVoucherCreationRequests()); 
        List<VoucherCreationResponse> response = voucherMapper.toDtoList(createdVouchers);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/create")
    public ResponseEntity<VoucherCreationResponse> createVoucher(@Valid @RequestBody SingleVoucherCreationRequest request) {
        // Basic placeholder implementation to avoid implementing a full authorization system
        if (request.getUserRole() != ApiRequestUserRole.OPERATOR) {
            throw new UnauthorizedException("Client role is not authorized to create voucher");
        }

        Voucher createdVoucher = voucherService.createVoucher(request.getVoucherCreationRequest()); 
        VoucherCreationResponse response = voucherMapper.toDto(createdVoucher);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping()
    public List<Voucher> getAllVouchers() {
        return voucherService.getAllVouchers();
    }
}