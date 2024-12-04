import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { BulkVoucherCreationRequest, VoucherCreationRequest } from '../types';
import { createVouchers } from '../api/vouchersApi';
import { appendVouchers } from '../store/voucherSelectionSlice';
import { RootState } from '../store';

interface VoucherCreationProps {
  code: string;
  expiryDate: string;
  maxRedemptionCount: number;
}

function VoucherManagementPage() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<VoucherCreationProps>();
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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Voucher Code</label>
          <input
            type="text"
            {...register('code', { required: 'Voucher code is required'})}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.code && <span className="text-red-500 text-sm">{errors.code.message}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
          <input
            type="date"
            {...register('expiryDate', { required: 'Expiry date is required', validate: value => new Date(value) > new Date() || 'Expiry date must be a future date' })}
            
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.expiryDate && <span className="text-red-500 text-sm">{errors.expiryDate.message}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Maximum Redemptions</label>
          <input
            type="number"
            {...register('maxRedemptionCount', { required: 'Maximum redemptions is required', min: { value: 1, message: 'Maximum redemptions must be at least 1' } })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.maxRedemptionCount && <span className="text-red-500 text-sm">{errors.maxRedemptionCount.message}</span>}
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Add Voucher
        </button>
      </form>

      {vouchersToCreate.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Vouchers to be Created</h2>
          <ul className="list-disc pl-5">
            {vouchersToCreate.map((voucher, index) => (
              <li key={index}>
                {voucher.code} - Expires on {voucher.expiryDate.split("T")} - Max Redemptions: {voucher.maxRedemptionCount}
              </li>
            ))}
          </ul>
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