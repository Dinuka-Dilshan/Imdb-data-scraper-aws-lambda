import { load } from "cheerio";

export default (responseText: string) => {
  const cheerioHtmlTree = load(responseText);
  const movieDataWithoutPoster = cheerioHtmlTree(
    "div.ipc-metadata-list-summary-item__tc"
  )
    .get()
    .map((e) => ({
      name: e.children[1].children[1].children[0].children[0].children[0].data,
      imdb_url: `https://www.imdb.com${e.children[1].children[1].children[0].attribs.href}`,
      year: e.children[1].children[2].children[0].children[0].data,
      duration: e.children[1].children[2].children[1]?.children[0].data,
      rated: e.children[1].children[2].children[2]?.children[0].data,
      ratings:
        e.children[1].children[3].children[0].children[0]?.children[1]
          ?.children[0]?.data,
      votes:
        e.children[1].children[3].children[0].children[0]?.children[2]
          ?.children[2]?.data,
    }));

  return cheerioHtmlTree("div.cli-poster-container")
    .get()
    .map((e, index) => ({
      url: e.children[0].children[1].children[0].attribs.src,
      srcset: e.children[0].children[1].children[0].attribs.srcset,
      ...movieDataWithoutPoster[index],
      rank: index + 1,
    }));
};
