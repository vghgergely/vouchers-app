import { SubmitHandler, useForm } from "react-hook-form";

export interface VoucherCreationProps {
    code: string;
    expiryDate: string;
    maxRedemptionCount: number;
}

export interface VoucherFormProps {
    onSubmit: SubmitHandler<VoucherCreationProps>;
}

function VoucherForm({ onSubmit }: VoucherFormProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<VoucherCreationProps>();
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Voucher Code</label>
                <input
                    type="text"
                    {...register('code', { required: 'Voucher code is required' })}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.code && <span className="text-red-500 text-sm">{errors.code.message}</span>}
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                <input
                    type="date"
                    {...register('expiryDate', {
                        required: 'Expiry date is required',
                        validate: value => new Date(value) > new Date() || 'Expiry date must be a future date'
                    })}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.expiryDate && <span className="text-red-500 text-sm">{errors.expiryDate.message}</span>}
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Maximum Redemptions</label>
                <input
                    type="number"
                    {...register('maxRedemptionCount', {
                        required: 'Maximum redemptions is required',
                        min: { value: 1, message: 'Maximum redemptions must be at least 1' }
                    })}
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
    )
}

export default VoucherForm;