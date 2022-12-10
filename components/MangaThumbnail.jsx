import { Grid, Paper, Link, Typography } from "@mui/material";

const MangaThumbnail = ({ id, idx, title, cover, count, toggleCurrentManga, toggleReadChapter, isChapter }) => {
  const MANGA_PATH = "./manga/";

  const handleCurrentManga = () => {
    toggleCurrentManga(id);
  };

  const handleCurrentChapter = () => {
    toggleReadChapter(idx);
  };

  return (
    <Grid item xs={12} sm={4} md={3}>
      <Paper variant="elevation" elevation={12} sx={{ display: "flex" }} onClick={!isChapter ? handleCurrentManga : handleCurrentChapter}>
        <img src={`${MANGA_PATH}${cover}`} alt={title} width="100%" style={{ objectFit: "cover", height: "25rem" }} />
      </Paper>
      <Link
        underline="hover"
        href="#"
        variant="body1"
        onClick={!isChapter ? handleCurrentManga : handleCurrentChapter}
        mt={2}
        ml={0.5}
        sx={{ fontWeight: "bold", color: "#8dfc68", display: "block" }}
      >
        {title}
      </Link>
      <Typography onClick={isChapter && handleCurrentChapter} variant="body2" ml={0.5} sx={{ fontWeight: "bold", color: "#bbb" }}>
        {!isChapter ? `${count} chapters` : `${count}`}
      </Typography>
    </Grid>
  );
};

export default MangaThumbnail;
