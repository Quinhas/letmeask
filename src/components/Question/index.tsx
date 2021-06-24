import { Box, Flex, Text, Image, useColorMode } from "@chakra-ui/react";
import { ReactNode } from "react";

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
};

export function Question({ content, author, children }: QuestionProps) {
  const { colorMode } = useColorMode();
  return (
    <Box
      bg={colorMode === "light" ? "whiteAlpha.900" : "blackAlpha.900"}
      borderRadius={"0.5rem"}
      boxShadow={"sm"}
      padding={"1.5rem"}
      className={"question"}
      sx={{ "& + .question": { marginTop: "0.5rem" } }}
    >
      <Text color={colorMode === "light" ? "blackAlpha.900" : "whiteAlpha.900"}>
        {content}
      </Text>
      <Flex
        as={"footer"}
        justify={"space-between"}
        align={"center"}
        mt={"1.5rem"}
      >
        <Flex align={"center"}>
          <Image
            boxSize={"2rem"}
            borderRadius={"50%"}
            src={author.avatar}
            alt={author.name}
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
