import { Breadcrumbs, Link, Typography } from "@mui/material";

const MangaBreadcrumbs = ({title}) => {
  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3, color: "#FFBF00", fontWeight: "bold" }}>
      <Link underline="hover" color="inherit" href="/">
        Home
      </Link>
      <Typography fontWeight="bold">{title}</Typography>
    </Breadcrumbs>
  );
};

export default MangaBreadcrumbs;