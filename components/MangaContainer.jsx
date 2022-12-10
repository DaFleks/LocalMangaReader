import { Container } from "@mui/material";

const MangaContainer = ({ children }) => {
  return (
    <Container maxWidth="lg" sx={{py: 3}}>
      {children}
    </Container>
  );
};

export default MangaContainer;