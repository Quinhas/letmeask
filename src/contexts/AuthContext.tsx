import { Text, Flex, Spinner, useColorMode } from "@chakra-ui/react";
import { ReactNode, useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { auth, firebase } from "src/services/firebase";

type User = {
  id: string;
  name: string;
  avatar?: string;
};

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
  createUserWithEmailAndPassword: (
    email: string,
    password: string,
    name: string
  ) => Promise<void>;
  signInWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<void>;
  signOut: () => Promise<void>;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const { colorMode } = useColorMode();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, photoURL, uid } = user;
        if (!displayName) {
          throw new Error("Missing name");
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL || undefined,
        });
        setLoading(false);
      } else {
        setUser(undefined);
        setLoading(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function createUserWithEmailAndPassword(
    email: string,
    password: string,
    name: string
  ) {
    const result = await auth.createUserWithEmailAndPassword(email, password);
    if (result.user) {
      await result.user.updateProfile({
        displayName: name,
      });
      const { displayName, photoURL, uid } = result.user;

      setUser({
        id: uid,
        name: displayName || name,
        avatar: photoURL || undefined,
      });
    }
  }

  async function signInWithEmailAndPassword(email: string, password: string) {
    const result = await auth.signInWithEmailAndPassword(email, password);
    if (result.user) {
      const { displayName, photoURL, uid } = result.user;
      if (!displayName) {
        throw new Error("Missing name.");
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL || undefined,
      });
    }
  }

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);
    if (result.user) {
      const { displayName, photoURL, uid } = result.user;
      if (!displayName || !photoURL) {
        throw new Error("Missing information from Google Account.");
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      });
    }
  }

  async function signOut() {
    await auth.signOut();
  }

  if (loading) {
    return (
      <Flex w={"100vw"} h={"100vh"} align={"center"} justify={"center"}>
        <Flex
          direction={"column"}
          align="center"
          gridGap={"1.5rem"}
          bg={colorMode === "light" ? "white" : "black"}
          boxShadow={"md"}
          py={"2rem"}
          px={"4rem"}
          borderRadius={"md"}
        >
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
          <Text color="gray.500">Carregando...</Text>
        </Flex>
      </Flex>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signOut,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
