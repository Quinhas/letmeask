import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Image,
  Text,
  Textarea,
  useColorMode,
  Link,
} from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { Logo } from "src/components/Logo";
import { Question } from "src/components/Question";
import { RoomCode } from "src/components/RoomCode";
import { ToggleTheme } from "src/components/ToggleTheme";
import { useAuth } from "src/hooks/useAuth";
import { useRoom } from "src/hooks/useRoom";
import { database } from "src/services/firebase";
import { Link as RouterLink } from "react-router-dom";

type RoomParams = {
  id: string;
};

export function Room() {
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const [newQuestion, setNewQuestion] = useState("");
  const { colorMode } = useColorMode();

  const roomId = params.id;
  const { questions, title } = useRoom(roomId);

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

  async function handleLikeQuestion(
    questionId: string,
    likeId: string | undefined
  ) {
    if (likeId) {
      await database
        .ref(`rooms/${roomId}/questions/${questionId}/likes/${likeId}`)
        .remove();
    } else {
      await database.ref(`rooms/${roomId}/questions/${questionId}/likes`).push({
        authorId: user?.id,
      });
    }
  }

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
        direction={{ base: "column", md: "row" }}
        gridGap={"0.5rem"}
      >
        <Flex alignSelf={"center"}>
          <Link as={RouterLink} to="/">
            <Logo style={{ maxHeight: "2.875rem" }} />
          </Link>
        </Flex>
        <Flex gridGap={"0.5rem"}>
          <RoomCode code={roomId} />
          <ToggleTheme />
        </Flex>
      </Flex>

      <Box as={"main"} maxW={{ base: "80%", md: "60%" }} margin={"0 auto"}>
        <Flex margin={"2rem 0 1.5rem"} align={"center"}>
          <Heading
            fontSize={"1.5rem"}
            color={colorMode === "light" ? "blackAlpha.800" : "whiteAlpha.800"}
          >
            Sala {title}
          </Heading>
          {questions.length > 0 && (
            <Text
              ml={"1rem"}
              bg={"#e559f9"}
              borderRadius={"lg"}
              p={"0.5rem 1rem"}
              color={
                colorMode === "light" ? "blackAlpha.900" : "whiteAlpha.900"
              }
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
                  color={
                    colorMode === "light" ? "blackAlpha.800" : "whiteAlpha.800"
                  }
                  fontWeight={500}
                  fontSize={"0.875rem"}
                >
                  {user.name}
                </Text>
              </Flex>
            ) : (
              <Text
                fontSize={"0.875rem"}
                color={
                  colorMode === "light" ? "blackAlpha.800" : "whiteAlpha.800"
                }
                fontWeight={500}
              >
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

        <Box mt={"2rem"}>
          {questions.map((question) => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
              >
                <Button
                  aria-label="Like question"
                  type="button"
                  leftIcon={
                    question.likeId ? <FaThumbsUp /> : <FaRegThumbsUp />
                  }
                  border={0}
                  variant={"ghost"}
                  colorScheme={"primaryApp"}
                  color={question.likeId ? "primaryApp.500" : "gray.400"}
                  onClick={() =>
                    handleLikeQuestion(question.id, question.likeId)
                  }
                >
                  {question.likeCount > 0 && question.likeCount}
                </Button>
              </Question>
            );
          })}
        </Box>
      </Box>
    </>
  );
}
