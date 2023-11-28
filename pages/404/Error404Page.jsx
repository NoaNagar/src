import { Box, Button, Container, Typography, Img } from "@mui/material";
import Grid from "@mui/material/Grid";
//created by Anna
const Error404Page = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <img
              src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?size=626&ext=jpg&ga=GA1.1.433117207.1684238192&semt=sph"
              alt="404"
            />
          </Grid>
          <Grid item xs={12}></Grid>
          <Button variant="outlined" href="/" sx={{ ml: 2 }}>
            Back Home
          </Button>
        </Grid>
      </Container>
    </Box>
  );
};
export default Error404Page;
