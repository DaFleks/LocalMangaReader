import { Grid, Card, CardMedia, CardContent, Typography, CardActions, Button, Divider } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const MangaThumbnail = ({ id, idx, title, cover, count, toggleCurrentManga, toggleReadChapter, isChapter }) => {
  const MANGA_PATH = "./manga/";

  const theme = createTheme();

  theme.typography.h6 = {
    fontSize: "1.0rem",
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.25rem",
    },
  };

  const handleCurrentManga = () => {
    toggleCurrentManga(id);
  };

  const handleCurrentChapter = () => {
    toggleReadChapter(idx);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid item xs={6} sm={4} lg={3} xl={3}>
        <Card sx={{ border: "1px solid #ddd" }}>
          <CardMedia
            component="img"
            image={`${MANGA_PATH}${cover}`}
            alt="Cover"
            sx={{ objectFit: "contain", objectPosition: "top", maxHeight: "12rem" }}
          />
          <Divider color="#ddd" sx={{ mt: 1 }} />
          <CardContent sx={{ minHeight: !isChapter && "9rem" }}>
            <Typography gutterBottom variant="h6" component="div">
              {title}
            </Typography>
            {isChapter ? (
              <Typography variant="body2" color="text.secondary">
                Chapter {count}
              </Typography>
            ) : (
              <Typography variant="body2" color="text.secondary">
                {count} {count > 1 ? "Chapters" : "Chapter"}
              </Typography>
            )}
          </CardContent>
          <CardActions>
            <Button
              sx={{ fontWeight: "bold" }}
              fullWidth={true}
              onClick={isChapter ? handleCurrentChapter : handleCurrentManga}
              size="small"
              variant="contained"
              color="primary"
            >
              Read Now
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </ThemeProvider>
  );
};

export default MangaThumbnail;
