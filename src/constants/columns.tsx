import type { PolicyOffer } from '@/types';
import { createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper<PolicyOffer>();

export const columns = [
  columnHelper.accessor('customer', {
    header: 'Customer',
  }),
  columnHelper.accessor('type', {
    header: 'Type',
  }),
  columnHelper.accessor('premium', {
    header: 'Premium',
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: ({ getValue }) => {
      const status = getValue();

      switch (status) {
        case 'Approved':
          return <span className="text-green-600">Approved</span>;
        case 'Payment Required':
          return <span className="text-red-600">Payment Required</span>;
        case 'Pending':
          return <span className="text-yellow-600">Pending</span>;
        default:
          return null;
      }
    },
  }),
];
