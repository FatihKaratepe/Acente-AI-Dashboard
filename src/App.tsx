import { FilePlus, Search } from 'lucide-react';
import { useMemo, useState, useRef } from 'react';
import { z } from 'zod';

import { useCreatePolicy, useDeletePolicy, usePolicyOffers, useUpdatePolicy } from './api';
import { DataTable } from './components/DataTable';
import { Button } from './components/ui/button';
import { InputGroup, InputGroupAddon, InputGroupInput } from './components/ui/input-group';
import { UpsertPolicyDrawer } from './components/UpsertPolicyDrawer';
import { MioxBot, type MioxBotHandle } from './components/MioxBot';
import { getColumns } from './constants/columns';
import { policyOfferSchema } from './schemas/policy-offer';
import type { PolicyOffer } from './types';

import { useDebounce } from './hooks/use-debounce';

export const App = () => {
  const [selectedPolicyOffer, setSelectedPolicyOffer] = useState<PolicyOffer | undefined>(undefined);
  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce(search, 300);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const mioxBotRef = useRef<MioxBotHandle>(null);

  const { data: policyOffers = [], isLoading: isQueryLoading } = usePolicyOffers(debouncedSearch);
  const { mutate: createMutation, isPending: isCreating } = useCreatePolicy();
  const { mutate: updateMutation, isPending: isUpdating } = useUpdatePolicy();
  const { mutate: deleteMutation, isPending: isDeleting } = useDeletePolicy();

  const isLoading = isQueryLoading || isCreating || isUpdating || isDeleting;

  const columns = useMemo(
    () =>
      getColumns({
        onEdit: (data) => {
          setSelectedPolicyOffer(data);
          setIsOpen(true);
        },
        onDelete: (data) => deleteMutation(data.id),
        onInquire: (data) => {
            mioxBotRef.current?.open();
            mioxBotRef.current?.setInput(`I have a question about ${data.customer}'s ${data.type} policy`);
        },
      }),
    [deleteMutation],
  );

  const onSave = (data: z.infer<typeof policyOfferSchema>) => {
    if (data.id) {
      updateMutation(data as PolicyOffer);
    } else {
      createMutation(data as PolicyOffer);
    }
    setIsOpen(false);
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between gap-6">
          <InputGroup className="w-auto">
            <InputGroupInput onChange={(e) => setSearch(e.target.value)} placeholder="Search by customer..." />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>

          <Button
            variant="outline"
            onClick={() => {
              setSelectedPolicyOffer(undefined);
              setIsOpen(true);
            }}
          >
            <FilePlus />
            Create Policy
          </Button>
        </div>
        <DataTable columns={columns} data={policyOffers} isLoading={isLoading} />
      </div>
      <UpsertPolicyDrawer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        save={onSave}
        selectedPolicyOffer={selectedPolicyOffer}
      />
      <MioxBot ref={mioxBotRef} />
      
    </>
  );
};
