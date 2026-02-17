import type { PolicyOffer } from '@/types';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { createColumnHelper } from '@tanstack/react-table';
import { Info, Pencil, Trash2 } from 'lucide-react';

const columnHelper = createColumnHelper<PolicyOffer>();

// @ts-ignore
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
  columnHelper.display({
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="icon" variant="ghost" onClick={() => onDelete(row.original)}>
              <Trash2 className="text-red-600" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="icon" variant="ghost" onClick={() => onEdit(row.original)}>
              <Pencil className="text-yellow-600" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Edit</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="icon" variant="ghost" onClick={() => onInquire(row.original)}>
              <Info className="text-blue-600" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Inquire</p>
          </TooltipContent>
        </Tooltip>
      </div>
    ),
  }),
];
