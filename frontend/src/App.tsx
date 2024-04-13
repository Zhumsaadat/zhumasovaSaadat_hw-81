import { useState } from 'react';
import { Button, Card, CardContent, Container, Grid, TextField, Typography } from '@mui/material';
import axiosApi from '../axiosApi';
import { OriginalUrl, UrlAPI } from '../types';
import Spinner from './Spinner/Spinner';


function App() {
  const [originalUrl, setOriginalUrl] = useState<OriginalUrl>({originalUrl: ''});
  const [shortUrl, setShortUrl] = useState<UrlAPI>();
  const [loading, setLoading] = useState(false);

  const shortingUrl = async (e) => {
      e.preventDefault();
      try{
          setLoading(true);
          const response = await axiosApi.post('/shortUrl', {originalUrl: originalUrl});
          setShortUrl(response.data.shortUrl);
      }catch (e){
          console.error(e)
      }finally {
          setLoading(false);
      }
  }

  let shortedUrlContend;

  if(loading) {
     shortedUrlContend =  <Spinner/>
  }else {
      shortedUrlContend = (
      <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              You link now looks like this:
          </Typography>
          <Typography>
              <a href={originalUrl} target="_blank" rel="noopener noreferrer">{`http://localhost:8000/shortUrl/${shortUrl}`}</a>
          </Typography>
      </CardContent>
      )
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
              {shortedUrlContend}
          </Card>
      </Container>

  )
}

export default App
