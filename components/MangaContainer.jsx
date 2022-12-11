import { Container, Paper } from "@mui/material";

const MangaContainer = ({ children }) => {
  return (
    <Container maxWidth="lg" sx={{ backgroundColor: "#2e4052", boxShadow: 6, py: 3, flexGrow: 1 }}>
      {children}
    </Container>
  );
};

export default MangaContainer;
