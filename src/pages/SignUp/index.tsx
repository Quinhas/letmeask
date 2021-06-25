import { Flex } from "@chakra-ui/react";
import { Logo } from "src/components/Logo";
import { Aside } from "src/components/Aside";
import { SignUpForm } from "src/components/SignUpForm";

export function SignUp() {
  return (
    <Flex
      align={"stretch"}
      h={"100vh"}
      direction={{ base: "column-reverse", md: "row" }}
    >
      <Aside />
      <Flex flex={8} m={"2rem"} align={"center"} justify={"center"}>
        <Flex
          className="main-content"
          direction={"column"}
          w={"100%"}
          maxW={"21rem"}
          align={"stretch"}
          textAlign={"center"}
          gridGap={"1rem"}
        >
          <Flex alignSelf={"center"}>
            <Logo />
          </Flex>
          <SignUpForm />
        </Flex>
      </Flex>
    </Flex>
  );
}
