import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    red: "#d63031";
    black: {
      lighter: "#636e72";
      darker: "#2d3436";
      veryDark: "black";
    };
    white: {
      darker: "#b2bec3";
      lighter: "#dfe6e9";
    };
  }
}
