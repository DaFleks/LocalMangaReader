import { Grid } from "@mui/material";

const MangaSelection = ({ children }) => {
  return (
    <Grid container spacing={2}>
      {children}
    </Grid>
  );
};

export default MangaSelection;
