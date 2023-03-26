import { css } from "styled-components";

export const mobile = (props) => {
  return css`
    @media only screen and (max-width: 480px) {
      ${props}
    }
  `;
};

export const isMobile = () => {
  return window.screen.width <= 600 ? true : false;
};