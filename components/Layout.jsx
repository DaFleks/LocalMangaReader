import { Box, AppBar, Container, Typography } from "@mui/material";
import MenuBookIcon from '@mui/icons-material/MenuBook';

const Layout = ({ children }) => {
  const wrapper = {
    background: "linear-gradient(to top, #243B55, #141E30)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
    fallbacks: [
      { background: "#141E30" } /* fallback for old browsers */,
      { background: "-webkit-linear-gradient(to top, #243B55, #141E30)" /* Chrome 10-25, Safari 5.1-6 */ },
    ],
    minHeight: "100vh",

    display: "flex",
    flexDirection: "column",
    minWidth: '300px'
  };

  return (
    <Box sx={wrapper}>
      <AppBar position="sticky" sx={{ backgroundColor: "#030311", py: 2 }}>
        <Container sx={{ display: "flex", alignItems: "center" }}>
          <MenuBookIcon />
          <Typography variant="h5" sx={{ ml: 1 }}>
            Local Manga Reader
          </Typography>
        </Container>
      </AppBar>
      {children}
    </Box>
  );
};

export default Layout;


