import styled, { createGlobalStyle } from "styled-components";

export const colors = {
  primaryGreen: "#4C763B",
  mutedGreen: "#d7f0c7",
  black: "#000000",
  white: "#FFFFFF",
  lightGray: "#E0E0E0",
  lightBlue: "#D4DBEB",
  navyBlue: "#2C4D82",
  brandTeal: "#00918D",
  mutedTeal: "#cde9e8",
};

// primaryGreen: "#2F7A58",
//   mutedGreen: "#DDF5E8",
//   black: "#000000",
//   white: "#FFFFFF",
//   lightGray: "#E0E0E0",
// };

// primaryGreen: "#38744D",
// mutedGreen: "#d7f0c7",

export const gridConfig = {
  columns: 12,
  margin: 50,
  gutter: 10,
  maxWidth: 1440,
};

export const GridOverlay = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "visible",
})`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  pointer-events: none;
  z-index: 9999;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  display: ${(props) => (props.visible ? "block" : "none")};
  transition: opacity 0.3s ease;

  .grid-container {
    max-width: ${gridConfig.maxWidth}px;
    margin: 0 auto;
    height: 100%;
    padding: 0 ${gridConfig.margin}px;
    display: flex;
    gap: ${gridConfig.gutter}px;

    @media (min-width: 1600px) {
      max-width: 1800px;
    }

    @media (max-width: 768px) {
      padding: 0 20px;
    }

    @media (max-width: 480px) {
      padding: 0 16px;
    }
  }

  .grid-column {
    flex: 1;
    background: rgba(128, 128, 128, 0.03);
    border-left: 1px solid rgba(128, 128, 128, 0.1);
    border-right: 1px solid rgba(128, 128, 128, 0.1);

    &:first-child {
      border-left: none;
    }

    &:last-child {
      border-right: none;
    }
  }
`;

export const GlobalStyle = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: ${colors.black};
    background-color: ${colors.white};
    overflow-x: hidden;
  }

  #root {
    min-height: 100vh;
    width: 100%;
    position: relative;
  }

  h1 {
    font-family: 'Big Shoulders', sans-serif;
    font-size: 48px;
    color: ${colors.black};

    @media (min-width: 1600px) {
      font-size: 58px;
    }

    @media (max-width: 1024px) {
      font-size: 40px;
    }

    @media (max-width: 768px) {
      font-size: 32px;
      margin-bottom: 24px;
    }

    @media (max-width: 480px) {
      font-size: 24px;
      margin-bottom: 20px;
    }
  }

  p {
    font-size: 16px;
    line-height: 1.5;

    @media (min-width: 1600px) {
      font-size: 18px;
    }
  }
`;

export const GridContainer = styled.div`
  width: 100%;
  max-width: ${gridConfig.maxWidth}px;
  margin: 0 auto;
  padding: 0 ${gridConfig.margin}px;

  @media (min-width: 1600px) {
    max-width: 1800px;
  }

  @media (max-width: 768px) {
    padding: 0 20px;
  }

  @media (max-width: 480px) {
    padding: 0 16px;
  }
`;

export const GridRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -${gridConfig.gutter / 2}px;
`;

export const GridColumn = styled.div`
  padding: 0 ${gridConfig.gutter / 2}px;
  flex: 0 0 ${(props) => (props.cols / gridConfig.columns) * 100}%;
  max-width: ${(props) => (props.cols / gridConfig.columns) * 100}%;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  @media (max-width: 1024px) {
    ${(props) =>
      props.mobileCols !== undefined
        ? `
      flex: 0 0 ${
        props.mobileCols === 0
          ? "0%"
          : `${(props.mobileCols / gridConfig.columns) * 100}%`
      };
      max-width: ${
        props.mobileCols === 0
          ? "0%"
          : `${(props.mobileCols / gridConfig.columns) * 100}%`
      };
      ${props.mobileCols === 0 ? "display: none;" : ""}
    `
        : ""}
  }

  @media (max-width: 768px) {
    ${(props) =>
      props.mobileCols !== undefined
        ? `
      flex: 0 0 ${
        props.mobileCols === 0
          ? "0%"
          : `${(props.mobileCols / gridConfig.columns) * 100}%`
      };
      max-width: ${
        props.mobileCols === 0
          ? "0%"
          : `${(props.mobileCols / gridConfig.columns) * 100}%`
      };
      ${props.mobileCols === 0 ? "display: none;" : ""}
    `
        : `
      flex: 0 0
        ${
          props.cols >= 6
            ? "100%"
            : `${(props.cols / gridConfig.columns) * 100}%`
        };
      max-width: ${
        props.cols >= 6 ? "100%" : `${(props.cols / gridConfig.columns) * 100}%`
      };
    `}
  }

  @media (max-width: 480px) {
    ${(props) =>
      props.mobileCols !== undefined && props.mobileCols === 0
        ? "display: none;"
        : `
      flex: 0 0 100%;
      max-width: 100%;
    `}
  }
`;

export const GridToggleButton = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 12px;
  cursor: pointer;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  border: 1px solid red;
  opacity: 0;
  background-color: red;
  color: white;

  &:hover {
    opacity: 1;
  }

  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
    font-size: 10px;
    top: 15px;
    right: 15px;
  }
`;
