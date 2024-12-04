package com.wecan.vouchers.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wecan.vouchers.dto.VoucherCreationRequest;
import com.wecan.vouchers.dto.VoucherRedemptionRequest;
import com.wecan.vouchers.entity.Voucher;
import com.wecan.vouchers.entity.Voucher.VoucherStatus;
import com.wecan.vouchers.exceptions.VoucherAlreadyExistsException;
import com.wecan.vouchers.exceptions.VoucherAlreadyRedeemedException;
import com.wecan.vouchers.exceptions.VoucherException;
import com.wecan.vouchers.exceptions.VoucherExpiredException;
import com.wecan.vouchers.exceptions.VoucherNotFoundException;
import com.wecan.vouchers.repository.VoucherRepository;

import jakarta.transaction.Transactional;

@Service
public class VoucherService {
    @Autowired
    private VoucherRepository voucherRepository;

    @Transactional
    public List<Voucher> createVouchers(List<VoucherCreationRequest> requests) {
        Set<String> voucherCodes = requests.stream()
                .map(VoucherCreationRequest::getCode)
                .collect(Collectors.toSet());

        List<Voucher> existingVouchers = voucherRepository.findByCodeIn(voucherCodes);
        if (!existingVouchers.isEmpty()) {
            String existingCodes = existingVouchers.stream()
                    .map(Voucher::getCode)
                    .collect(Collectors.joining(", "));
            throw new VoucherAlreadyExistsException("Vouchers with the following codes already exist: " + existingCodes);
        }

        List<Voucher> vouchers = requests.stream().map(VoucherCreationRequest::toEntity).collect(Collectors.toList());
        return voucherRepository.saveAll(vouchers);
    }

    public Voucher createVoucher(VoucherCreationRequest voucherCreationRequest) {
        if (voucherRepository.existsByCode(voucherCreationRequest.getCode())) {
            throw new VoucherAlreadyExistsException(voucherCreationRequest.getCode());
        }
        
        Voucher voucher = voucherCreationRequest.toEntity();
        return voucherRepository.save(voucher);
    }


    public Optional<Voucher> getVoucher(String code) {
        return voucherRepository.findByCode(code);
    }

    @Transactional
    public List<Voucher> redeemVouchers(List<VoucherRedemptionRequest> voucherRedemptionRequests) throws VoucherException {
        List<Voucher> redeemedVouchers = new ArrayList<>();
        for (VoucherRedemptionRequest request : voucherRedemptionRequests) {
            Voucher redeemedVoucher = redeemVoucher(request.getVoucherCode(), request.getAmount());
            redeemedVouchers.add(redeemedVoucher);
        }
        return redeemedVouchers;
    }

    public Voucher redeemVoucher(String voucherCode, int amount) {
        Optional<Voucher> voucherOpt = voucherRepository.findByCode(voucherCode);
        if (voucherOpt.isEmpty()) {
            throw new VoucherNotFoundException(voucherCode);
        }
        Voucher voucher = voucherOpt.get();
        if (voucher.isExpired()) {
            throw new VoucherExpiredException(voucherCode);
        }
        if (!voucher.isRedeemable()) {
            throw new VoucherAlreadyRedeemedException(voucherCode);
        }
        voucher.setRedemptionCount(voucher.getRedemptionCount() + amount);
        if (voucher.getRedemptionCount() >= voucher.getMaxRedemptionCount()) {
            voucher.setVoucherStatus(VoucherStatus.REDEEMED);
        }
        Voucher redeemedVoucher = voucherRepository.save(voucher); 
        return redeemedVoucher;
    }

    public List<Voucher> getAllVouchers() {
        return voucherRepository.findAll();
    }
}
