import type { PolicyOffer } from '@/types';
import { PolicyActions } from '@/components/PolicyActions';
import { createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper<PolicyOffer>();

export const getColumns = ({
  onEdit,
  onDelete,
  onInquire,
}: {
  onEdit: (policy: PolicyOffer) => void;
  onDelete: (policy: PolicyOffer) => void;
  onInquire: (policy: PolicyOffer) => void;
}) => [
  columnHelper.accessor('customer', {
    header: 'Customer',
    size: 200,
  }),
  columnHelper.accessor('type', {
    header: 'Type',
    size: 50,
  }),
  columnHelper.accessor('premium', {
    header: 'Premium',
    size: 50,
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    size: 70,
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
  columnHelper.display({
    id: 'actions',
    header: 'Actions',
    size: 50,
    cell: ({ row }) => (
      <PolicyActions
        policy={row.original}
        onEdit={onEdit}
        onDelete={onDelete}
        onInquire={onInquire}
      />
    ),
  }),
];
