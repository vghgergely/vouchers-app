package com.wecan.vouchers.repository;

import com.wecan.vouchers.entity.Voucher;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;

@ExtendWith(SpringExtension.class)
@AutoConfigureTestDatabase
@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class VoucherRepositoryTest {

    @Autowired
    private VoucherRepository voucherRepository;

    @Test
    public void testFindByCode() {
        Voucher voucher = new Voucher("CODE1", "2025-12-31", 10);
        voucherRepository.save(voucher);

        Optional<Voucher> foundVoucher = voucherRepository.findByCode("CODE1");
        assertTrue(foundVoucher.isPresent());
        assertEquals("CODE1", foundVoucher.get().getCode());
    }

    @Test
    public void testExistsByCode() {
        Voucher voucher = new Voucher("CODE1", "2025-12-31", 10);
        voucherRepository.save(voucher);

        Boolean exists = voucherRepository.existsByCode("CODE1");
        assertTrue(exists);
    }

    @Test
    public void testFindByCodeIn() {
        Voucher voucher1 = new Voucher("CODE1", "2025-12-31", 10);
        Voucher voucher2 = new Voucher("CODE2", "2025-12-31", 5);
        voucherRepository.saveAll(Arrays.asList(voucher1, voucher2));

        Set<String> codes = new HashSet<>(Arrays.asList("CODE1", "CODE2"));
        List<Voucher> foundVouchers = voucherRepository.findByCodeIn(codes);

        assertEquals(2, foundVouchers.size());
        assertTrue(foundVouchers.stream().anyMatch(v -> v.getCode().equals("CODE1")));
        assertTrue(foundVouchers.stream().anyMatch(v -> v.getCode().equals("CODE2")));
    }
}