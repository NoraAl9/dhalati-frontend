import { atom } from "recoil";

const alertAtom = atom({
  key: "alert",
  default: {
    show: false,
    variant: "success",
    message: "",
  },
});

export default alertAtom;
