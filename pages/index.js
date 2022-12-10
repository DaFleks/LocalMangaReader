
import fs from 'fs';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Container, Dialog, Typography, AppBar, Box } from '@mui/material';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import HomeIcon from '@mui/icons-material/Home';
import MangaSelection from '../components/MangaSelection';
import MangaThumbnail from '../components/MangaThumbnail';

export default function Home({ mangas }) {
  //  State
  const [currentManga, setCurrentManga] = useState();
  const [currentChapter, setCurrentChapter] = useState();
  const [isReading, setIsReading] = useState(false);

  //  Toggle Functions
  const toggleCurrentManga = (id) => {
    setCurrentManga(mangas.find(manga => manga.id === id));
  }

  const toggleReadChapter = (idx) => {
    setCurrentChapter(currentManga.chapters[idx]);
    setIsReading(true);
  }

  //  Cover getters
  const getSeriesCover = (series) => `${series.title}/${series.chapters[0].chapter}/${series.chapters[0].pages[0]}`;
  const getChapterCover = (currentManga, idx) => `${currentManga.title}/${currentManga.chapters[idx].chapter}/${currentManga.chapters[idx].pages[0]}`

  return (
    <Box sx={{ backgroundColor: '#444' }}>
      <AppBar position="fixed" sx={{ backgroundColor: '#222', py: 3 }}>
        <Container sx={{ display: 'flex', alignItems: 'center' }}>
          {currentManga ? <ArrowLeftIcon onClick={() => setCurrentManga()} /> : <HomeIcon />}
          <Typography variant="h5" sx={{ ml: 1 }}>{currentManga ? currentManga.title : 'Local Manga'}</Typography>
        </Container>
      </AppBar>
      <Container maxWidth="lg" sx={{ backgroundColor: '#666', minHeight: '100vh', pt: 12, pb: 2 }}>
        <MangaSelection>
          {!currentManga &&
            mangas.map((manga) =>
              <MangaThumbnail key={manga.id} id={manga.id} title={manga.title} cover={getSeriesCover(manga)}
                count={manga.nChapters} toggleCurrentManga={toggleCurrentManga} />)}
          {currentManga &&
            currentManga.chapters.map((chapter, idx) =>
              <MangaThumbnail key={idx} idx={idx} isChapter={true} toggleReadChapter={toggleReadChapter} count={chapter.chapter}
                cover={getChapterCover(currentManga, idx)} />)}
        </MangaSelection>
      </Container>
      {isReading &&
        <Dialog open={isReading} fullScreen={true}>
          <Container disableGutters maxWidth="md" sx={{ background: 'black' }}>
            {currentChapter.pages.map(page =>
              <img width="100%" src={`./manga/${currentManga.title}/${currentChapter.chapter}/${page}`} />
            )}
          </Container>
          <AppBar position="sticky" sx={{ bottom: '0', py: 1, backgroundColor: '#222' }}>
            <Container maxWidth="md" sx={{ textAlign: 'center' }}>
              <Typography variant="h6" onClick={() => setIsReading(false)}>{currentChapter.chapter} - Go Back</Typography>
            </Container>
          </AppBar>
        </Dialog>}
    </Box>
  )
}

export const getStaticProps = async () => {
  //  Path where all manga is stored.
  const MANGA_PATH = './public/manga/';

  //  Array to hold each manga object extracted from the path.
  let mangas = [];

  //  Read through every Manga title.
  fs.readdirSync(MANGA_PATH).forEach((title) => {
    //  Array to store chapter objects.
    let chapters = [];

    //  Scan into each Manga folder and grab the chapters.
    fs.readdirSync(`${MANGA_PATH}${title}`).forEach((chapter) => {
      let pages = [];

      //  Scan into each Chapter folder and grab the image files within.
      fs.readdirSync(`${MANGA_PATH}${title}/${chapter}`).forEach((page) => {
        pages.push(page);
      })

      //  Each completed chapter is pushed with the chapter number followed by the pages array.
      chapters.push({ chapter, pages });
    })

    //  For each title scanned, push the data into the Manga array along with a generated ID.
    mangas.push({ id: uuid(), title: title, chapters: chapters, nChapters: chapters.length });
  });

  return {
    props: { mangas },
  };
};
