import { useState } from "react";
import Layout from "../components/Layout";
import MangaContainer from "../components/MangaContainer";
import MangaSelection from "../components/MangaSelection";
import MangaThumbnail from "../components/MangaThumbnail";
import MangaRead from "../components/MangaRead";
import MangaBreadcrumbs from "../components/MangaBreadcrumbs";
import mangas from "../mangas.json";

export const getStaticPaths = async () => {
  const paths = mangas.map((manga) => {
    return {
      params: { id: manga.id },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const manga = mangas.find((manga) => manga.id === id);

  return {
    props: { manga },
  };
};

const Manga = ({ manga }) => {
  //  State
  const [currentChapter, setCurrentChapter] = useState();
  const [isReading, setIsReading] = useState(false);

  //  Helpers
  const getChapterCover = (chapter) => `${manga.title}/${chapter.chapter}/${chapter.pages[0]}`;
  const readChapter = (idx) => {
    setCurrentChapter(manga.chapters[idx]);
    setIsReading(true);
  };

  return (
    <>
      <Layout>
        <MangaContainer>
          <MangaBreadcrumbs title={manga.title} />
          <MangaSelection>
            {manga.chapters.map((chapter, idx) => (
              <MangaThumbnail
                key={idx}
                idx={idx}
                isChapter={true}
                cover={getChapterCover(chapter)}
                title={chapter.chapter}
                count={chapter.pages.length}
                readChapter={readChapter}
              />
            ))}
          </MangaSelection>
        </MangaContainer>
      </Layout>
      <MangaRead title={manga.title} currentChapter={currentChapter} isReading={isReading} setIsReading={setIsReading} />
    </>
  );
};

export default Manga;
