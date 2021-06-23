import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  Textarea,
  useColorMode,
} from "@chakra-ui/react";
import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Logo } from "src/components/Logo";
import { RoomCode } from "src/components/RoomCode";
import { ToggleTheme } from "src/components/ToggleTheme";
import { useAuth } from "src/hooks/useAuth";
import { database } from "src/services/firebase";
import logoImg from "../../assets/images/logo.svg";

type Question = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
};

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
  }
>;

type RoomParams = {
  id: string;
};

export function Room() {
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const [newQuestion, setNewQuestion] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [title, setTitle] = useState("");
  const { colorMode } = useColorMode();

  const roomId = params.id;

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on("value", (room) => {
      const databaseRoom = room.val();
      const firebaseQuestion: FirebaseQuestions = databaseRoom.questions ?? {};
      const parsedQuestions = Object.entries(firebaseQuestion).map(
        ([key, value]) => {
          return {
            id: key,
            ...value,
          };
        }
      );
      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    });
  }, [roomId]);

  async function handleSendQuestion(ev: FormEvent) {
    ev.preventDefault();
    if (newQuestion.trim() === "") {
      return;
    }

    if (!user) {
      throw new Error("You must be logged in.");
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    };

    try {
      await database.ref(`rooms/${roomId}/questions/`).push(question);
      setNewQuestion("");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Box
        as={"header"}
        p={"1.5rem"}
        borderBottom={"1px solid"}
        borderColor={
          colorMode === "light" ? "blackAlpha.100" : "whiteAlpha.100"
        }
      >
        <Flex
          maxW={"80rem"}
          margin={"0 auto"}
          justify={"space-between"}
          align={"center"}
        >
          {/* <Image maxH={"2.875rem"} src={logoImg} alt="Letmeask" /> */}
          <Flex alignSelf={"center"}>
            <Logo style={{maxHeight: "2.875rem"}}/>
          </Flex>
          <RoomCode code={roomId} />
          <ToggleTheme />
        </Flex>
      </Box>

      <Box as={"main"} maxW={"55rem"} margin={"0 auto"}>
        <Flex margin={"2rem 0 1.5rem"} align={"center"}>
          <Heading fontSize={"1.5rem"} color={colorMode === "light" ? "blackAlpha.800" : "whiteAlpha.800"}>
            Sala {title}
          </Heading>
          {questions.length > 0 && (
            <Text
              ml={"1rem"}
              bg={"#e559f9"}
              borderRadius={"lg"}
              p={"0.5rem 1rem"}
              color={colorMode === "light" ? "blackAlpha.100" : "whiteAlpha.100"}
              fontWeight={500}
              fontSize={"0.875rem"}
            >
              {questions.length} pergunta{questions.length > 1 && "s"}
            </Text>
          )}
        </Flex>

        <form onSubmit={handleSendQuestion}>
          <Textarea
            placeholder="O que você quer perguntar?"
            value={newQuestion}
            onChange={(event) => setNewQuestion(event.target.value)}
            w={"100%"}
            border={0}
            padding={"1rem"}
            bg={colorMode === "light" ? "white" : "black"}
            color={colorMode === "light" ? "blackAlpha.800" : "whiteAlpha.800"}
            boxShadow={"sm"}
            resize={"vertical"}
            minH={"8.125rem"}
          />
          <Flex justify={"space-between"} align={"center"} mt={"1rem"}>
            {user ? (
              <Flex align={"center"}>
                <Image
                  boxSize={"2rem"}
                  borderRadius={"50%"}
                  src={user.avatar}
                  alt={user.name}
                />
                <Text
                  ml={"0.5rem"}
                  color={colorMode === "light" ? "blackAlpha.800" : "whiteAlpha.800"}
                  fontWeight={500}
                  fontSize={"0.875rem"}
                >
                  {user.name}
                </Text>
              </Flex>
            ) : (
              <Text fontSize={"0.875rem"} color={colorMode === "light" ? "blackAlpha.800" : "whiteAlpha.800"} fontWeight={500}>
                Para enviar uma pergunta,{" "}
                <Button
                  variant={"link"}
                  color={"primaryApp.500"}
                  fontSize={"0.875rem"}
                  fontWeight={500}
                >
                  faça seu login
                </Button>
                .
              </Text>
            )}
            <Button type="submit" disabled={!user} variant={"app"}>
              Enviar pergunta
            </Button>
          </Flex>
        </form>
      </Box>
    </>
  );
}
