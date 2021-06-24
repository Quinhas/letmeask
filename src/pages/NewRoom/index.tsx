import { Link as RouterLink, useHistory } from "react-router-dom";

import illustrationImg from "../../assets/images/illustration.svg";

import { useAuth } from "src/hooks/useAuth";
import { FormEvent, useState } from "react";
import { database } from "src/services/firebase";
import {
  Button,
  Flex,
  Heading,
  Text,
  Image,
  Input,
  Link,
  useColorMode,
  useBreakpointValue,
} from "@chakra-ui/react";
import { ToggleTheme } from "src/components/ToggleTheme";
import { Logo } from "src/components/Logo";

export function NewRoom() {
  const { user } = useAuth();
  const history = useHistory();
  const [newRoom, setNewRoom] = useState("");
  const [creatingRoom, setIsCreatingRoom] = useState(false);
  const { colorMode } = useColorMode();
  const isMobile = useBreakpointValue({ base: true, md: false });

  async function handleCreateRoom(ev: FormEvent) {
    ev.preventDefault();
    setIsCreatingRoom(true);

    if (newRoom.trim() === "") {
      return;
    }

    try {
      const roomRef = database.ref("rooms");
      const firebaseRoom = await roomRef.push({
        title: newRoom,
        authorId: user?.id,
      });

      history.push(`/rooms/${firebaseRoom.key}`);
    } catch (error) {
      setIsCreatingRoom(false);
    }
  }

  return (
    <Flex
      align={"stretch"}
      h={"100vh"}
      direction={{ base: "column", md: "row" }}
    >
      <Flex
        flex={7}
        direction={"column"}
        justify={"space-between"}
        bg={"primaryApp.500"}
        color={"white"}
        gridGap={"2rem"}
      >
        <Flex px={"5rem"} pt={"2rem"}>
          <ToggleTheme />
        </Flex>
        <Flex
          flexDirection={"column"}
          justify={"center"}
          px={"5rem"}
          pb={"5rem"}
        >
          {!isMobile && (
            <Image
              src={illustrationImg}
              maxW={"20rem"}
              alt="Ilustração simbolizando perguntas e respostas"
            />
          )}
          <Heading
            fontWeight="700"
            fontSize={"2.5rem"}
            lineHeight={"2.625rem"}
            mt={"1rem"}
            color={colorMode === "light" ? "whiteAlpha.900" : "blackAlpha.900"}
          >
            Crie salas de Q&amp;A ao-vivo
          </Heading>
          <Text
            fontSize={"1.5rem"}
            lineHeight={"2rem"}
            mt={"1rem"}
            color={colorMode === "light" ? "whiteAlpha.900" : "blackAlpha.900"}
          >
            Tire as dúvidas da sua audiência em tempo-real
          </Text>
        </Flex>
      </Flex>
      <Flex flex={8} m={"0 2rem"} align={"center"} justify={"center"}>
        <Flex
          w={"100%"}
          maxW={"21rem"}
          flexDirection={"column"}
          align={"stretch"}
          textAlign={"center"}
        >
          <Flex alignSelf={"center"}>
            <Logo />
          </Flex>
          <Heading
            fontSize={"1.5rem"}
            margin={"2rem"}
            color={colorMode === "light" ? "blackAlpha.900" : "whiteAlpha.900"}
          >
            Crie uma nova sala
          </Heading>
          <form onSubmit={handleCreateRoom}>
            <Input
              type="text"
              name="roomName"
              placeholder="Nome da Sala"
              onChange={(event) => setNewRoom(event.target.value)}
              value={newRoom}
              bg={colorMode === "light" ? "white" : "black"}
              color={
                colorMode === "light" ? "blackAlpha.800" : "whiteAlpha.800"
              }
              h={"3.125rem"}
              borderRadius={"0.5rem"}
              p={"0 1rem"}
              border={"1px solid"}
              w={"100%"}
            />
            <Button
              type="submit"
              variant={"app"}
              w={"100%"}
              mt={"1rem"}
              isLoading={creatingRoom}
            >
              Criar sala
            </Button>
          </form>
          <Text
            fontSize={"0.875rem"}
            color={colorMode === "light" ? "blackAlpha.600" : "whiteAlpha.600"}
            mt={"1rem"}
          >
            Quer entrar em uma sala já existente?{" "}
            <Link as={RouterLink} to="/" color={"#e559f9"}>
              Clique aqui
            </Link>
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
