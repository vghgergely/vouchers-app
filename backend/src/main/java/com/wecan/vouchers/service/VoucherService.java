package com.wecan.vouchers.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wecan.vouchers.entity.Voucher;
import com.wecan.vouchers.entity.Voucher.VoucherStatus;
import com.wecan.vouchers.exceptions.VoucherAlreadyExistsException;
import com.wecan.vouchers.exceptions.VoucherAlreadyRedeemedException;
import com.wecan.vouchers.exceptions.VoucherException;
import com.wecan.vouchers.exceptions.VoucherExpiredException;
import com.wecan.vouchers.exceptions.VoucherNotFoundException;
import com.wecan.vouchers.repository.VoucherRepository;

@Service
public class VoucherService {
    @Autowired
    private VoucherRepository voucherRepository;

    public Voucher createVoucher(Voucher voucher) {
        if (voucherRepository.existsByCode(voucher.getCode())) {
            throw new VoucherAlreadyExistsException(voucher.getCode());
        }
        return voucherRepository.save(voucher);
    }

    public Optional<Voucher> getVoucher(String code) {
        return voucherRepository.findByCode(code);
    }

    public Voucher redeemVoucher(String code) throws VoucherException {
        Optional<Voucher> voucher = getVoucher(code);
        if (voucher.isEmpty()) {
            throw new VoucherNotFoundException(code);
        }
        Voucher voucherObject = voucher.get();
        if (voucherObject.isExpired()) {
            throw new VoucherExpiredException(code);
        }
        if (!voucherObject.isRedeemable()) {
            throw new VoucherAlreadyRedeemedException(code);
        }
        voucherObject.setRedemptionCount(voucherObject.getRedemptionCount() + 1);
        if (voucherObject.getRedemptionCount() == voucherObject.getMaxRedemptionCount()) {
            voucherObject.setVoucherStatus(VoucherStatus.REDEEMED);
        }
        return voucherRepository.save(voucher.get());
    }

    public List<Voucher> getAllVouchers() {
        return voucherRepository.findAll();
    }
}
