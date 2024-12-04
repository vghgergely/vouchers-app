import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { BulkVoucherCreationRequest, VoucherCreationRequest } from '../types';
import { createVouchers } from '../api/vouchersApi';
import { appendVouchers } from '../states/voucherSelectionSlice';
import { RootState } from '../store';
import VoucherForm, { VoucherCreationProps } from '../components/VoucherForm';
import VoucherList from '../components/VoucherList';



function VoucherManagementPage() {
  const { reset } = useForm<VoucherCreationProps>();
  const [vouchersToCreate, setVouchersToCreate] = useState<VoucherCreationRequest[]>([]);
  const selectedUser = useSelector((state: RootState) => state.user.selectedUser);
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<VoucherCreationProps> = (data) => {
    const newVoucher: VoucherCreationRequest = {
      code: data.code,
      expiryDate: data.expiryDate,
      maxRedemptionCount: data.maxRedemptionCount
    };
    setVouchersToCreate([...vouchersToCreate, newVoucher]);
    reset();
  };

  const handleCreateVouchers = () => {
    const userRole = selectedUser?.role || 'OPERATOR';
    const request: BulkVoucherCreationRequest = {
        userRole,
        voucherCreationRequests: vouchersToCreate
    };
    createVouchers(request)
      .then(response => {
        dispatch(appendVouchers(response.data));
        setVouchersToCreate([]);
      })
      .catch(error => {
        console.error('Error creating vouchers:', error);
      });
  };

  return (
    <div className="p-10">
    <VoucherForm onSubmit={onSubmit} />

      {vouchersToCreate.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Vouchers to be Created</h2>
          <VoucherList vouchers={vouchersToCreate} />
          <button
            onClick={handleCreateVouchers}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
          >
            Create Vouchers
          </button>
        </div>
      )}
    </div>
  );
};

export default VoucherManagementPage;