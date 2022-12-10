import { Box, AppBar, Container, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

const Layout = ({ children }) => {
  const wrapper = {
    background: "linear-gradient(to top, #0f0c29, #302b63, #24243e)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
    fallbacks: [
      { background: "#0f0c29" } /* fallback for old browsers */,
      { background: "-webkit-linear-gradient(to top, #0f0c29, #302b63, #24243e)" /* Chrome 10-25, Safari 5.1-6 */ },
    ],
    minHeight: '100vh',
    display: 'flex'
  };

  return (
    <Box sx={wrapper}>
      {/* <AppBar position="fixed" sx={{ backgroundColor: "#222", py: 2 }}>
        <Container sx={{ display: "flex", alignItems: "center" }}>
          <HomeIcon />
          <Typography variant="h5" sx={{ ml: 1 }}>
            Local Manga
          </Typography>
        </Container>
      </AppBar> */}
      {children}
    </Box>
  );
};

export default Layout;
