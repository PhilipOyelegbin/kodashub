import { checkDomain } from "@/app/api/domain";
import { DomainItem, DomainState } from "@/utils/interface";
import { create } from "zustand";

export const useDomainStore = create<DomainState>((set) => ({
    domain: "",
    domainStatus: "",
    loading: false,
    message: "",
    error: "",

    action: {
        checkDomain: async (item: DomainItem) => {
            set({ loading: true, error: "" });
            try {
                const response = await checkDomain(item.name);
                if (response.success) {
                    set({ domain: response.domain, domainStatus: response.status, loading: false });
                } else {
                    set({ domain: "", domainStatus: "", loading: false, error: response.message });
                }
            } catch (err: any) {
                set({ domain: "", domainStatus: "", loading: false, error: err.message });
            }
        },
        clearDomain: () => set({ domain: "", domainStatus: "", loading: false, error: "" }),
    }
}));

export const useDomainAction = useDomainStore.getState().action