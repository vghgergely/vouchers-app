package com.wecan.vouchers.service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.transaction.annotation.Transactional;

import com.wecan.vouchers.dto.VoucherCreationRequest;
import com.wecan.vouchers.entity.Voucher;
import com.wecan.vouchers.entity.Voucher.VoucherStatus;
import com.wecan.vouchers.exceptions.VoucherAlreadyExistsException;
import com.wecan.vouchers.exceptions.VoucherAlreadyRedeemedException;
import com.wecan.vouchers.exceptions.VoucherExpiredException;
import com.wecan.vouchers.exceptions.VoucherNotFoundException;
import com.wecan.vouchers.repository.VoucherRepository;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@Transactional
@ActiveProfiles("test")
public class VoucherServiceTest {

    @Autowired
    private VoucherService voucherService;

    @MockitoBean
    private VoucherRepository voucherRepository;

    @Test
    public void createVouchers_ShouldReturnCreatedVouchers() {
        VoucherCreationRequest request = new VoucherCreationRequest("CODE1", "2025-12-31", 10);
        List<VoucherCreationRequest> requests = Arrays.asList(request);

        Voucher voucher = new Voucher(1L, "CODE1", "2025-12-31", 10, 0);
        Mockito.when(voucherRepository.findByCodeIn(any())).thenReturn(Arrays.asList());
        Mockito.when(voucherRepository.saveAll(any())).thenReturn(Arrays.asList(voucher));

        List<Voucher> createdVouchers = voucherService.createVouchers(requests);
        assertEquals(1, createdVouchers.size());
        assertEquals("CODE1", createdVouchers.get(0).getCode());
    }

    @Test
    public void createVouchers_ShouldThrowVoucherAlreadyExistsException() {
        VoucherCreationRequest request = new VoucherCreationRequest("CODE1", "2025-12-31", 10);
        List<VoucherCreationRequest> requests = Arrays.asList(request);

        Voucher existingVoucher = new Voucher(1L, "CODE1", "2025-12-31", 10, 0);
        Mockito.when(voucherRepository.findByCodeIn(any())).thenReturn(Arrays.asList(existingVoucher));

        VoucherAlreadyExistsException exception = assertThrows(VoucherAlreadyExistsException.class, () -> {
            voucherService.createVouchers(requests);
        });
        assertNotNull(exception);
    }

    @Test
    public void redeemVoucher_ShouldReturnRedeemedVoucher() {
        Voucher voucher = new Voucher(1L, "CODE1", "2025-12-31", 1, 0);
        Mockito.when(voucherRepository.findByCode(anyString())).thenReturn(Optional.of(voucher));
        
        Mockito.when(voucherRepository.save(any())).thenReturn(voucher);

        Voucher redeemedVoucher = voucherService.redeemVoucher("CODE1", 1);
        assertEquals(1, redeemedVoucher.getRedemptionCount());
    }

    @Test
    public void redeemVoucher_ShouldThrowVoucherNotFoundException() {
        Mockito.when(voucherRepository.findByCode(anyString())).thenReturn(Optional.empty());

        VoucherNotFoundException exception = assertThrows(VoucherNotFoundException.class, () -> {
            voucherService.redeemVoucher("CODE1", 1);
        });
        assertNotNull(exception);
    }

    @Test
    public void redeemVoucher_ShouldThrowVoucherExpiredException() {
        Voucher voucher = new Voucher(1L, "CODE1", "2023-12-31", 10, 0);
        Mockito.when(voucherRepository.findByCode(anyString())).thenReturn(Optional.of(voucher));

        VoucherExpiredException exception = assertThrows(VoucherExpiredException.class, () -> {
            voucherService.redeemVoucher("CODE1", 1);
        });
        assertNotNull(exception);
    }

    @Test
    public void redeemVoucher_ShouldThrowVoucherAlreadyRedeemedException() {
        Voucher voucher = new Voucher(1L, "CODE1", "2025-12-31", 10, 10);
        voucher.setVoucherStatus(VoucherStatus.REDEEMED);
        Mockito.when(voucherRepository.findByCode(anyString())).thenReturn(Optional.of(voucher));

        VoucherAlreadyRedeemedException exception = assertThrows(VoucherAlreadyRedeemedException.class, () -> {
            voucherService.redeemVoucher("CODE1", 1);
        });
        assertNotNull(exception);
    }

    @Test
    public void getAllVouchers_ShouldReturnAllVouchers() {
        Voucher voucher1 = new Voucher(1L, "CODE1", "2025-12-31", 10, 0);
        Voucher voucher2 = new Voucher(2L, "CODE2", "2025-12-31", 5, 0);
        Mockito.when(voucherRepository.findAll()).thenReturn(Arrays.asList(voucher1, voucher2));

        List<Voucher> vouchers = voucherService.getAllVouchers();
        assertEquals(2, vouchers.size());
    }
}