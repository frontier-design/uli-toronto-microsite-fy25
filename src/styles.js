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
