import fs from 'fs';
import { v4 as uuid } from 'uuid';

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

const jsonString = JSON.stringify(mangas);

fs.writeFile('./mangas.json', jsonString, err => {
    err ? console.log(err) : console.log('Successfully loaded manga to JSON!');
})