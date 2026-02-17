import { POLICY_OFFERS } from '@/constants';
import type { PolicyOffer } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

let mockPolicyOffers = [...POLICY_OFFERS];

export const fetchPolicies = async (search: string = '') => {
    await wait(500);
    const policies = [...mockPolicyOffers];
    if (!search) return policies;
    return policies.filter((x) => x.customer.toLowerCase().includes(search.toLowerCase()));
};

export const createPolicy = async (policy: PolicyOffer) => {
    await wait(500);
    const newPolicy = { ...policy, id: String(Math.max(...mockPolicyOffers.map((o) => Number(o.id))) + 1) };
    mockPolicyOffers.push(newPolicy);
    return newPolicy;
};

export const updatePolicy = async (policy: PolicyOffer) => {
    await wait(500);
    mockPolicyOffers = mockPolicyOffers.map((o) => (o.id === policy.id ? policy : o));
    return policy;
};

export const deletePolicy = async (id: string) => {
    await wait(500);
    mockPolicyOffers = mockPolicyOffers.filter((o) => o.id !== id);
    return id;
};

export const usePolicyOffers = (search: string = '') => {
    return useQuery({
        queryKey: ['policyOffers', search],
        queryFn: () => fetchPolicies(search),
    });
};

export const useCreatePolicy = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createPolicy,
        onMutate: async (newPolicy) => {
            await queryClient.cancelQueries({ queryKey: ['policyOffers'] });
            const previousPolicyOffers = queryClient.getQueriesData<PolicyOffer[]>({ queryKey: ['policyOffers'] });

            queryClient.setQueriesData<PolicyOffer[]>({ queryKey: ['policyOffers'] }, (old) => {
                const optimisticPolicy = {
                    ...newPolicy,
                    id: 'temp-' + Date.now(),
                };
                return [...(old || []), optimisticPolicy];
            });

            return { previousPolicyOffers };
        },
        onError: (_err, _newPolicy, context) => {
            if (context?.previousPolicyOffers) {
                context.previousPolicyOffers.forEach(([queryKey, data]) => {
                    queryClient.setQueryData(queryKey, data);
                });
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['policyOffers'] });
        },
    });
};

export const useUpdatePolicy = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updatePolicy,
        onMutate: async (updatedPolicy) => {
            await queryClient.cancelQueries({ queryKey: ['policyOffers'] });
            const previousPolicyOffers = queryClient.getQueriesData<PolicyOffer[]>({ queryKey: ['policyOffers'] });

            queryClient.setQueriesData<PolicyOffer[]>({ queryKey: ['policyOffers'] }, (old) =>
                (old || []).map((offer) => (offer.id === updatedPolicy.id ? updatedPolicy : offer)),
            );

            return { previousPolicyOffers };
        },
        onError: (_err, _updatedPolicy, context) => {
            if (context?.previousPolicyOffers) {
                context.previousPolicyOffers.forEach(([queryKey, data]) => {
                    queryClient.setQueryData(queryKey, data);
                });
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['policyOffers'] });
        },
    });
};

export const useDeletePolicy = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deletePolicy,
        onMutate: async (id) => {
            await queryClient.cancelQueries({ queryKey: ['policyOffers'] });
            const previousPolicyOffers = queryClient.getQueriesData<PolicyOffer[]>({ queryKey: ['policyOffers'] });

            queryClient.setQueriesData<PolicyOffer[]>({ queryKey: ['policyOffers'] }, (old) =>
                (old || []).filter((offer) => offer.id !== id),
            );

            return { previousPolicyOffers };
        },
        onError: (_err, _id, context) => {
            if (context?.previousPolicyOffers) {
                context.previousPolicyOffers.forEach(([queryKey, data]) => {
                    queryClient.setQueryData(queryKey, data);
                });
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['policyOffers'] });
        },
    });
};
