import { IconButton, useColorMode } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

type ToggleThemeProps = {
  variant?: string
}

export function ToggleTheme({ variant = 'solid' }: ToggleThemeProps) {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      aria-label="Toggle Theme"
      icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
      onClick={toggleColorMode}
      variant={variant}
      colorScheme={"primaryApp"}
      borderColor={colorMode === "light" ? "black" : "white"}
      borderRadius={"md"}
    />
  );
}
