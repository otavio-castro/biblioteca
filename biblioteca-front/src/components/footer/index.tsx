import * as Styled from "./index.style.ts";

const Footer = () => (
  <Styled.FooterBar>
    <Styled.Text>📚 BookStack — {new Date().getFullYear()}</Styled.Text>
  </Styled.FooterBar>
);

export default Footer;
