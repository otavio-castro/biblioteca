import * as Styled from "./index.style.ts";
import Header from '../header';
import Footer from '../footer';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => (
  <Styled.Wrapper>
    <Header />
    <Styled.Main>{children}</Styled.Main>
    <Footer />
  </Styled.Wrapper>
);

export default Layout;
