import { IconButton, useColorMode } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

export function ToggleTheme() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      aria-label="Toggle Theme"
      icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
      onClick={toggleColorMode}
      variant={'solid'}
      colorScheme={'primaryApp'}
      borderColor={colorMode === "light" ? "black" : "white"}
      borderRadius={"md"}
    />
  );
}
