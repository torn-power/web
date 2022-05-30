import { defineStore } from "pinia";

export const useSpinningStore = defineStore("spinning", {
  state: () => {
    return { spinning: false };
  },
  actions: {
    setSpinning(spinning) {
      this.spinning = spinning;
    },
  },
});
