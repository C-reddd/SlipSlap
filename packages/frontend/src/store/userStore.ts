import cookie from "js-cookie";
import create from "zustand";

const USER_COOKIE = "userID";

type State = {
  hasUser: boolean;
};

function get() {
  return cookie.get(USER_COOKIE) !== undefined;
}

const useUserStore = create<State>(() => ({
  hasUser: get(),
}));

export function useHasUser() {
  return useUserStore((state: State) => state.hasUser);
}
