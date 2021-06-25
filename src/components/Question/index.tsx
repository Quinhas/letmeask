import {
  Box,
  Flex,
  Text,
  useColorMode,
  Avatar,
  useStyleConfig,
} from "@chakra-ui/react";
import { ReactNode } from "react";

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
  variant?: string;
};

export function Question({
  content,
  author,
  children,
  variant,
}: QuestionProps) {
  const { colorMode } = useColorMode();
  const styles = useStyleConfig("Question", { variant });
  return (
    <Box
      __css={styles}
      className={"question"}
      sx={{ "& + .question": { marginTop: "0.5rem" } }}
    >
      <Text color={colorMode === "light" ? "blackAlpha.900" : "whiteAlpha.900"}>
        {content}
      </Text>
      <Flex
        as={"footer"}
        justify={"space-between"}
        align={{ base: "flex-end", md: "center" }}
        mt={"1.5rem"}
      >
        <Flex align={"center"}>
          <Avatar
            boxSize={"2rem"}
            borderRadius={"50%"}
            src={author.avatar}
            alt={author.name}
            bg={"primaryApp.600"}
          />
          <Text
            ml={"0.5rem"}
            color={colorMode === "light" ? "blackAlpha.600" : "whiteAlpha.600"}
            fontSize={"0.875rem"}
          >
            {author.name}
          </Text>
        </Flex>
        <Flex>{children}</Flex>
      </Flex>
    </Box>
  );
}
