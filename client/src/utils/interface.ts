export interface DomainItem {
    name: string;
}

export interface DomainState {
    domain: string;
    domainStatus: string;
    loading: boolean;
    message: string;
    error: string;

    action: {
        checkDomain: (item: DomainItem) => void;
        clearDomain: () => void;
    }
}

export interface DomainResult {
    message: string;
    result: {
        name: string;
        price: number;
        available: boolean;
    }
}