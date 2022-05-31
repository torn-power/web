import { defineStore } from "pinia";

export const useSpinningStore = defineStore("spinning", {
  state: () => {
    return {
      spinning: false,
    };
  },
  actions: {
    setSpinning(spinning) {
      this.spinning = spinning;
    },
  },
});

export const useGlobalStore = defineStore("global", {
  state: () => {
    return {
      address: undefined,
    };
  },
  getters: {
    getAddress() {
      return this.address;
    },
  },
  actions: {
    setAddress(address) {
      this.address = address;
    },
  },
});
