export const scrollbar = {
  "::-webkit-scrollbar": {
    width: "8px",
    height: "8px",
  },
  "::-webkit-scrollbar-track": {
    backgroundColor: "gray.300",
    borderRadius: "10px",
  },
  "::-webkit-scrollbar-thumb": {
    backgroundColor: "blackAlpha.400",
    borderRadius: "10px",
  },
  "::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "blackAlpha.500",
    borderRadius: "10px",
  },
  "::-webkit-scrollbar-thumb:active": {
    backgroundColor: "blackAlpha.600",
    borderRadius: "10px",
  },
};

export const mediaQueries = {
  "@media (min-width: 1361px) and (max-width: 1440px)": {
    html: {
      fontSize: "97.5%",
    },
  },

  "@media (max-width: 1360px)": {
    html: {
      fontSize: "85%",
    },
  },

  "@media (max-width: 1080px)": {
    html: {
      fontSize: "93.75%",
    },
  },

  "@media (max-width: 720px)": {
    html: {
      fontSize: "87.5%",
    },
  },
};
