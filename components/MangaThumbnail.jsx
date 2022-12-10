import { Grid, Paper, Link, Typography } from "@mui/material";

const MangaThumbnail = ({ id, idx, title, cover, count, readChapter, isChapter }) => {
  const MANGA_PATH = "./manga/";

  const handleCurrentChapter = () => {
    readChapter(idx);
  };

  const strShort = (str) => (str.length > 28 ? str.substr(0, 28) + "..." : str);

  return (
    <Grid item xs={12} sm={4} md={3}>
      <Link href={isChapter ? "javascript:void(0)" : id} onClick={isChapter ? handleCurrentChapter : () => {}}>
        <Paper variant="elevation" elevation={12} sx={{ display: "flex" }}>
          <img src={`${MANGA_PATH}${cover}`} alt={title} width="100%" style={{ objectFit: "cover", height: "25rem" }} />
        </Paper>
      </Link>

      <Link
        underline="hover"
        href={isChapter ? "javascript:void(0)" : id}
        onClick={isChapter ? handleCurrentChapter : () => {}}
        variant="body1"
        mt={2}
        ml={0.5}
        sx={{ fontWeight: "bold", color: "#FFBF00", display: "block" }}
      >
        {strShort(title)}
      </Link>
      <Typography variant="body2" ml={0.5} sx={{ fontWeight: "bold", color: "#bbb" }}>
        {isChapter ? `${count} pages` : `${count} chapters`}
      </Typography>
    </Grid>
  );
};

export default MangaThumbnail;
