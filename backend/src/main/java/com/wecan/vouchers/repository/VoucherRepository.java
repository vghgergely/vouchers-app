package com.wecan.vouchers.repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wecan.vouchers.entity.Voucher;

@Repository
public interface VoucherRepository extends JpaRepository<Voucher, Long> {
    Optional<Voucher> findByCode(String code);
    Boolean existsByCode(String code);
    List<Voucher> findByCodeIn(Set<String> codes);
}
