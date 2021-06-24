import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  useColorMode,
  useDisclosure,
  Icon,
  useToast,
  LightMode,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaRegTimesCircle, FaRegTrashAlt } from "react-icons/fa";
import { useHistory, useParams } from "react-router-dom";
import { Logo } from "src/components/Logo";
import { Question } from "src/components/Question";
import { RoomCode } from "src/components/RoomCode";
import { ToggleTheme } from "src/components/ToggleTheme";
// import { useAuth } from "src/hooks/useAuth";
import { useRoom } from "src/hooks/useRoom";
import { database } from "src/services/firebase";
import { Link as RouterLink } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "src/hooks/useAuth";

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const [question, setQuestion] = useState("");
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalContent, setModalContent] = useState<
    "deleteQuestion" | "endRoom" | undefined
  >();
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const history = useHistory();

  const roomId = params.id;
  const { questions, title, authorId } = useRoom(roomId);

  useEffect(() => {
    if (authorId !== user?.id) {
      history.push("/unauthorized");
    }
  }, [authorId, history, user?.id]);

  async function handleDeleteQuestion(questionId: string) {
    setModalContent("deleteQuestion");
    setQuestion(questionId);
    onOpen();
  }

  async function handleConfirmDeleteQuestion() {
    try {
      await database.ref(`rooms/${roomId}/questions/${question}`).remove();
      toast({
        description: "Pergunta excluída com sucesso.",
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      toast({
        description: error.message,
        status: "error",
        isClosable: true,
      });
    }
    setQuestion("");
    onClose();
  }

  async function handleEndRoom() {
    setModalContent("endRoom");
    onOpen();
  }

  async function handleConfirmEndRoom() {
    try {
      await database.ref(`rooms/${roomId}`).update({
        closedAt: new Date(),
      });
      toast({
        description: "Sala encerrada com sucesso.",
        status: "success",
        isClosable: true,
      });
      history.push("/");
    } catch (error) {
      toast({
        description: error.message,
        status: "error",
        isClosable: true,
      });
    }
    onClose();
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
        <Flex gridGap={"0.5rem"} direction={{ base: "column", md: "row" }}>
          <RoomCode code={roomId} />
          <Flex gridGap={"0.5rem"}>
            <Button
              colorScheme={"primaryApp"}
              variant={"outline"}
              flex={1}
              onClick={handleEndRoom}
            >
              Encerrar Sala
            </Button>
            <ToggleTheme />
          </Flex>
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

        <Box mt={"2rem"}>
          {questions.map((question) => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
              >
                <IconButton
                  aria-label="Delete question"
                  type="button"
                  icon={<FaRegTrashAlt />}
                  border={0}
                  variant={"ghost"}
                  colorScheme={"primaryApp"}
                  color={"gray.400"}
                  _hover={{ color: "danger.500" }}
                  onClick={() => handleDeleteQuestion(question.id)}
                />
              </Question>
            );
          })}
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size={"md"} isCentered>
        <ModalOverlay />
        {modalContent === "deleteQuestion" && (
          <ModalContent borderRadius={"0.5rem"} py={"2rem"}>
            <Flex
              as={ModalBody}
              justify={"center"}
              align={"center"}
              pb={"2rem"}
              direction={"column"}
              gridGap={"2rem"}
            >
              <Icon color={"danger.500"} boxSize={"3rem"} as={FaRegTrashAlt} />
              <Heading
                fontSize={"1.5rem"}
                color={
                  colorMode === "light" ? "blackAlpha.800" : "whiteAlpha.800"
                }
              >
                Excluir pergunta
              </Heading>
              <Text color={"gray.500"}>
                Tem certeza que você deseja excluir esta pergunta?
              </Text>
            </Flex>

            <Flex as={ModalFooter} justify={"center"} align={"center"}>
              <ButtonGroup gridGap={"0.5rem"}>
                <Button
                  variant={"solid"}
                  colorScheme={"gray"}
                  onClick={onClose}
                  size="lg"
                  color={"blackAlpha.600"}
                >
                  Cancelar
                </Button>
                <LightMode>
                  <Button
                    variant="solid"
                    colorScheme={"danger"}
                    fontWeight={"medium"}
                    size="lg"
                    onClick={handleConfirmDeleteQuestion}
                  >
                    Sim, encerrar
                  </Button>
                </LightMode>
              </ButtonGroup>
            </Flex>
          </ModalContent>
        )}

        {modalContent === "endRoom" && (
          <ModalContent borderRadius={"0.5rem"} py={"2rem"}>
            <Flex
              as={ModalBody}
              justify={"center"}
              align={"center"}
              pb={"2rem"}
              direction={"column"}
              gridGap={"2rem"}
            >
              <Icon
                color={"danger.500"}
                boxSize={"3rem"}
                as={FaRegTimesCircle}
              />
              <Heading
                fontSize={"1.5rem"}
                color={
                  colorMode === "light" ? "blackAlpha.800" : "whiteAlpha.800"
                }
              >
                Encerrar sala
              </Heading>
              <Text color={"gray.500"}>
                Tem certeza que você deseja encerrar esta sala?
              </Text>
            </Flex>

            <Flex as={ModalFooter} justify={"center"} align={"center"}>
              <ButtonGroup gridGap={"0.5rem"}>
                <Button
                  variant={"solid"}
                  colorScheme={"gray"}
                  onClick={onClose}
                  size="lg"
                  color={"blackAlpha.600"}
                >
                  Cancelar
                </Button>
                <LightMode>
                  <Button
                    variant="solid"
                    colorScheme={"danger"}
                    fontWeight={"medium"}
                    size="lg"
                    onClick={handleConfirmEndRoom}
                  >
                    Sim, encerrar
                  </Button>
                </LightMode>
              </ButtonGroup>
            </Flex>
          </ModalContent>
        )}
      </Modal>
    </>
  );
}
