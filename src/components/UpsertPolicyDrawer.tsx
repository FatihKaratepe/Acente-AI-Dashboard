import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { POLICY_OFFER_STATUS, POLICY_OFFER_TYPES } from '@/constants';
import { policyOfferSchema } from '@/schemas/policy-offer';
import type { PolicyOffer } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Spinner } from '@/components/ui/spinner';
import { useEffect, useRef, useState, type Dispatch, type FC, type SetStateAction } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
interface UpsertPolicyDrawerProps {
  selectedPolicyOffer?: PolicyOffer;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  save: (data: z.infer<typeof policyOfferSchema>) => void;
}

export const UpsertPolicyDrawer: FC<UpsertPolicyDrawerProps> = ({ selectedPolicyOffer, isOpen, setIsOpen, save }) => {
  const submitButton = useRef<HTMLButtonElement>(null);
  const [isCalculatingPremium, setIsCalculatingPremium] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof policyOfferSchema>>({
    resolver: zodResolver(policyOfferSchema),
    mode: 'all',
    defaultValues: {
      customer: '',
      premium: '',
      type: undefined,
      status: undefined,
    },
  });

  const onTypeChange = (value: string) => {
    if (value) {
      setIsCalculatingPremium(true);
      setTimeout(() => {
        setIsCalculatingPremium(false);
      }, 500);
    }
  };

  useEffect(() => {
    if (!selectedPolicyOffer) reset();
    else reset({ ...selectedPolicyOffer, premium: selectedPolicyOffer.premium.replace('$', '').replace(/,/g, '') });
  }, [selectedPolicyOffer, reset]);

  const onSubmit = (data: z.infer<typeof policyOfferSchema>) => {
    save({ ...data, premium: `$${new Intl.NumberFormat('en-US').format(Number(data.premium))}` });
    close();
  };

  const close = () => {
    reset({
      customer: '',
      premium: '',
      type: undefined,
      status: undefined,
    });
    setIsOpen(false);
  };

  return (
    <Drawer open={isOpen} direction="right" onOpenChange={setIsOpen}>
      <DrawerContent onEscapeKeyDown={() => close()} onInteractOutside={(e) => e.preventDefault()}>
        <DrawerHeader>
          <DrawerDescription>{selectedPolicyOffer ? 'Edit' : 'Create'}</DrawerDescription>
          <DrawerTitle>Policy Offer</DrawerTitle>
        </DrawerHeader>
        <div className="p-4 overflow-auto">
          <form id="form-rhf-demo" onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="customer"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-customer">Customer</FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-customer"
                      aria-invalid={fieldState.invalid}
                      placeholder="Customer"
                      autoComplete="off"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="status"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-status">Status</FieldLabel>
                    <Select name={field.name} value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger id="form-rhf-status" aria-invalid={fieldState.invalid} className="min-w-30">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        {POLICY_OFFER_STATUS.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="type"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-type">Type</FieldLabel>
                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={(val) => {
                        field.onChange(val);
                        onTypeChange(val);
                      }}
                    >
                      <SelectTrigger id="form-rhf-type" aria-invalid={fieldState.invalid} className="min-w-30">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        {POLICY_OFFER_TYPES.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="premium"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-premium">Premium</FieldLabel>
                    <Input
                      {...field}
                      value={isCalculatingPremium ? 'Calculating...' : field.value}
                      disabled={isCalculatingPremium}
                      pattern="[0-9]*"
                      onChange={(e) => field.onChange(e.target.value.replace(/\D/g, ''))}
                      id="form-rhf-premium"
                      aria-invalid={fieldState.invalid}
                      placeholder="Premium"
                      autoComplete="off"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </FieldGroup>
            <button ref={submitButton} type="submit" hidden />
          </form>
        </div>
        <DrawerFooter className="grid grid-cols-2">
          <Button variant="outline" className="w-full" onClick={() => close()}>
            Close
          </Button>
          <Button
            className="w-full"
            disabled={!!Object.keys(errors).length || isSubmitting}
            onClick={() => submitButton.current?.click()}
          >
            {isSubmitting && <Spinner data-icon="inline-start" />} {selectedPolicyOffer ? 'Save' : 'Create'} 
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
