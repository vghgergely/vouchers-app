import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { BulkVoucherCreationRequest, VoucherCreationRequest } from '../types';
import { createVouchers } from '../api/vouchersApi';
import { appendVouchers } from '../states/voucherSlice';
import { RootState } from '../store';
import VoucherForm, { VoucherCreationProps } from '../components/VoucherForm';
import VoucherList from '../components/VoucherList';



function VoucherManagementPage() {
  const { reset } = useForm<VoucherCreationProps>();
  const [vouchersToCreate, setVouchersToCreate] = useState<VoucherCreationRequest[]>([]);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
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

  useEffect(() => {
    let successTimeoutId: NodeJS.Timeout | undefined;
    let errorTimeoutId: NodeJS.Timeout | undefined;

    if (showSuccess) {
      successTimeoutId = setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }

    if (showError) {
      successTimeoutId = setTimeout(() => {
        setShowError(false);
      }, 3000);
    }

    return () => {
      if (successTimeoutId) {
        clearTimeout(successTimeoutId);
      }
      if (errorTimeoutId) {
        clearTimeout(errorTimeoutId);
      }
    };
  }, [showSuccess, showError]);

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
        setShowSuccess(true);
        setShowError(false);
      })
      .catch(error => {
        setShowError(true);
        setShowSuccess(false);
      });
  };

  const handleRemoveVoucher = (code: string) => {
    setVouchersToCreate(vouchersToCreate.filter(voucher => voucher.code !== code));
  };

  return (
    <div className="p-10">
      <VoucherForm onSubmit={onSubmit} />
        <div className={`fixed top-24 -translate-x-1/2 left-1/2 mt-4 p-4 w-auto bg-green-100 border border-green-400 text-green-700 rounded transition-opacity duration-300 ${showSuccess ? 'opacity-100' : 'opacity-0'}`}>
        Voucher(s) created successfully
      </div>
     
      <div className={`fixed top-24 -translate-x-1/2 left-1/2 transition-opacity duration-300 mt-4 p-4 w-auto border bg-red-100 border-red-400 text-red-800 rounded ${showError ? 'opacity-100' : 'opacity-0'}`}>
        Failed to create vouchers
      </div>
      {vouchersToCreate.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Vouchers to be Created</h2>
          <VoucherList vouchers={vouchersToCreate} onRemoveVoucher={handleRemoveVoucher} />
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