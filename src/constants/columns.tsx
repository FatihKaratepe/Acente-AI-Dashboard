import type { PolicyOffer } from '@/types';
import { PolicyActions } from '@/components/PolicyActions';
import { createColumnHelper } from '@tanstack/react-table';
import { 
  Car, 
  HeartPulse, 
  Home, 
  Plane, 
  CheckCircle2, 
  CreditCard, 
  Clock 
} from 'lucide-react';

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
    cell: ({ getValue }) => {
      const type = getValue();
      switch (type) {
        case 'Auto':
          return <div className="flex items-center gap-2"><Car className="h-4 w-4 text-blue-500" /> Auto</div>;
        case 'Health':
          return <div className="flex items-center gap-2"><HeartPulse className="h-4 w-4 text-red-500" /> Health</div>;
        case 'Home':
          return <div className="flex items-center gap-2"><Home className="h-4 w-4 text-orange-500" /> Home</div>;
        case 'Travel':
          return <div className="flex items-center gap-2"><Plane className="h-4 w-4 text-sky-500" /> Travel</div>;
        default:
          return type;
      }
    }
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
          return <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-600" /><span>Approved</span></div>;
        case 'Payment Required':
          return <div className="flex items-center gap-2"><CreditCard className="h-4 w-4 text-red-600" /><span>Payment Required</span></div>;
        case 'Pending':
          return <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-yellow-600" /><span>Pending</span></div>;
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
