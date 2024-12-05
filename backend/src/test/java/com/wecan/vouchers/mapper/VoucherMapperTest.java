package com.wecan.vouchers.mapper;

import com.wecan.vouchers.dto.VoucherCreationResponse;
import com.wecan.vouchers.entity.Voucher;
import com.wecan.vouchers.entity.Voucher.VoucherStatus;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

public class VoucherMapperTest {

    private final VoucherMapper voucherMapper = new VoucherMapper();

    @Test
    public void toDto_ShouldMapEntityToDto() {
        Voucher voucher = new Voucher(1L, "CODE1", "2025-12-31", 10, 0);
        voucher.setVoucherStatus(VoucherStatus.ACTIVE);

        VoucherCreationResponse dto = voucherMapper.toDto(voucher);

        assertNotNull(dto);
        assertEquals(voucher.getId(), dto.getId());
        assertEquals(voucher.getCode(), dto.getCode());
        assertEquals(voucher.getExpiryDate(), dto.getExpiryDate());
        assertEquals(voucher.getMaxRedemptionCount(), dto.getMaxRedemptionCount());
        assertEquals(voucher.getRedemptionCount(), dto.getRedemptionCount());
        assertEquals(voucher.getVoucherStatus().name(), dto.getVoucherStatus().name());
    }

    @Test
    public void toDtoList_ShouldMapEntityListToDtoList() {
        Voucher voucher1 = new Voucher(1L, "CODE1", "2025-12-31", 10, 0);
        voucher1.setVoucherStatus(VoucherStatus.ACTIVE);
        Voucher voucher2 = new Voucher(2L, "CODE2", "2025-12-31", 5, 0);
        voucher2.setVoucherStatus(VoucherStatus.ACTIVE);

        List<Voucher> vouchers = Arrays.asList(voucher1, voucher2);
        List<VoucherCreationResponse> dtoList = voucherMapper.toDtoList(vouchers);

        assertNotNull(dtoList);
        assertEquals(2, dtoList.size());

        VoucherCreationResponse dto1 = dtoList.get(0);
        assertEquals(voucher1.getId(), dto1.getId());
        assertEquals(voucher1.getCode(), dto1.getCode());
        assertEquals(voucher1.getExpiryDate(), dto1.getExpiryDate());
        assertEquals(voucher1.getMaxRedemptionCount(), dto1.getMaxRedemptionCount());
        assertEquals(voucher1.getRedemptionCount(), dto1.getRedemptionCount());
        assertEquals(voucher1.getVoucherStatus().name(), dto1.getVoucherStatus().name());

        VoucherCreationResponse dto2 = dtoList.get(1);
        assertEquals(voucher2.getId(), dto2.getId());
        assertEquals(voucher2.getCode(), dto2.getCode());
        assertEquals(voucher2.getExpiryDate(), dto2.getExpiryDate());
        assertEquals(voucher2.getMaxRedemptionCount(), dto2.getMaxRedemptionCount());
        assertEquals(voucher2.getRedemptionCount(), dto2.getRedemptionCount());
        assertEquals(voucher2.getVoucherStatus().name(), dto2.getVoucherStatus().name());
    }
}