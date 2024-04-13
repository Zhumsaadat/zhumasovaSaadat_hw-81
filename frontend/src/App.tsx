import { useState } from 'react';
import { Button, Card, CardContent, Container, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';


function App() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("")

  const shortingUrl = async (e) => {
      e.preventDefault();
      try{
          const response = await axios.post('')
      }
  }

    return (
      <Container maxWidth="sm">
          <form onSubmit={shortingUrl}>
              <Grid container spacing={2} justifyContent="center"  sx={{ my: 2 }} alignItems="center">
                  <Grid item xs={8}>
                      <TextField
                          id="outlined-basic"
                          label="Введите ссылку"
                          variant="outlined"
                          type= "text"
                          value={originalUrl}
                          onChange={(e) => setOriginalUrl(e.target.value)}
                      />
                  </Grid>
                  <Grid item xs={6}>
                      <Button type='submit' variant="outlined">Отправить</Button>
                  </Grid>

              </Grid>
          </form>

          <Card sx={{ minWidth: 275 }} sx={{ mt: 5 }}>
              <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      You link now looks like this:
                  </Typography>
                  <Typography>
                      <a href="#">dfghj</a>
                  </Typography>
              </CardContent>
          </Card>
      </Container>

  )
}

export default App
