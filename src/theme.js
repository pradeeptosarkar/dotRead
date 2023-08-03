import { theme } from "@primer/react";
import deepmerge from "deepmerge"

const customTheme = deepmerge(theme, {
    colorSchemes: {
      light: {
        colors: {
          text: {
            primary: "#fff",
            secondary: "#000"
          },
          bg: {
            primary: "#19815b",
            secondary: "transparent",
            default: "#fff"
          },
          outline: {
            default: "red"
          }
        },
      },
      dark: {
        colors: {
          text: {
            primary: "#000",
            secondary: "#fff"
          },
          bg: {
            primary: "#fff",
            secondary: "#fff",
            default: "#000"
          },
          outline: {
            default: "gold"
          }
        },
      },
    },
    fontWeight: {
      light: 300,
      normal: 400,
      semibold: 500,
      bold: 600,
    },

    
    fontSizes: {
      0: "12px",
      1: "14px",
      2: "16px",
      3: "20px",
      4: "24px",
      5: "32px",
      6: "40px",
      7: "48px",
    },
  });

  export {
    customTheme
  }