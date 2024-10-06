import puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';

type Product = {
    url: string;
    name: string;
    imageUrl: string;
    price: string;
}

export async function scrape(url: string){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const content = await page.content();
    const $ = cheerio.load(content);
    if(url.includes("ssense.com")){
        // SSENSE website can check if the user is a bot
        //return scrapeSSENSE($, url);
    } else if(url.includes("uniqlo.com")){
        return scrapeUNIQLO($, url);
    } else if (url.includes("hm.com")){
        // CORS 😭😭😭😭😭😭😭
        return scrapeHM($, url);
    }
    return [];
}

function scrapeSSENSE($, url: string) {
    const image = $(".product-detail-new").eq(0).attr('src');
    const name = $(".pdp-product-title__left").eq(0).text();
    const price = $(".product-price").eq(0).text();

    return { url: url, name: name, imageUrl: image, price: price };
}

function scrapeUNIQLO($, url: string) {
    const carousal = $(".thumbnail-section__content").eq(0);
    const image = carousal.children().eq(Math.min(2, carousal.children().length - 1)).children().eq(0).attr("src");

    const name = $("title").eq(0).text();
    const price = $(".price-original").eq(0).text();

    return { url: url, name: name, imageUrl: image, price: price };
}

function scrapeHM($, url: string) {
    const image = $(".ecc322").eq(0).find("img").attr('src');
    const name = $(".fa226d .af6753 .d582fb").eq(0).text();
    const price = $(".edbe20 .ac3d9e .d9ca8b").eq(0).text();

    return { url: url, name: name, imageUrl: image, price: price };
}
