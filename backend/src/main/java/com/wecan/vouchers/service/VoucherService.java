package com.wecan.vouchers.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wecan.vouchers.entity.Voucher;
import com.wecan.vouchers.entity.Voucher.VoucherStatus;
import com.wecan.vouchers.exceptions.VoucherException;
import com.wecan.vouchers.repository.VoucherRepository;

@Service
public class VoucherService {
    @Autowired
    private VoucherRepository voucherRepository;

    public Voucher createVoucher(Voucher voucher) {
        return voucherRepository.save(voucher);
    }

    public Optional<Voucher> getVoucher(String code) {
        return voucherRepository.findByCode(code);
    }

    public void redeemVoucher(String code) throws VoucherException {
        Optional<Voucher> voucher = getVoucher(code);
        if (voucher.isEmpty()) {
            throw new VoucherException("Voucher not found");
        }
        Voucher voucherObject = voucher.get();
        if (!voucherObject.isRedeemable()) {
            throw new VoucherException("Voucher already redeemed");
        }
        voucherObject.setRedemptionCount(voucherObject.getRedemptionCount() + 1);
        if (voucherObject.getRedemptionCount() == voucherObject.getMaxRedemptionCount()) {
            voucherObject.setVoucherStatus(VoucherStatus.REDEEMED);
        }
        voucherRepository.save(voucher.get());
    }
}
