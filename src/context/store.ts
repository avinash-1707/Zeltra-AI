import { create } from "zustand";

export const useChatDraftStore = create((set) => ({
  draftMessage: "",
  setDraftMessage: (msg: string) => set({ draftMessage: msg }),
  clearDraftMessage: () => set({ draftMessage: "" }),
}));
