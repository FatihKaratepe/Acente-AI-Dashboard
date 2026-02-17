import type { PolicyOffer } from '@/types';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Info, Pencil, Trash2 } from 'lucide-react';

interface PolicyActionsProps {
  policy: PolicyOffer;
  onEdit: (policy: PolicyOffer) => void;
  onDelete: (policy: PolicyOffer) => void;
  onInquire: (policy: PolicyOffer) => void;
}

export const PolicyActions = ({ policy, onEdit, onDelete, onInquire }: PolicyActionsProps) => {
  return (
    <div className="flex gap-2">
      <AlertDialog>
        <Tooltip>
          <TooltipTrigger asChild>
            <AlertDialogTrigger asChild>
              <Button size="icon" variant="ghost">
                <Trash2 className="text-red-600" />
              </Button>
            </AlertDialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete</p>
          </TooltipContent>
        </Tooltip>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently <b>delete</b> the policy for <b>{policy.customer}</b>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={() => onDelete(policy)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" variant="ghost" onClick={() => onEdit(policy)}>
            <Pencil className="text-yellow-600" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Edit</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" variant="ghost" onClick={() => onInquire(policy)}>
            <Info className="text-blue-600" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Inquire</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};
