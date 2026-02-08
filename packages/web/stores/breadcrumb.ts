import { create } from "zustand";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbState {
  items: BreadcrumbItem[];
  setBreadcrumbs: (items: BreadcrumbItem[]) => void;
  clearBreadcrumbs: () => void;
}

export const useBreadcrumbStore = create<BreadcrumbState>()((set) => ({
  items: [],
  setBreadcrumbs: (items) => set({ items }),
  clearBreadcrumbs: () => set({ items: [] }),
}));
