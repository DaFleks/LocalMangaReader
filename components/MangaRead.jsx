import { useState, useEffect, useRef, useCallback } from "react";
import { AppBar, Dialog, Container, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const MangaRead = ({ title, currentChapter, isReading, setIsReading, setCurrentChapter }) => {
  const PAGE_PATH = currentChapter ? `./manga/${title}/${currentChapter.chapter}/` : "";

  //  State
  const [pagesDisplayed, setPagesDisplayed] = useState([]);

  //  Effects
  useEffect(() => {
    if (isReading) setPagesDisplayed([currentChapter.pages[0]]);
  }, [isReading]);

  //  Refs
  const observer = useRef();

  //  Callbacks
  const lastPageRef = useCallback(
    (node) => {
      if (!isReading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && pagesDisplayed.length < currentChapter.pages.length) {
            setPagesDisplayed((pagesDisplayed) => [...pagesDisplayed, currentChapter.pages[pagesDisplayed.length]]);
          }
        },
        { threshold: 0 }
      );
      if (node) observer.current.observe(node);
    },
    [isReading, pagesDisplayed]
  );

  //  Handlers
  const handleIsReading = () => {
    setIsReading(false);
    setPagesDisplayed([]);
    setCurrentChapter([]);
  };

  return (
    <Dialog fullScreen open={isReading} disablePortal={true} PaperProps={{ style: { display: "flex", background: "#222" } }}>
      {currentChapter && (
        <>
          <AppBar position="sticky" sx={{ py: 2, backgroundColor: "#222" }}>
            <Container sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Typography variant="h6">{currentChapter.chapter}</Typography>
              <CloseIcon onClick={handleIsReading} />
            </Container>
          </AppBar>
          <Container sx={{ background: "black", flexGrow: 1, py: 3 }}>
            {pagesDisplayed.length > 0 &&
              pagesDisplayed.map((page, idx) => {
                if (idx === pagesDisplayed.length - 1) {
                  return <img ref={lastPageRef} src={`${PAGE_PATH}/${page}`} key={idx} alt={page} width="100%" style={{ display: "block" }} />;
                } else {
                  return <img src={`${PAGE_PATH}/${page}`} key={idx} alt={page} width="100%" style={{ display: "block" }} />;
                }
              })}
          </Container>
        </>
      )}
    </Dialog>
  );
};

export default MangaRead;
