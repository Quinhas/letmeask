import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { mediaQueries, scrollbar } from "./custom";

const theme = extendTheme({
  components: {
    Question: {
      baseStyle: (props) => ({
        background: mode("whiteAlpha.900", "blackAlpha.900")(props),
        borderRadius: "0.5rem",
        boxShadow: "sm",
        boxSizing: 'border-box',
        padding: "1.5rem",
        transition: "0.3s",
      }),
      variants: {
        highlighted: (props) => ({
          border: "3px solid",
          borderColor: "secondaryApp.500",
          transform: "scale(1.02)",
        }),
        answered: (props) => ({
          background: mode("blackAlpha.100", "blackAlpha.600")(props),
        }),
      },
    },
    Button: {
      variants: {
        app: (props) => ({
          height: "3.125rem",
          borderRadius: "0.5rem",
          fontWeight: 500,
          background: "primaryApp.500",
          color: "whiteAlpha.900",
          padding: "0 2rem",
          transition: "filter 0.2s",
          "&:not(:disabled):hover": {
            filter: "brightness(0.9)",
          },
          "&:disabled:hover": {
            background: "primaryApp.500",
            color: "whiteAlpha.900",
          },
        }),
      },
    },
  },
  styles: {
    global: (props) => ({
      a: {
        transition: "color 0.2s",
        color: "complementary.500",
        _hover: {
          color: "complementary.800",
        },
      },
      "*": {
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
      },
      body: {
        background: mode("blackAlpha.100", "blackAlpha.900")(props),
        color: mode("blackAlpha.800", "blackAlpha.200")(props),
      },
      "body, input, button, select, textarea": {
        font: "400 1rem 'Roboto', sans-serif",
      },
      ...mediaQueries,
      ...scrollbar,
    }),
  },
  fonts: {
    body: "Roboto, sans-serif",
    heading: "Poppins, sans-serif",
  },
  colors: {
    primaryApp: {
      "50": "#F0ECF8",
      "100": "#D6CBEC",
      "200": "#BCA9E0",
      "300": "#A187D4",
      "400": "#8765C7",
      "500": "#6D44BB",
      "600": "#573696",
      "700": "#412970",
      "800": "#2C1B4B",
      "900": "#160E25",
    },
    secondaryApp: {
      "50": "#FFE5FE",
      "100": "#FFB8FC",
      "200": "#FF8AFA",
      "300": "#FF5CF8",
      "400": "#FF2EF6",
      "500": "#FF00F4",
      "600": "#CC00C3",
      "700": "#990093",
      "800": "#660062",
      "900": "#330031",
    },
    google: {
      50: "#FDEAE8",
      100: "#F8C3BE",
      200: "#F49C95",
      300: "#F0756B",
      400: "#EB4F42",
      500: "#E72818",
      600: "#B92013",
      700: "#8B180E",
      800: "#5C100A",
      900: "#2E0805",
    },
    danger: {
      50: "#FCE8EC",
      100: "#F7C0C9",
      200: "#F297A7",
      300: "#ED6E85",
      400: "#E84562",
      500: "#E31C40",
      600: "#B51733",
      700: "#881126",
      800: "#5B0B1A",
      900: "#2D060D",
    },
  },
});

export default theme;
