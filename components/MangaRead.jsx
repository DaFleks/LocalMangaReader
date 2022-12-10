import { AppBar, Dialog, Container, Box, Typography, useScrollTrigger } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const MangaRead = ({ title, currentChapter, isReading, setIsReading }) => {
  const PAGE_PATH = currentChapter ? `./manga/${title}/${currentChapter.chapter}/` : "";
  const handleIsReading = () => {
    setIsReading(!isReading);
  };

  return (
    <Dialog fullScreen open={isReading}>
      {currentChapter && (
        <>
          <AppBar position="sticky" sx={{ py: 2, backgroundColor: "#222" }}>
            <Container sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Typography variant="h6">{currentChapter.chapter}</Typography>
              <CloseIcon onClick={handleIsReading} />
            </Container>
          </AppBar>

          <Container maxWidth="md" sx={{ backgroundColor: "#444", py: 3 }}>
            {currentChapter &&
              currentChapter.pages.map((page, idx) => (
                <Box key={`${page}--${idx}`} id={`${idx}--${page}`}>
                  <img width="100%" src={`${PAGE_PATH}/${page}`} alt={page} />
                </Box>
              ))}
          </Container>

          <AppBar position="sticky" sx={{ bottom: "0%", py: 2, backgroundColor: "#222", textAlign: 'center' }}>
            <Typography variant="h6">TODO: Pg Nums</Typography>
          </AppBar>
        </>
      )}
    </Dialog>
  );
};

export default MangaRead;
