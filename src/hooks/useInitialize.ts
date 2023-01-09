import { signInAnonymously } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { auth, db } from "../libs/firebase";
import { createClient } from "../libs/graphqlClient";
import { createWsClient } from "../libs/wsClient";
import { useGlobalStore } from "../store/global/globalStore";
import { useUserStore } from "../store/user/userState";

let unSub: () => void;

export const useInitialize = () => {
  const TOKEN_KEY = process.env.NEXT_PUBLIC_TOKEN_KEY as string;
  const setClient = useGlobalStore((state) => state.setClient);
  const setUser = useUserStore((state) => state.setUser);
  const setIsClient = useGlobalStore((state) => state.setIsClient);
  const setIsWsClient = useGlobalStore((state) => state.setIsWsClient);
  const setWsClient = useGlobalStore((state) => state.setWsClient);

  useEffect(() => {
    const unSubUser = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult(true);
        const isHasClaims = idTokenResult.claims[TOKEN_KEY];

        if (idTokenResult.token && isHasClaims) {
          const client = createClient(idTokenResult.token);
          setClient(client);
          const wsClient = createWsClient(idTokenResult.token);
          setWsClient(wsClient);
          setUser(user);
          setIsClient(true);
          setIsWsClient(true);
        } else {
          const userRef = doc(db, "user_meta", user.uid);
          unSub = onSnapshot(userRef, async () => {
            const idTokenResultSnap = await user.getIdTokenResult(true);
            const isHasClaimsSnap = idTokenResultSnap.claims[TOKEN_KEY];

            if (idTokenResultSnap.token && isHasClaimsSnap) {
              const client = createClient(idTokenResultSnap.token);
              const wsClient = createWsClient(idTokenResultSnap.token);
              setClient(client);
              setWsClient(wsClient);
              setUser(user);
              setIsClient(true);
              setIsWsClient(true);
            }
          });
        }
      } else {
        const createGustUser = async () => {
          await signInAnonymously(auth).then((result) => result.user);
        };
        createGustUser();
      }
    });

    return () => {
      unSubUser();
      console.log(unSub);
      // unSub();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
