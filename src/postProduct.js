import fetch from "node-fetch";

const collectionCreate = async() => {
    const custom_collection = new shopify.rest.CustomCollection({session: session});
custom_collection.title = "IPods";
custom_collection.collects = [
  {
    "product_id": 921728736
  }
];
await custom_collection.save({
  update: true,
});
}

const collectionFetch = async() => {
    
}





const productUploadImage = async() => {

}

const productUpdate = async() => {
    
}

const productCreate = async() => {
    
}

const productAssignCollection = async() => {
    
}























const go = async () => {
  var data = {
    product: {
      title: "Burton Custom Freestyle 151",
      body_html: "Good snowboard!",
      vendor: "Burton",
      product_type: "Snowboard",
      status: "active",
      published: "true",
      published_scope: "global",
      tags: ["Barne", "Big Air", "John's Fav"],
      images: [
        {src: "https://m.media-amazon.com/images/I/61dBUdsJH2L._AC_SX679_.jpg"},
        {src: "https://m.media-amazon.com/images/I/61CkitfWe8L._AC_SX679_.jpg"},
      ],
      options: [
        {
          "name": "Color",
          "values": [
            "Blue",
            "Black"
          ]
        },
        {
          "name": "Size",
          "values": [
            "155",
            "159"
          ]
        }
      ],
      variants: [
        {
          "option1": "Blue",
          "option2": "155"
        },
        {
          "option1": "Black",
          "option2": "159"
        }
      ]
    },
  };
  var header = {
    method: "POST",
    headers: {
      "X-Shopify-Access-Token": "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",
      "Authorization": `Basic ${Buffer.from("dd52a0061ff69bd6ea662653bdfa6720" + ':' + "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", "binary").toString("base64")}`,
      "Content-Type": "application/json",
      "Accept-Charset": "UTF-8",
    },
    body: JSON.stringify(data),
  };

  var url =
    "https://petcoin-love.myshopify.com/admin/api/2023-01/products.json";
  var u = await fetch(url, header)
  console.log(u)
  console.log(header)



    // .then((res) => res.text())
    // .then((data) => {
    //   console.log(data);
    // })
    // .catch((error) => {
    //   console.log(u);
    // });
};

go();
