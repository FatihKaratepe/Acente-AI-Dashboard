import { FilePlus, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { z } from 'zod';
import { DataTable } from './components/DataTable';
import { Button } from './components/ui/button';
import { InputGroup, InputGroupAddon, InputGroupInput } from './components/ui/input-group';
import { UpsertPolicyDrawer } from './components/UpsertPolicyDrawer';
import { POLICY_OFFERS } from './constants';
import { columns } from './constants/columns';
import { policyOfferSchema } from './schemas/policy-offer';
import type { PolicyOffer } from './types';

export const App = () => {
  const [policyOffers, setPolicyOffers] = useState<PolicyOffer[]>(POLICY_OFFERS);
  const [search, setSearch] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const filteredPolicyOffers = useMemo(() => {
    return policyOffers.filter((x) => x.customer.toLowerCase().includes(search));
  }, [search, policyOffers]);

  const onSave = (data: z.infer<typeof policyOfferSchema>) => {
    setPolicyOffers((prev) => {
      if (data.id) {
        return prev.map((offer) => (offer.id === data.id ? { ...offer, ...data } : offer));
      }

      return [
        ...prev,
        {
          ...data,
          id: prev.length ? String(Math.max(...prev.map((o) => Number(o.id))) + 1) : '0',
        },
      ];
    });
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

          <Button variant="outline" onClick={() => setIsOpen(true)}>
            <FilePlus />
            Create Policy
          </Button>
        </div>
        <DataTable columns={columns} data={filteredPolicyOffers} />
      </div>
      <UpsertPolicyDrawer isOpen={isOpen} setIsOpen={setIsOpen} save={onSave} />
    </>
  );
};
