
import { useState } from 'react';
import { Container, Dialog, Typography, Button } from '@mui/material';
import fs from 'fs';
import { v4 as uuid } from 'uuid';
import MangaSelection from '../components/MangaSelection';
import MangaThumbnail from '../components/MangaThumbnail';
import { Box } from '@mui/system';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import HomeIcon from '@mui/icons-material/Home';

export default function Home({ mangas }) {
  const [currentManga, setCurrentManga] = useState();
  const [currentChapter, setCurrentChapter] = useState();
  const [isReading, setIsReading] = useState(false);

  const toggleCurrentManga = (id) => {
    setCurrentManga(mangas.find(manga => manga.id === id));
  }

  const toggleReadChapter = (idx) => {
    setCurrentChapter(currentManga.chapters[idx]);
    setIsReading(true);
  }

  return (
    <>
      <Container maxWidth="lg" sx={{ backgroundColor: '#ddd', minHeight: '100vh', py: 2 }}>
        <Box pb={2} sx={{ color: '#c26b00', display: 'flex', alignItems: 'center' }}>
          {currentManga ? <ArrowLeftIcon onClick={() => setCurrentManga()} /> : <HomeIcon />}
          <Typography variant="h5" sx={{ ml: 1 }}>{currentManga ? currentManga.title : 'Home'}</Typography>
        </Box>
        <MangaSelection>
          {!currentManga &&
            mangas.map((manga) =>
              <>
                <MangaThumbnail cover={manga.cover} key={manga.id} id={manga.id} title={manga.title}
                  count={manga.chapterCount} toggleCurrentManga={toggleCurrentManga} />
              </>
            )
          }
          {currentManga &&
            <>
              {currentManga.chapters.map((chapter, idx) =>
                <MangaThumbnail isChapter={true} idx={idx} toggleReadChapter={toggleReadChapter} count={idx + 1}
                  cover={`${currentManga.title}/${chapter.chapterNum}/${chapter.pages[0]}`} />)}
            </>
          }
        </MangaSelection>
      </Container>
      {
        isReading &&
        <Dialog open={isReading} fullScreen={true}>
          {currentChapter.pages.map(page => <img src={`./manga/${currentManga.title}/${currentChapter.chapterNum}/${page}`} />)}
          <Box p={1} color="#c26b00" sx={{ position: 'sticky', bottom: 0, backgroundColor: '#444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ArrowLeftIcon />
            <Typography onClick={() => setIsReading(false)} variant="h4">
              Go Back
            </Typography>
          </Box>
        </Dialog>
      }
    </>
  )
}

export const getStaticProps = async () => {
  let mangas = [];
  //  Folder names are manga titles
  fs.readdirSync("./public/manga").forEach((title) => {
    mangas.push({ id: uuid(), title: title });
  });

  mangas.forEach((manga) => {
    manga.chapterCount = fs.readdirSync(`./public/manga/${manga.title}`).length;
    let chapters = [];

    fs.readdirSync(`./public/manga/${manga.title}`).forEach((chapter, idx) => {
      chapters.push({ chapterNum: chapter, pages: [] });
      manga.chapters = chapters;

      let pages = [];
      fs.readdirSync(`./public/manga/${manga.title}/${chapter}`).forEach((page, idx) => {
        pages.push(page);
      })
      manga.chapters[idx].pages = pages;
    })

    manga.cover = `${manga.title}/${manga.chapters[0].chapterNum}/${manga.chapters[0].pages[0]}`;
  })


  return {
    props: { mangas },
  };
};
