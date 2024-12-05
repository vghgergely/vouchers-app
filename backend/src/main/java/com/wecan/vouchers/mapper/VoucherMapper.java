package com.wecan.vouchers.mapper;

import com.wecan.vouchers.dto.VoucherCreationResponse;
import com.wecan.vouchers.entity.Voucher;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class VoucherMapper {

    public VoucherCreationResponse toDto(Voucher voucher) {
        VoucherCreationResponse dto = new VoucherCreationResponse();
        dto.setId(voucher.getId());
        dto.setCode(voucher.getCode());
        dto.setExpiryDate(voucher.getExpiryDate());
        dto.setMaxRedemptionCount(voucher.getMaxRedemptionCount());
        dto.setRedemptionCount(voucher.getRedemptionCount());
        dto.setVoucherStatus(VoucherCreationResponse.VoucherStatus.valueOf(voucher.getVoucherStatus().name()));
        return dto;
    }

    public List<VoucherCreationResponse> toDtoList(List<Voucher> vouchers) {
        return vouchers.stream().map(this::toDto).collect(Collectors.toList());
    }
}