import * as Realm from "realm-web";
import { SitemapStream, streamToPromise } from "sitemap";
import slugify from "slugify";
import { MongoApp } from "../../components/Mongo/MongoUtils";

export default async function sitemap(req, res) {
  try {
    const smStream = new SitemapStream({
      hostname: `https://flippy.cards`,
      cacheTime: 600000,
    });

    // Call an external API endpoint to get posts
    const apiCreds = Realm.Credentials.apiKey(process.env.MONGO_API_KEY);
    const apiUser = await MongoApp.logIn(apiCreds);
    const cardpacks = await apiUser.functions.getPublicCardPacks();
    // Get the paths we want to pre-render based on posts
    cardpacks.forEach((pack) => {
      let imgSrc = normalizeImageSrc(pack.image);
      smStream.write({
        url: `/card-pack/${pack._id}?slug=${slugify(pack.title)}`,
        lastmod: pack.lastModified.toISOString(),
        changefreq: "daily",
        priority: 0.9,
        img: [
          {
            url: imgSrc,
          },
        ],
      });
    });

    // End sitemap stream
    smStream.end();

    // XML sitemap string
    const sitemapOutput = (await streamToPromise(smStream)).toString();

    // Change headers
    res.writeHead(200, {
      "Content-Type": "application/xml",
    });

    // Display output to user
    res.end(sitemapOutput);
  } catch (e) {
    console.log(e);
    res.send(JSON.stringify(e));
  }
}
