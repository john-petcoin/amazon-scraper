import fixText from "./fixtext";
// import * as cheerio from 'cheerio'
// import { MongoClient } from 'mongodb'
// import {parse5} from 'parse5'
// import fs from fs
// const fs = require('fs')

// require("fs").writeFile("demo.txt", "Foo bar!")

const product = async (query) => {
  const product_page = await (
    await fetch(`https://www.amazon.com/` + query)
  ).text();
//   console.log(product_page)

// console.log('x')
  const document = parse5.parse(product_page)
  console.log(document);
  return false;


  console.log('ok')
  // console.log(product_page)
  //fs.writeFileSync('./test-sync.txt', product_page);
  try {
    var features = [];
    var feat = product_page
      .split('<ul class="a-unordered-list a-vertical a-spacing-mini">')[1]
      .split("</ul>")[0];
    var feat = feat.split('<span class="a-list-item">');
    for (var i = 1; i < feat.length; i++) {
      try {
        features.push(fixText(feat[i].split("</span>")[0]));
      } catch (err) {}
    }
  } catch (err) {
    var features = [null];
  }

  var price = null;
  var original_price = null;

  try {
    //var pricediv = product_page.split(/<div id="a-section a-spacing-micro".*>/g);
    // var pricediv = product_page
    //   .split(
    //     '<span class="a-price aok-align-center" data-a-size="xl" data-a-color="base">'
    //   )[1]
    //   //.split('<span class="a-price a-text-normal">')[1]
    //   .split("</span>")[0];
    //     console.log(pricediv,"pricediv")

    // var pricediv = product_page
    // .split(
    //   '<span class="a-section a-spacing-none aok-align-center">'
    // )[1]
    // //.split('<span class="a-price a-text-normal">')[1]
    // .split("</span>")[0];

    var price = product_page
      .split('<span class="a-offscreen">')[1]
      .split("</span>")[0];
    //console.log(pricediv,"pricediv")

    var description_div = product_page
      .split(
        '<div id="productDescription" class="a-section a-spacing-small">'
      )[1]
      .split("</div>")[0];

    var description = description_div.split("<span>")[1].split("</span>")[0];
    // console.log("expecting description")
    // console.log(description,"description")

    // // if (pricediv == "") {
    // //   console.timeLog("no")
    //   var pricediv = product_page
    //     .split(
    //       '<span class="a-section a-spacing-none aok-align-center">'
    //     )[1]
    //     //.split('<span class="a-price a-text-normal">')[1]
    //     .split("</span>")[0];
    // // }

    //console.log(pricediv, "pricediv");

    // price = pricediv.split('<span class="a-offscreen">')[1].split("</span>")[0];
    // console.log(price, "price");

    // price = original_price
    // .split('<span class="a-offscreen">')[1]
    // .split("</span>")[0];

    // console.log(use_price, "use_price")

    // try {
    //   price = pricediv[1]
    //     .split(
    //       '<span class="a-price a-text-price a-size-medium apexPriceToPay" data-a-size="b" data-a-color="price">'
    //     )[1]
    //     .split("</span>")[0];
    //   if (price.includes(">")) {
    //     price = price.split(">")[1];
    //   }
    // } catch (pe) {}

    // if (price === null) {
    //   price = pricediv[1]
    //     .split(/<span class="a-price-whole">/g)[1]
    //     .split("</span>")[0];
    // }
  } catch (error) {}

  if (original_price !== null) {
    original_price = parseFloat(
      original_price.replace("₹", "").replace(/,/g, "").trim()
    );
  }
  if (price !== null) {
    console.log(price, "price");
    price = parseFloat(price.replace("$", ""));
    //price = parseFloat(price.replace("$", "").replace(/./g, "").trim());
    //console.log(price, "price");
  }

  try {
    var in_stock =
      product_page
        .split('id="availability"')[1]
        .split("</div>")[0]
        .toLowerCase()
        .lastIndexOf("in stock") !== -1;
    //console.log(in_stock,"0")
  } catch (e) {
    //var in_stock = product_page.split("In stock.").length > 1;
    var in_stock = product_page
      .split('id="availability"')[1]
      .split("</div>")[0]
      .toLowerCase();
    //console.log(in_stock,"1")
  }

  try {
    var image = product_page
      .split('<div id="imgTagWrapperId" class="imgTagWrapper">')[1]
      .split('data-old-hires="')[1]
      .split('"')[0]
      .replaceAll("\n", "");
    if (image === "") {
      var image = product_page
        .split('<div id="imgTagWrapperId" class="imgTagWrapper">')[1]
        .split('data-a-dynamic-image="{&quot;')[1]
        .split("&quot;")[0]
        .replaceAll("\n", "");
    }
  } catch (e) {
    var image = null;
  }

  try {
    var altImagesDiv = product_page
      .split('<div id="altImages" class="a-row">')[1]
      .split("</div>")[0];
    //.replaceAll("\n", "");
    // console.log(altImagesDiv)

    var altImages2 = altImagesDiv.split('<span class="a-list-item">')[1].split('</span>')[0];
    console.log(altImages2)

    var altImages = altImages2.split('<img alt="" src="')[1].split('"/>')[0];
    //https://m.media-amazon.com/images/I/51pF5PtEZxL._AC_US40_.jpg
    // console.log(altImages.replace("40_.jpg",".jpg"));

  } catch (e) {
    //var image = null;
  }

  try {
    var review_section = product_page.split("ratings</span>")[0];
    var ratings_count = parseInt(
      lastEntry(review_section.split(">")).replace(/,/g, "").trim()
    );
    var rating = parseFloat(
      lastEntry(
        lastEntry(review_section.split("a-icon-star"))
          .split("</span>")[0]
          .split("out of")[0]
          .split(">")
      ).trim()
    );
    var rating_details = { ratings_count, rating };
  } catch (er) {
    console.log(er.message);
    var rating_details = null;
  }

  try {
    var product_detail = {
      name: fixText(
        product_page
          .split(
            '<span id="productTitle" class="a-size-large product-title-word-break">'
          )[1]
          .split("</span>")[0]
      ),
      image,
      price,
      // original_price,
      in_stock,
      rating_details,
      features,
      description,
      product_link: `https://www.amazon.com/${query}`,
    };
  } catch (err) {
    var product_detail = null;
  }

  return JSON.stringify(
    {
      status: true,
      query,
      fetch_from: `https://www.amazon.com/${query}`,
      product_detail,
    },
    null,
    2
  );
};

const lastEntry = (array) => array[array.length - 1];

export default product;
