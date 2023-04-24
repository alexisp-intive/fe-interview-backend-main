import { Box, Container, Stack } from "@mui/material";
import styled from "@emotion/styled";

const Header = styled.header`
  display: grid;
  place-items: center;
  min-height: 5rem;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.09);
`;

const Footer = styled.footer`
  min-height: 4rem;
  background-color: #1e2549;
  color: #fff;
  display: grid;
  place-items: center;
`;

const ContainerLogo = styled(Container)`
  display: flex;
  align-content: center;
`;

export function Layout({ children }) {
  return (
    <Stack justifyContent="stretch" minHeight="100vh">
      <Header>
        <ContainerLogo>
          <img src="/logo.svg" alt="brightwheel logo" width="209" height="34" />
        </ContainerLogo>
      </Header>
      <Box component="main" flex={1} pt={4}>
        <Container>{children}</Container>
      </Box>
      <Footer>© 2023 Brightwheel - All rights reserved</Footer>
    </Stack>
  );
}
