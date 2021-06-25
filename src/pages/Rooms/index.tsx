import {
  Button,
  Flex,
  useColorMode,
  Link,
  useToast,
  ButtonGroup,
  Box,
  Heading,
  Text,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import { FaDoorOpen, FaPlus, FaSignOutAlt } from "react-icons/fa";
import { Logo } from "src/components/Logo";
import { ToggleTheme } from "src/components/ToggleTheme";
import { useAuth } from "src/hooks/useAuth";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { database } from "src/services/firebase";
import { useEffect, useState } from "react";

type FirebaseRooms = Record<
  string,
  {
    authorId: string;
    title: string;
    questions: Record<string, FirebaseQuestions>;
  }
>;

type FirebaseQuestions = Record<
  string,
  {
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likes: Record<
      string,
      {
        authorId: string;
      }
    >;
  }
>;

type Room = {
  id: string;
  authorId: string;
  title: string;
  questions: number;
};

export function Rooms() {
  const [rooms, setRooms] = useState<Room[]>();
  const { user, signOut } = useAuth();
  const { colorMode } = useColorMode();
  const toast = useToast();
  const history = useHistory();

  async function handleSignOutButton() {
    try {
      history.push("/login");
      await signOut();
      toast({
        description: "Usuário deslogado com sucesso.",
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      toast({
        description: "Não foi possível completar a operação. Tente novamente",
        status: "error",
        isClosable: true,
      });
    }
  }

  useEffect(() => {
    if (!user?.id) {
      return;
    }
    const roomRef = database
      .ref(`rooms`)
      .orderByChild("authorId")
      .equalTo(user.id);

    roomRef.on("value", (room) => {
      const databaseRooms: FirebaseRooms = room.val() ?? [];
      const parsedRooms = Object.entries(databaseRooms).map(([key, value]) => {
        return {
          id: key,
          authorId: value.authorId,
          title: value.title,
          questions: Object.values(value.questions ?? {}).length,
        };
      });

      setRooms(parsedRooms);
    });

    return () => {
      roomRef.off("value");
    };
  }, [user?.id]);

  return (
    <>
      <Flex
        as={"header"}
        p={"1.5rem"}
        px={{ lg: "10rem" }}
        flex={1}
        borderBottom={"1px solid"}
        borderColor={
          colorMode === "light" ? "blackAlpha.100" : "whiteAlpha.100"
        }
        justify={"space-between"}
        align={"center"}
        gridGap={"0.5rem"}
      >
        <Flex alignSelf={"center"}>
          <Link as={RouterLink} to="/">
            <Logo style={{ maxHeight: "2.875rem" }} />
          </Link>
        </Flex>
        <Flex gridGap={"0.5rem"}>
          <ToggleTheme />
          <Button
            leftIcon={<FaSignOutAlt />}
            colorScheme={"secondaryApp"}
            variant={"outline"}
            onClick={handleSignOutButton}
          >
            Sair
          </Button>
        </Flex>
      </Flex>
      <Flex
        direction={"column"}
        as={"main"}
        maxW={{ base: "80%", md: "60%" }}
        margin={"0 auto"}
        my={"2rem"}
      >
        <ButtonGroup>
          <Button
            colorScheme={"primaryApp"}
            leftIcon={<FaDoorOpen />}
            as={RouterLink}
            to={"/rooms/join"}
          >
            Entrar em uma sala
          </Button>
          <Button
            colorScheme={"secondaryApp"}
            leftIcon={<FaPlus />}
            as={RouterLink}
            to={"/rooms/new"}
          >
            Criar uma sala
          </Button>
        </ButtonGroup>
        <Box mt={"1rem"}>
          {rooms &&
            rooms?.length > 0 &&
            rooms.map((room) => {
              return (
                <Flex
                  key={room.id}
                  bg={
                    colorMode === "light" ? "whiteAlpha.900" : "blackAlpha.900"
                  }
                  borderRadius={"0.5rem"}
                  boxShadow={"sm"}
                  padding={"1.5rem"}
                  className={"room"}
                  sx={{ "& + .room": { marginTop: "0.5rem" } }}
                  direction={"column"}
                  gridGap={"0.5rem"}
                  as={LinkBox}
                  transition={"0.2s"}
                  _hover={{
                    transform: "scale(1.02)",
                  }}
                >
                  <Text
                    color={"gray.500"}
                    fontSize={"0.8rem"}
                    letterSpacing={"wider"}
                  >
                    #{room.id}
                  </Text>
                  <Flex>
                    <LinkOverlay as={RouterLink} to={`/admin/rooms/${room.id}`}>
                      <Heading
                        fontSize={"1.5rem"}
                        color={
                          colorMode === "light"
                            ? "blackAlpha.900"
                            : "whiteAlpha.900"
                        }
                      >
                        {room.title}
                      </Heading>
                    </LinkOverlay>
                    <Text
                      ml={"1rem"}
                      bg={"secondaryApp.500"}
                      borderRadius={"lg"}
                      p={"0.5rem 1rem"}
                      color={
                        colorMode === "light"
                          ? "whiteAlpha.900"
                          : "blackAlpha.900"
                      }
                      fontWeight={500}
                      fontSize={"0.875rem"}
                    >
                      {room.questions} pergunta
                      {room.questions > 1 && "s"}
                    </Text>
                  </Flex>
                </Flex>
              );
            })}
        </Box>
      </Flex>
    </>
  );
}
