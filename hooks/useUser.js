import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "utils/firebase";
export const USER_STATES = {
  NOT_LOGGED: null,
  NOT_KNOWN: undefined,
};

export default function useUser() {
  const router = useRouter();
  const [user, setUser] = useState(USER_STATES.NOT_KNOWN);

  useEffect(() => {
    onAuthStateChanged((user) => setUser(user));
  }, []);

  useEffect(() => {
    {
      user === USER_STATES.NOT_LOGGED && router.push("/");
    }
  }, [user]);

  return user;
}
