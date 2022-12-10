
import MangaSelection from '../components/MangaSelection';
import MangaThumbnail from '../components/MangaThumbnail';
import Layout from '../components/Layout';
import MangaContainer from '../components/MangaContainer';
import * as mangas from '../mangas.json';

export default function Home() {
  //  Cover getters
  const getMangaCover = (manga) => `${manga.title}/${manga.chapters[0].chapter}/${manga.chapters[0].pages[0]}`;

  return (
    <Layout>
      <MangaContainer>
        <MangaSelection>
          {mangas.map((manga) =>
            <MangaThumbnail
              key={manga.id}
              id={manga.id}
              cover={getMangaCover(manga)}
              title={manga.title}
              count={manga.chapters.length}
              isChapter={false}
            />)}
        </MangaSelection>
      </MangaContainer>
    </Layout>
  )
}