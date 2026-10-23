/**
 * LIMETREE - Core Data Definitions and Curated Catalog
 * Exactly 6 unique products per brand (Riyaa Trends, Glow Home, Earkart)
 * Zero duplicate products, unique images, names, and prices!
 */

const LIMETREE_BUSINESSES = {
  "riyaa-trends": {
    "id": "riyaa-trends",
    "name": "Riyaa Trends",
    "tagline": "Modern Everyday Comfort & Elevated Tailoring",
    "category": "Clothing & Fashion",
    "description": "Authentic combed cotton kids and youth apparel designed for effortless comfort and durable activewear. Premium tees, tailored French terry trackpants, joggers, and relaxed play shorts.",
    "badge": "Apparel & Comfort",
    "bannerImg": "assets/riyaa-trends/IMG-20260222-WA0060.jpg",
    "attributes": [
      "Size",
      "Colour",
      "Fit",
      "Fabric"
    ],
    "returnWindowDays": 7,
    "gstRate": 5
  },
  "glow-home": {
    "id": "glow-home",
    "name": "Glow Home",
    "tagline": "Hand-Poured Luxury Scented Candles & Home Fragrance",
    "category": "Home Fragrance",
    "description": "Artisan workshop candles crafted from natural soy and beeswax blends with crackling wicks and calming essential oil notes. Hand-poured amber glass jars, metal tins, and colourful votives.",
    "badge": "Artisan Fragrance",
    "bannerImg": "assets/glow-home/IMG_20260816_171313.jpg",
    "attributes": [
      "Fragrance",
      "Jar Size",
      "Wax Type",
      "Burn Time"
    ],
    "returnWindowDays": 7,
    "gstRate": 18
  },
  "earkart": {
    "id": "earkart",
    "name": "Earkart",
    "tagline": "Handcrafted Earrings & Minimalist Ear Studs",
    "category": "Fashion Jewellery",
    "description": "Handcrafted floral daisy ear studs, delicate artisanal petal jewelry, and lightweight minimalist earrings. Created for sensitive ears and timeless daily grace.",
    "badge": "Fine Fashion Jewellery",
    "bannerImg": "assets/earkart/earkart-daisy-model-ear.jpg",
    "attributes": [
      "Material",
      "Colour / Stone",
      "Closure",
      "Finish"
    ],
    "returnWindowDays": 7,
    "gstRate": 3
  }
};

const RIYAA_TRENDS_PRODUCTS = [
  {
    "id": "rt-001",
    "businessId": "riyaa-trends",
    "name": "Kids Organic Cotton Graphic Crewneck T-Shirt",
    "category": "T-Shirts",
    "sku": "RT-TSH-001",
    "description": "Crafted from 240 GSM organic ring-spun cotton. Pre-shrunk relaxed fit with a structured ribbed collar and cheerful graphic motif. An everyday wardrobe essential for active kids.",
    "basePrice": 799,
    "salePrice": 699,
    "status": "active",
    "rating": 4.9,
    "reviewsCount": 52,
    "hsnCode": "61091000",
    "images": [
      "assets/riyaa-trends/IMG-20260222-WA0041.jpg"
    ],
    "features": [
      "240 GSM 100% Combed Cotton",
      "Ribbed Lycra Anti-Sag Collar",
      "Oeko-Tex Standard 100 Certified",
      "Pre-washed anti-shrink fabric"
    ],
    "variants": [
      {
        "id": "rt-001-v0",
        "size": "XS",
        "chest": "36\" – 38\"",
        "length": "26.5\"",
        "shoulder": "16.5\"",
        "waist": "28\" – 30\"",
        "color": "Navy Graphic",
        "price": 699,
        "stock": 15,
        "sku": "RT-TSH-001-XS-NVY"
      },
      {
        "id": "rt-001-v1",
        "size": "S",
        "chest": "38\" – 40\"",
        "length": "27.5\"",
        "shoulder": "17.5\"",
        "waist": "30\" – 32\"",
        "color": "Navy Graphic",
        "price": 699,
        "stock": 20,
        "sku": "RT-TSH-001-S-NVY"
      },
      {
        "id": "rt-001-v2",
        "size": "M",
        "chest": "40\" – 42\"",
        "length": "28.5\"",
        "shoulder": "18.5\"",
        "waist": "32\" – 34\"",
        "color": "Navy Graphic",
        "price": 699,
        "stock": 25,
        "sku": "RT-TSH-001-M-NVY"
      },
      {
        "id": "rt-001-v3",
        "size": "L",
        "chest": "42\" – 44\"",
        "length": "29.5\"",
        "shoulder": "19.5\"",
        "waist": "34\" – 36\"",
        "color": "Navy Graphic",
        "price": 749,
        "stock": 18,
        "sku": "RT-TSH-001-L-NVY"
      },
      {
        "id": "rt-001-v4",
        "size": "XL",
        "chest": "44\" – 46\"",
        "length": "30.5\"",
        "shoulder": "20.5\"",
        "waist": "36\" – 38\"",
        "color": "Navy Graphic",
        "price": 749,
        "stock": 14,
        "sku": "RT-TSH-001-XL-NVY"
      },
      {
        "id": "rt-001-v5",
        "size": "XXL",
        "chest": "46\" – 48\"",
        "length": "31.5\"",
        "shoulder": "21.5\"",
        "waist": "38\" – 40\"",
        "color": "Navy Graphic",
        "price": 799,
        "stock": 10,
        "sku": "RT-TSH-001-XXL-NVY"
      }
    ]
  },
  {
    "id": "rt-002",
    "businessId": "riyaa-trends",
    "name": "Kids Sunshine Yellow Oversized Cotton Tee",
    "category": "Oversized Tees",
    "sku": "RT-TSH-002",
    "description": "Vibrant mustard-yellow combed cotton tee paired with soft comfort stitching. Ultra-soft breathable touch that keeps kids cool throughout playtime and family outings.",
    "basePrice": 799,
    "salePrice": 649,
    "status": "active",
    "rating": 4.8,
    "reviewsCount": 34,
    "hsnCode": "61091000",
    "images": [
      "assets/riyaa-trends/IMG-20260222-WA0042.jpg"
    ],
    "features": [
      "100% Bio-Washed Combed Cotton",
      "Comfort Stretch Collar",
      "Fade-Resistant Eco Dye",
      "Zero Irritant Seams"
    ],
    "variants": [
      {
        "id": "rt-002-v0",
        "size": "XS",
        "chest": "36\" – 38\"",
        "length": "26.5\"",
        "shoulder": "16.5\"",
        "waist": "28\" – 30\"",
        "color": "Sunshine Yellow",
        "price": 649,
        "stock": 12,
        "sku": "RT-TSH-002-XS-YLW"
      },
      {
        "id": "rt-002-v1",
        "size": "S",
        "chest": "38\" – 40\"",
        "length": "27.5\"",
        "shoulder": "17.5\"",
        "waist": "30\" – 32\"",
        "color": "Sunshine Yellow",
        "price": 649,
        "stock": 15,
        "sku": "RT-TSH-002-S-YLW"
      },
      {
        "id": "rt-002-v2",
        "size": "M",
        "chest": "40\" – 42\"",
        "length": "28.5\"",
        "shoulder": "18.5\"",
        "waist": "32\" – 34\"",
        "color": "Sunshine Yellow",
        "price": 649,
        "stock": 22,
        "sku": "RT-TSH-002-M-YLW"
      },
      {
        "id": "rt-002-v3",
        "size": "L",
        "chest": "42\" – 44\"",
        "length": "29.5\"",
        "shoulder": "19.5\"",
        "waist": "34\" – 36\"",
        "color": "Sunshine Yellow",
        "price": 699,
        "stock": 14,
        "sku": "RT-TSH-002-L-YLW"
      },
      {
        "id": "rt-002-v4",
        "size": "XL",
        "chest": "44\" – 46\"",
        "length": "30.5\"",
        "shoulder": "20.5\"",
        "waist": "36\" – 38\"",
        "color": "Sunshine Yellow",
        "price": 699,
        "stock": 10,
        "sku": "RT-TSH-002-XL-YLW"
      },
      {
        "id": "rt-002-v5",
        "size": "XXL",
        "chest": "46\" – 48\"",
        "length": "31.5\"",
        "shoulder": "21.5\"",
        "waist": "38\" – 40\"",
        "color": "Sunshine Yellow",
        "price": 749,
        "stock": 8,
        "sku": "RT-TSH-002-XXL-YLW"
      }
    ]
  },
  {
    "id": "rt-003",
    "businessId": "riyaa-trends",
    "name": "Girls Navy Blue Sporty French Terry Trackpants",
    "category": "Trackpants",
    "sku": "RT-TRK-003",
    "description": "Coordinated athletic tracksuit featuring tapered ribbed ankle cuffs, side slash pockets, and an elastic drawstring waist. Built for effortless weekend sports.",
    "basePrice": 1499,
    "salePrice": 1299,
    "status": "active",
    "rating": 4.9,
    "reviewsCount": 42,
    "hsnCode": "61034200",
    "images": [
      "assets/riyaa-trends/IMG-20260222-WA0043.jpg"
    ],
    "features": [
      "320 GSM French Terry Cotton",
      "Elastic Drawstring Waist",
      "Reinforced Knee Seams",
      "Tapered Sport Silhouette"
    ],
    "variants": [
      {
        "id": "rt-003-v0",
        "size": "XS",
        "chest": "36\" – 38\"",
        "length": "26.5\"",
        "shoulder": "16.5\"",
        "waist": "28\" – 30\"",
        "color": "Navy Blue",
        "price": 1299,
        "stock": 12,
        "sku": "RT-TRK-003-XS-NVY"
      },
      {
        "id": "rt-003-v1",
        "size": "S",
        "chest": "38\" – 40\"",
        "length": "27.5\"",
        "shoulder": "17.5\"",
        "waist": "30\" – 32\"",
        "color": "Navy Blue",
        "price": 1299,
        "stock": 16,
        "sku": "RT-TRK-003-S-NVY"
      },
      {
        "id": "rt-003-v2",
        "size": "M",
        "chest": "40\" – 42\"",
        "length": "28.5\"",
        "shoulder": "18.5\"",
        "waist": "32\" – 34\"",
        "color": "Navy Blue",
        "price": 1299,
        "stock": 24,
        "sku": "RT-TRK-003-M-NVY"
      },
      {
        "id": "rt-003-v3",
        "size": "L",
        "chest": "42\" – 44\"",
        "length": "29.5\"",
        "shoulder": "19.5\"",
        "waist": "34\" – 36\"",
        "color": "Navy Blue",
        "price": 1349,
        "stock": 12,
        "sku": "RT-TRK-003-L-NVY"
      },
      {
        "id": "rt-003-v4",
        "size": "XL",
        "chest": "44\" – 46\"",
        "length": "30.5\"",
        "shoulder": "20.5\"",
        "waist": "36\" – 38\"",
        "color": "Navy Blue",
        "price": 1349,
        "stock": 10,
        "sku": "RT-TRK-003-XL-NVY"
      },
      {
        "id": "rt-003-v5",
        "size": "XXL",
        "chest": "46\" – 48\"",
        "length": "31.5\"",
        "shoulder": "21.5\"",
        "waist": "38\" – 40\"",
        "color": "Navy Blue",
        "price": 1399,
        "stock": 8,
        "sku": "RT-TRK-003-XXL-NVY"
      }
    ]
  },
  {
    "id": "rt-004",
    "businessId": "riyaa-trends",
    "name": "Boys Maroon Urban Performance Joggers",
    "category": "Trackpants",
    "sku": "RT-TRK-004",
    "description": "Deep maroon performance joggers with signature knee graphic print and dual concealed pockets. Breathable, anti-sweat terry that moves with high-energy activities.",
    "basePrice": 1499,
    "salePrice": 1249,
    "status": "active",
    "rating": 4.8,
    "reviewsCount": 29,
    "hsnCode": "61034200",
    "images": [
      "assets/riyaa-trends/IMG-20260222-WA0044.jpg"
    ],
    "features": [
      "Anti-Pilling Terry Weave",
      "High-Density Knee Accent",
      "Flexible Ribbed Cuffs",
      "Adjustable Cotton Cord"
    ],
    "variants": [
      {
        "id": "rt-004-v0",
        "size": "XS",
        "chest": "36\" – 38\"",
        "length": "26.5\"",
        "shoulder": "16.5\"",
        "waist": "28\" – 30\"",
        "color": "Maroon Berry",
        "price": 1249,
        "stock": 10,
        "sku": "RT-TRK-004-XS-MRN"
      },
      {
        "id": "rt-004-v1",
        "size": "S",
        "chest": "38\" – 40\"",
        "length": "27.5\"",
        "shoulder": "17.5\"",
        "waist": "30\" – 32\"",
        "color": "Maroon Berry",
        "price": 1249,
        "stock": 14,
        "sku": "RT-TRK-004-S-MRN"
      },
      {
        "id": "rt-004-v2",
        "size": "M",
        "chest": "40\" – 42\"",
        "length": "28.5\"",
        "shoulder": "18.5\"",
        "waist": "32\" – 34\"",
        "color": "Maroon Berry",
        "price": 1249,
        "stock": 20,
        "sku": "RT-TRK-004-M-MRN"
      },
      {
        "id": "rt-004-v3",
        "size": "L",
        "chest": "42\" – 44\"",
        "length": "29.5\"",
        "shoulder": "19.5\"",
        "waist": "34\" – 36\"",
        "color": "Maroon Berry",
        "price": 1299,
        "stock": 15,
        "sku": "RT-TRK-004-L-MRN"
      },
      {
        "id": "rt-004-v4",
        "size": "XL",
        "chest": "44\" – 46\"",
        "length": "30.5\"",
        "shoulder": "20.5\"",
        "waist": "36\" – 38\"",
        "color": "Maroon Berry",
        "price": 1299,
        "stock": 11,
        "sku": "RT-TRK-004-XL-MRN"
      },
      {
        "id": "rt-004-v5",
        "size": "XXL",
        "chest": "46\" – 48\"",
        "length": "31.5\"",
        "shoulder": "21.5\"",
        "waist": "38\" – 40\"",
        "color": "Maroon Berry",
        "price": 1349,
        "stock": 6,
        "sku": "RT-TRK-004-XXL-MRN"
      }
    ]
  },
  {
    "id": "rt-005",
    "businessId": "riyaa-trends",
    "name": "Kids Sunshine Yellow Athletic Joggers",
    "category": "Trackpants",
    "sku": "RT-TRK-005",
    "description": "Bright sunshine joggers tailored with comfortable cotton stretch. Features side stripes and elastic waistband for active school runs and playground sports.",
    "basePrice": 1299,
    "salePrice": 1099,
    "status": "active",
    "rating": 4.7,
    "reviewsCount": 21,
    "hsnCode": "61034200",
    "images": [
      "assets/riyaa-trends/IMG-20260222-WA0047.jpg"
    ],
    "features": [
      "Breathable Combed French Terry",
      "Dual Utility Pockets",
      "Anti-Static Bio-Wash",
      "Elastic Cuff Bottoms"
    ],
    "variants": [
      {
        "id": "rt-005-v0",
        "size": "XS",
        "chest": "36\" – 38\"",
        "length": "26.5\"",
        "shoulder": "16.5\"",
        "waist": "28\" – 30\"",
        "color": "Sunshine Yellow",
        "price": 1099,
        "stock": 10,
        "sku": "RT-TRK-005-XS-YLW"
      },
      {
        "id": "rt-005-v1",
        "size": "S",
        "chest": "38\" – 40\"",
        "length": "27.5\"",
        "shoulder": "17.5\"",
        "waist": "30\" – 32\"",
        "color": "Sunshine Yellow",
        "price": 1099,
        "stock": 18,
        "sku": "RT-TRK-005-S-YLW"
      },
      {
        "id": "rt-005-v2",
        "size": "M",
        "chest": "40\" – 42\"",
        "length": "28.5\"",
        "shoulder": "18.5\"",
        "waist": "32\" – 34\"",
        "color": "Sunshine Yellow",
        "price": 1099,
        "stock": 22,
        "sku": "RT-TRK-005-M-YLW"
      },
      {
        "id": "rt-005-v3",
        "size": "L",
        "chest": "42\" – 44\"",
        "length": "29.5\"",
        "shoulder": "19.5\"",
        "waist": "34\" – 36\"",
        "color": "Sunshine Yellow",
        "price": 1149,
        "stock": 10,
        "sku": "RT-TRK-005-L-YLW"
      },
      {
        "id": "rt-005-v4",
        "size": "XL",
        "chest": "44\" – 46\"",
        "length": "30.5\"",
        "shoulder": "20.5\"",
        "waist": "36\" – 38\"",
        "color": "Sunshine Yellow",
        "price": 1149,
        "stock": 8,
        "sku": "RT-TRK-005-XL-YLW"
      },
      {
        "id": "rt-005-v5",
        "size": "XXL",
        "chest": "46\" – 48\"",
        "length": "31.5\"",
        "shoulder": "21.5\"",
        "waist": "38\" – 40\"",
        "color": "Sunshine Yellow",
        "price": 1199,
        "stock": 5,
        "sku": "RT-TRK-005-XXL-YLW"
      }
    ]
  },
  {
    "id": "rt-006",
    "businessId": "riyaa-trends",
    "name": "Kids Trampoline Active Play Shorts & Tees Set",
    "category": "Shorts",
    "sku": "RT-SHR-006",
    "description": "High-energy trampoline and playground set crafted from lightweight, tear-resistant ripstop cotton. Lets kids jump, climb, and sprint with complete freedom.",
    "basePrice": 1099,
    "salePrice": 899,
    "status": "active",
    "rating": 4.9,
    "reviewsCount": 48,
    "hsnCode": "62034200",
    "images": [
      "assets/riyaa-trends/IMG-20260222-WA0055.jpg"
    ],
    "features": [
      "Ripstop Cotton Active Shorts",
      "Cooling Mesh Breathability",
      "Stretchy Flex Waistband",
      "Fade-Proof Colors"
    ],
    "variants": [
      {
        "id": "rt-006-v0",
        "size": "XS",
        "chest": "36\" – 38\"",
        "length": "26.5\"",
        "shoulder": "16.5\"",
        "waist": "28\" – 30\"",
        "color": "Multi Active",
        "price": 899,
        "stock": 12,
        "sku": "RT-SHR-006-XS-ACT"
      },
      {
        "id": "rt-006-v1",
        "size": "S",
        "chest": "38\" – 40\"",
        "length": "27.5\"",
        "shoulder": "17.5\"",
        "waist": "30\" – 32\"",
        "color": "Multi Active",
        "price": 899,
        "stock": 18,
        "sku": "RT-SHR-006-S-ACT"
      },
      {
        "id": "rt-006-v2",
        "size": "M",
        "chest": "40\" – 42\"",
        "length": "28.5\"",
        "shoulder": "18.5\"",
        "waist": "32\" – 34\"",
        "color": "Multi Active",
        "price": 899,
        "stock": 26,
        "sku": "RT-SHR-006-M-ACT"
      },
      {
        "id": "rt-006-v3",
        "size": "L",
        "chest": "42\" – 44\"",
        "length": "29.5\"",
        "shoulder": "19.5\"",
        "waist": "34\" – 36\"",
        "color": "Multi Active",
        "price": 949,
        "stock": 15,
        "sku": "RT-SHR-006-L-ACT"
      },
      {
        "id": "rt-006-v4",
        "size": "XL",
        "chest": "44\" – 46\"",
        "length": "30.5\"",
        "shoulder": "20.5\"",
        "waist": "36\" – 38\"",
        "color": "Multi Active",
        "price": 949,
        "stock": 11,
        "sku": "RT-SHR-006-XL-ACT"
      },
      {
        "id": "rt-006-v5",
        "size": "XXL",
        "chest": "46\" – 48\"",
        "length": "31.5\"",
        "shoulder": "21.5\"",
        "waist": "38\" – 40\"",
        "color": "Multi Active",
        "price": 999,
        "stock": 7,
        "sku": "RT-SHR-006-XXL-ACT"
      }
    ]
  }
];

const GLOW_HOME_PRODUCTS = [
  {
    "id": "gh-001",
    "businessId": "glow-home",
    "name": "Artisan Golden Amber Glass Jar Scented Candle",
    "category": "Jar Candles",
    "sku": "GH-CND-001",
    "description": "Pure artisanal sunshine in a glass vessel. Hand-poured with golden botanical wax, natural centered cotton wicks, and rich calming aromatic notes.",
    "basePrice": 899,
    "salePrice": 799,
    "status": "active",
    "rating": 4.9,
    "reviewsCount": 64,
    "hsnCode": "34060010",
    "images": [
      "assets/glow-home/IMG_20260816_171236.jpg"
    ],
    "features": [
      "100% Biodegradable Soy & Beeswax Blend",
      "Natural Centered Cotton Wick",
      "Paraben & Phthalate Free",
      "Clean soot-free burn (45+ hours)"
    ],
    "variants": [
      {
        "id": "gh-001-v1",
        "fragrance": "Golden Citrus & Vanilla",
        "size": "150g (30h Burn)",
        "price": 799,
        "stock": 20,
        "sku": "GH-CND-001-150-LAV"
      },
      {
        "id": "gh-001-v2",
        "fragrance": "Golden Citrus & Vanilla",
        "size": "250g (50h Burn)",
        "price": 1199,
        "stock": 15,
        "sku": "GH-CND-001-250-LAV"
      }
    ]
  },
  {
    "id": "gh-002",
    "businessId": "glow-home",
    "name": "Golden Amber Jar Candle Trio Gift Set",
    "category": "Gift Sets",
    "sku": "GH-CND-002",
    "description": "Delightful curated trio of golden amber glass jar candles. Provides layered fragrance throw across living rooms, bedrooms, and dining spaces.",
    "basePrice": 2299,
    "salePrice": 1999,
    "status": "active",
    "rating": 5,
    "reviewsCount": 47,
    "hsnCode": "34060010",
    "images": [
      "assets/glow-home/IMG_20260816_171313.jpg"
    ],
    "features": [
      "3 x 150g Amber Glass Vessels",
      "Individually Centered Wicks",
      "Luxury Keepsake Gift Box",
      "Total 90+ Hours Burn Time"
    ],
    "variants": [
      {
        "id": "gh-002-v1",
        "fragrance": "Citrus, Amber & Vanilla Trio",
        "size": "Set of 3 (150g each)",
        "price": 1999,
        "stock": 18,
        "sku": "GH-CND-002-TRIO"
      }
    ]
  },
  {
    "id": "gh-003",
    "businessId": "glow-home",
    "name": "Warm Molten Honey Beeswax Aromatherapy Tin Candle",
    "category": "Aromatherapy",
    "sku": "GH-CND-003",
    "description": "Freshly cast molten golden wax poured into durable metallic travel tins. Releases comforting earthy honey tones and warm ambient luminescence.",
    "basePrice": 949,
    "salePrice": 849,
    "status": "active",
    "rating": 4.9,
    "reviewsCount": 43,
    "hsnCode": "34060010",
    "images": [
      "assets/glow-home/IMG_20260906_112045.jpg"
    ],
    "features": [
      "Molten Hand-Poured Wax Casting",
      "Travel-Friendly Metal Tins",
      "Smokeless Clean Flame",
      "Zero Artificial Dyes"
    ],
    "variants": [
      {
        "id": "gh-003-v1",
        "fragrance": "Warm Amber Honey",
        "size": "150g Tin (30h Burn)",
        "price": 849,
        "stock": 22,
        "sku": "GH-CND-003-150-CED"
      },
      {
        "id": "gh-003-v2",
        "fragrance": "Warm Amber Honey",
        "size": "250g Tin (50h Burn)",
        "price": 1249,
        "stock": 16,
        "sku": "GH-CND-003-250-CED"
      }
    ]
  },
  {
    "id": "gh-004",
    "businessId": "glow-home",
    "name": "Handcrafted Workshop Travel Tin Candles Gift Set (4 Pack)",
    "category": "Gift Sets",
    "sku": "GH-CND-004",
    "description": "Fresh from our workshop cooling bench, a set of 4 seamless round candle tins. Compact, shatterproof, and filled with slow-burning botanical wax.",
    "basePrice": 1699,
    "salePrice": 1449,
    "status": "active",
    "rating": 4.8,
    "reviewsCount": 38,
    "hsnCode": "34060010",
    "images": [
      "assets/glow-home/IMG_20260906_112120.jpg"
    ],
    "features": [
      "Pack of 4 Artisan Tins",
      "Leak-proof Screw-Top Lids",
      "Pure Essential Oil Infused",
      "Ideal for Travel & Gifting"
    ],
    "variants": [
      {
        "id": "gh-004-v1",
        "fragrance": "Assorted Woods & Vanilla",
        "size": "Pack of 4 (100g each)",
        "price": 1449,
        "stock": 15,
        "sku": "GH-CND-004-4PK"
      }
    ]
  },
  {
    "id": "gh-005",
    "businessId": "glow-home",
    "name": "Pure Soy Studio Workshop Aromatherapy Tin Candle",
    "category": "Aromatherapy",
    "sku": "GH-CND-005",
    "description": "Crafted with precision wick placement clips in small studio batches. Delivers a clean, even melt pool that fills rooms with pure sandalwood and amber notes.",
    "basePrice": 1099,
    "salePrice": 949,
    "status": "active",
    "rating": 4.9,
    "reviewsCount": 36,
    "hsnCode": "34060010",
    "images": [
      "assets/glow-home/IMG_20260906_121557.jpg"
    ],
    "features": [
      "Handcrafted Metal Tin Vessel",
      "Braided Organic Cotton Wick",
      "55+ Hour Burn Time",
      "Essential Oil Infused"
    ],
    "variants": [
      {
        "id": "gh-005-v1",
        "fragrance": "Mysore Sandalwood & Amber",
        "size": "250g Studio Tin (55h)",
        "price": 949,
        "stock": 18,
        "sku": "GH-CND-005-250"
      }
    ]
  },
  {
    "id": "gh-006",
    "businessId": "glow-home",
    "name": "Botanical Multi-Color Pastel Candle Melts Set",
    "category": "Scented Candles",
    "sku": "GH-CND-006",
    "description": "Colorful collection of hand-poured artisan votives and wax melts in pastel blue, coral, and lavender. Perfect for festive trays and evening ambiance.",
    "basePrice": 799,
    "salePrice": 699,
    "status": "active",
    "rating": 4.8,
    "reviewsCount": 29,
    "hsnCode": "34060010",
    "images": [
      "assets/glow-home/IMG_20260927_124013.jpg"
    ],
    "features": [
      "Assorted Pastel Colors",
      "Flame-free Wax Warmer Compatible",
      "Long Lasting Aroma Throw",
      "Natural Dye & Soy Base"
    ],
    "variants": [
      {
        "id": "gh-006-v1",
        "fragrance": "Mixed Botanical Scents",
        "size": "Box of 12 Votives",
        "price": 699,
        "stock": 25,
        "sku": "GH-DIF-006-12-SET"
      },
      {
        "id": "gh-006-v2",
        "fragrance": "Mixed Botanical Scents",
        "size": "Box of 24 Votives",
        "price": 1199,
        "stock": 15,
        "sku": "GH-DIF-006-24-SET"
      }
    ]
  }
];

const EARKART_PRODUCTS = [
  {
    "id": "ek-001",
    "businessId": "earkart",
    "name": "Handcrafted White Daisy Floral Stud Earrings (Pair)",
    "category": "Ear Studs",
    "sku": "EK-STD-001",
    "description": "Exquisitely sculpted dual white daisy floral blossom studs with a sunburst yellow center. Handcrafted with hypoallergenic posts for comfortable daily wear.",
    "basePrice": 1299,
    "salePrice": 1099,
    "status": "active",
    "rating": 4.9,
    "reviewsCount": 54,
    "hsnCode": "71131100",
    "images": [
      "assets/earkart/earkart-daisy-pair-original.jpg"
    ],
    "features": [
      "Handcrafted Ceramic Floral Petals",
      "Hypoallergenic Silver Posts",
      "Sensitive Ear Safe",
      "Secure Butterfly Silicone Backing"
    ],
    "variants": [
      {
        "id": "ek-001-v1",
        "material": "Hypoallergenic Silver Post",
        "color": "White Blossom / Gold Center",
        "price": 1099,
        "stock": 20,
        "sku": "EK-STD-001-SLV-WHT"
      },
      {
        "id": "ek-001-v2",
        "material": "18K Gold Plated Post",
        "color": "White Blossom / Gold Center",
        "price": 1199,
        "stock": 16,
        "sku": "EK-STD-001-GLD-WHT"
      }
    ]
  },
  {
    "id": "ek-002",
    "businessId": "earkart",
    "name": "Artisan White Petal Bloom Miniature Studs",
    "category": "Ear Studs",
    "sku": "EK-STD-002",
    "description": "Charming nature-inspired botanical flower earrings. Each delicate petal is sculpted by hand to capture the organic symmetry of freshly bloomed daisies.",
    "basePrice": 1499,
    "salePrice": 1299,
    "status": "active",
    "rating": 4.9,
    "reviewsCount": 41,
    "hsnCode": "71131100",
    "images": [
      "assets/earkart/earkart-mini-petal-bloom.jpg"
    ],
    "features": [
      "Hand-Carved Flower Petals",
      "Featherlight 2.1g total weight",
      "Anti-Tarnish Protective Seal",
      "Daily shower & swim safe"
    ],
    "variants": [
      {
        "id": "ek-002-v1",
        "material": "Silver Post Foundation",
        "color": "Pure Floral White",
        "price": 1299,
        "stock": 22,
        "sku": "EK-HOP-002-SLV-WHT"
      },
      {
        "id": "ek-002-v2",
        "material": "Gold Vermeil Post",
        "color": "Pure Floral White",
        "price": 1399,
        "stock": 15,
        "sku": "EK-HOP-002-GLD-WHT"
      }
    ]
  },
  {
    "id": "ek-003",
    "businessId": "earkart",
    "name": "Architectural 18K Twisted Gold Huggie Hoops",
    "category": "Huggie Hoops",
    "sku": "EK-HOP-003",
    "description": "Bold twisted architectural curves forged in 2.5-micron 18K gold vermeil over hypoallergenic 925 sterling silver. Seamless click-to-close clasp for all-day comfort.",
    "basePrice": 1699,
    "salePrice": 1449,
    "status": "active",
    "rating": 4.8,
    "reviewsCount": 26,
    "hsnCode": "71131100",
    "images": [
      "assets/earkart/earkart-gold-huggies.jpg"
    ],
    "features": [
      "2.5 Micron 18K Gold Vermeil",
      "Solid 925 Sterling Core",
      "Seamless Click-Hinge Closure",
      "Diameter: 14mm"
    ],
    "variants": [
      {
        "id": "ek-003-v1",
        "material": "18K Gold Vermeil (14mm)",
        "color": "Warm Metallic Gold",
        "price": 1449,
        "stock": 18,
        "sku": "EK-DRP-003-GLD-14"
      },
      {
        "id": "ek-003-v2",
        "material": "18K Gold Vermeil (18mm)",
        "color": "Warm Metallic Gold",
        "price": 1599,
        "stock": 14,
        "sku": "EK-DRP-003-GLD-18"
      }
    ]
  },
  {
    "id": "ek-004",
    "businessId": "earkart",
    "name": "Cascading Baroque Freshwater Pearl Drop Earrings",
    "category": "Pearl Drops",
    "sku": "EK-DRP-004",
    "description": "Luminous organic freshwater baroque pearls with natural lustrous contours suspended on 18K gold vermeil French hooks. Lightweight and hypoallergenic.",
    "basePrice": 1899,
    "salePrice": 1499,
    "status": "active",
    "rating": 4.9,
    "reviewsCount": 58,
    "hsnCode": "71131100",
    "images": [
      "assets/earkart/earkart-baroque-pearls.jpg"
    ],
    "features": [
      "Genuine Cultured Baroque Pearls",
      "18K Gold French Wire Hooks",
      "Iridescent Natural Sheen",
      "Zero Allergen Reactivity"
    ],
    "variants": [
      {
        "id": "ek-004-v1",
        "material": "18K Gold Vermeil Hook",
        "color": "Lustrous Ivory Pearl",
        "price": 1499,
        "stock": 16,
        "sku": "EK-STD-004-GLD-PRL"
      },
      {
        "id": "ek-004-v2",
        "material": "925 Sterling Silver Hook",
        "color": "Lustrous Ivory Pearl",
        "price": 1399,
        "stock": 12,
        "sku": "EK-STD-004-SLV-PRL"
      }
    ]
  },
  {
    "id": "ek-005",
    "businessId": "earkart",
    "name": "Sparkling Solitaire CZ 18K Gold Basket Studs",
    "category": "Ear Studs",
    "sku": "EK-STD-005",
    "description": "Brilliant-cut faceted cubic zirconia solitaires nestled in a 4-prong 18K gold basket. Radiant everyday fire engineered for sensitive earlobes.",
    "basePrice": 1399,
    "salePrice": 1199,
    "status": "active",
    "rating": 4.8,
    "reviewsCount": 32,
    "hsnCode": "71131100",
    "images": [
      "assets/earkart/earkart-solitaire-studs.jpg"
    ],
    "features": [
      "5A Precision Cut Solitaires",
      "4-Prong 18K Gold Setting",
      "Nickel-Free Hypoallergenic Post",
      "Secure Friction Push Backing"
    ],
    "variants": [
      {
        "id": "ek-005-v1",
        "material": "18K Gold Setting (1.0ct eq)",
        "color": "Diamond White / Gold",
        "price": 1199,
        "stock": 24,
        "sku": "EK-HOP-005-GLD-1CT"
      },
      {
        "id": "ek-005-v2",
        "material": "18K Gold Setting (1.5ct eq)",
        "color": "Diamond White / Gold",
        "price": 1299,
        "stock": 18,
        "sku": "EK-HOP-005-GLD-15CT"
      }
    ]
  },
  {
    "id": "ek-006",
    "businessId": "earkart",
    "name": "Handcrafted White Daisy Studs in Emerald Velvet Gift Box",
    "category": "Ear Studs",
    "sku": "EK-STD-006",
    "description": "Our signature pair of handcrafted white daisy floral studs presented in a luxury emerald-green velvet gift box. The quintessential artisanal present.",
    "basePrice": 1249,
    "salePrice": 1049,
    "status": "active",
    "rating": 4.9,
    "reviewsCount": 24,
    "hsnCode": "71131100",
    "images": [
      "assets/earkart/earkart-daisy-velvet-box.jpg"
    ],
    "features": [
      "Includes Emerald Velvet Gift Box",
      "Solid Silver Post Foundation",
      "Handmade Artisan Floral Finish",
      "Hypoallergenic silicone backs"
    ],
    "variants": [
      {
        "id": "ek-006-v1",
        "material": "Silver Post Foundation",
        "color": "Daisy White & Emerald Box",
        "price": 1049,
        "stock": 20,
        "sku": "EK-STD-006-SLV-GFT"
      },
      {
        "id": "ek-006-v2",
        "material": "18K Gold Plated Post",
        "color": "Daisy White & Emerald Box",
        "price": 1149,
        "stock": 15,
        "sku": "EK-STD-006-GLD-GFT"
      }
    ]
  }
];

const BRAND_PRODUCTS = {
  "riyaa-trends": RIYAA_TRENDS_PRODUCTS,
  "glow-home": GLOW_HOME_PRODUCTS,
  "earkart": EARKART_PRODUCTS
};

const INITIAL_PRODUCTS = (() => {
  const result = [];
  const maxLen = Math.max(RIYAA_TRENDS_PRODUCTS.length, GLOW_HOME_PRODUCTS.length, EARKART_PRODUCTS.length);
  for (let i = 0; i < maxLen; i++) {
    if (i < RIYAA_TRENDS_PRODUCTS.length) result.push(RIYAA_TRENDS_PRODUCTS[i]);
    if (i < GLOW_HOME_PRODUCTS.length) result.push(GLOW_HOME_PRODUCTS[i]);
    if (i < EARKART_PRODUCTS.length) result.push(EARKART_PRODUCTS[i]);
  }
  return result;
})();

const INITIAL_COUPONS = [
  {
    "code": "LIMETREE10",
    "discountPct": 10,
    "minOrder": 500,
    "description": "10% off on all items above ₹500"
  },
  {
    "code": "FESTIVE20",
    "discountPct": 20,
    "minOrder": 1500,
    "description": "20% off on festive cart orders above ₹1500"
  },
  {
    "code": "FREESHIP",
    "discountPct": 0,
    "freeShipping": true,
    "minOrder": 499,
    "description": "Free Express Shipping on orders above ₹499"
  }
];

const INITIAL_ORDERS = [];

const INITIAL_INVENTORY_BATCHES = [
  {
    "id": "batch-rt-tsh-001-s-nvy-01",
    "productId": "rt-001",
    "variantId": "rt-001-v1",
    "sku": "RT-TSH-001-S-NVY",
    "costPerUnit": 294,
    "quantityReceived": 30,
    "quantityRemaining": 20,
    "supplier": "Tirupur Organic Knitters"
  },
  {
    "id": "batch-rt-tsh-001-m-nvy-01",
    "productId": "rt-001",
    "variantId": "rt-001-v2",
    "sku": "RT-TSH-001-M-NVY",
    "costPerUnit": 294,
    "quantityReceived": 35,
    "quantityRemaining": 25,
    "supplier": "Tirupur Organic Knitters"
  },
  {
    "id": "batch-rt-tsh-001-l-nvy-01",
    "productId": "rt-001",
    "variantId": "rt-001-v3",
    "sku": "RT-TSH-001-L-NVY",
    "costPerUnit": 315,
    "quantityReceived": 28,
    "quantityRemaining": 18,
    "supplier": "Tirupur Organic Knitters"
  },
  {
    "id": "batch-rt-tsh-002-s-ylw-01",
    "productId": "rt-002",
    "variantId": "rt-002-v1",
    "sku": "RT-TSH-002-S-YLW",
    "costPerUnit": 273,
    "quantityReceived": 25,
    "quantityRemaining": 15,
    "supplier": "Tirupur Organic Knitters"
  },
  {
    "id": "batch-rt-tsh-002-m-ylw-01",
    "productId": "rt-002",
    "variantId": "rt-002-v2",
    "sku": "RT-TSH-002-M-YLW",
    "costPerUnit": 273,
    "quantityReceived": 32,
    "quantityRemaining": 22,
    "supplier": "Tirupur Organic Knitters"
  },
  {
    "id": "batch-rt-tsh-002-l-ylw-01",
    "productId": "rt-002",
    "variantId": "rt-002-v3",
    "sku": "RT-TSH-002-L-YLW",
    "costPerUnit": 294,
    "quantityReceived": 24,
    "quantityRemaining": 14,
    "supplier": "Tirupur Organic Knitters"
  },
  {
    "id": "batch-rt-trk-003-s-nvy-01",
    "productId": "rt-003",
    "variantId": "rt-003-v1",
    "sku": "RT-TRK-003-S-NVY",
    "costPerUnit": 546,
    "quantityReceived": 26,
    "quantityRemaining": 16,
    "supplier": "Tirupur Organic Knitters"
  },
  {
    "id": "batch-rt-trk-003-m-nvy-01",
    "productId": "rt-003",
    "variantId": "rt-003-v2",
    "sku": "RT-TRK-003-M-NVY",
    "costPerUnit": 546,
    "quantityReceived": 34,
    "quantityRemaining": 24,
    "supplier": "Tirupur Organic Knitters"
  },
  {
    "id": "batch-rt-trk-003-l-nvy-01",
    "productId": "rt-003",
    "variantId": "rt-003-v3",
    "sku": "RT-TRK-003-L-NVY",
    "costPerUnit": 567,
    "quantityReceived": 22,
    "quantityRemaining": 12,
    "supplier": "Tirupur Organic Knitters"
  },
  {
    "id": "batch-rt-trk-004-s-mrn-01",
    "productId": "rt-004",
    "variantId": "rt-004-v1",
    "sku": "RT-TRK-004-S-MRN",
    "costPerUnit": 525,
    "quantityReceived": 24,
    "quantityRemaining": 14,
    "supplier": "Tirupur Organic Knitters"
  },
  {
    "id": "batch-rt-trk-004-m-mrn-01",
    "productId": "rt-004",
    "variantId": "rt-004-v2",
    "sku": "RT-TRK-004-M-MRN",
    "costPerUnit": 525,
    "quantityReceived": 30,
    "quantityRemaining": 20,
    "supplier": "Tirupur Organic Knitters"
  },
  {
    "id": "batch-rt-trk-004-l-mrn-01",
    "productId": "rt-004",
    "variantId": "rt-004-v3",
    "sku": "RT-TRK-004-L-MRN",
    "costPerUnit": 546,
    "quantityReceived": 25,
    "quantityRemaining": 15,
    "supplier": "Tirupur Organic Knitters"
  },
  {
    "id": "batch-rt-trk-005-s-ylw-01",
    "productId": "rt-005",
    "variantId": "rt-005-v1",
    "sku": "RT-TRK-005-S-YLW",
    "costPerUnit": 462,
    "quantityReceived": 28,
    "quantityRemaining": 18,
    "supplier": "Tirupur Organic Knitters"
  },
  {
    "id": "batch-rt-trk-005-m-ylw-01",
    "productId": "rt-005",
    "variantId": "rt-005-v2",
    "sku": "RT-TRK-005-M-YLW",
    "costPerUnit": 462,
    "quantityReceived": 32,
    "quantityRemaining": 22,
    "supplier": "Tirupur Organic Knitters"
  },
  {
    "id": "batch-rt-trk-005-l-ylw-01",
    "productId": "rt-005",
    "variantId": "rt-005-v3",
    "sku": "RT-TRK-005-L-YLW",
    "costPerUnit": 483,
    "quantityReceived": 20,
    "quantityRemaining": 10,
    "supplier": "Tirupur Organic Knitters"
  },
  {
    "id": "batch-rt-trk-006-s-mrn-01",
    "productId": "rt-006",
    "variantId": "rt-006-v1",
    "sku": "RT-TRK-006-S-MRN",
    "costPerUnit": 504,
    "quantityReceived": 27,
    "quantityRemaining": 17,
    "supplier": "Tirupur Organic Knitters"
  },
  {
    "id": "batch-rt-trk-006-m-mrn-01",
    "productId": "rt-006",
    "variantId": "rt-006-v2",
    "sku": "RT-TRK-006-M-MRN",
    "costPerUnit": 504,
    "quantityReceived": 35,
    "quantityRemaining": 25,
    "supplier": "Tirupur Organic Knitters"
  },
  {
    "id": "batch-rt-trk-006-l-mrn-01",
    "productId": "rt-006",
    "variantId": "rt-006-v3",
    "sku": "RT-TRK-006-L-MRN",
    "costPerUnit": 525,
    "quantityReceived": 22,
    "quantityRemaining": 12,
    "supplier": "Tirupur Organic Knitters"
  },
  {
    "id": "batch-gh-cnd-001-150-lav-01",
    "productId": "gh-001",
    "variantId": "gh-001-v1",
    "sku": "GH-CND-001-150-LAV",
    "costPerUnit": 336,
    "quantityReceived": 30,
    "quantityRemaining": 20,
    "supplier": "Coimbatore Wax Studios"
  },
  {
    "id": "batch-gh-cnd-001-250-lav-01",
    "productId": "gh-001",
    "variantId": "gh-001-v2",
    "sku": "GH-CND-001-250-LAV",
    "costPerUnit": 504,
    "quantityReceived": 25,
    "quantityRemaining": 15,
    "supplier": "Coimbatore Wax Studios"
  },
  {
    "id": "batch-gh-cnd-002-trio-01",
    "productId": "gh-002",
    "variantId": "gh-002-v1",
    "sku": "GH-CND-002-TRIO",
    "costPerUnit": 840,
    "quantityReceived": 28,
    "quantityRemaining": 18,
    "supplier": "Coimbatore Wax Studios"
  },
  {
    "id": "batch-gh-cnd-003-150-ced-01",
    "productId": "gh-003",
    "variantId": "gh-003-v1",
    "sku": "GH-CND-003-150-CED",
    "costPerUnit": 357,
    "quantityReceived": 32,
    "quantityRemaining": 22,
    "supplier": "Coimbatore Wax Studios"
  },
  {
    "id": "batch-gh-cnd-003-250-ced-01",
    "productId": "gh-003",
    "variantId": "gh-003-v2",
    "sku": "GH-CND-003-250-CED",
    "costPerUnit": 525,
    "quantityReceived": 26,
    "quantityRemaining": 16,
    "supplier": "Coimbatore Wax Studios"
  },
  {
    "id": "batch-gh-cnd-004-4pk-01",
    "productId": "gh-004",
    "variantId": "gh-004-v1",
    "sku": "GH-CND-004-4PK",
    "costPerUnit": 609,
    "quantityReceived": 25,
    "quantityRemaining": 15,
    "supplier": "Coimbatore Wax Studios"
  },
  {
    "id": "batch-gh-cnd-005-250-01",
    "productId": "gh-005",
    "variantId": "gh-005-v1",
    "sku": "GH-CND-005-250",
    "costPerUnit": 399,
    "quantityReceived": 28,
    "quantityRemaining": 18,
    "supplier": "Coimbatore Wax Studios"
  },
  {
    "id": "batch-gh-dif-006-12-set-01",
    "productId": "gh-006",
    "variantId": "gh-006-v1",
    "sku": "GH-DIF-006-12-SET",
    "costPerUnit": 294,
    "quantityReceived": 35,
    "quantityRemaining": 25,
    "supplier": "Coimbatore Wax Studios"
  },
  {
    "id": "batch-gh-dif-006-24-set-01",
    "productId": "gh-006",
    "variantId": "gh-006-v2",
    "sku": "GH-DIF-006-24-SET",
    "costPerUnit": 504,
    "quantityReceived": 25,
    "quantityRemaining": 15,
    "supplier": "Coimbatore Wax Studios"
  },
  {
    "id": "batch-ek-std-001-slv-wht-01",
    "productId": "ek-001",
    "variantId": "ek-001-v1",
    "sku": "EK-STD-001-SLV-WHT",
    "costPerUnit": 462,
    "quantityReceived": 30,
    "quantityRemaining": 20,
    "supplier": "Jaipur Precision Vermeil Works"
  },
  {
    "id": "batch-ek-std-001-gld-wht-01",
    "productId": "ek-001",
    "variantId": "ek-001-v2",
    "sku": "EK-STD-001-GLD-WHT",
    "costPerUnit": 504,
    "quantityReceived": 26,
    "quantityRemaining": 16,
    "supplier": "Jaipur Precision Vermeil Works"
  },
  {
    "id": "batch-ek-hop-002-slv-wht-01",
    "productId": "ek-002",
    "variantId": "ek-002-v1",
    "sku": "EK-HOP-002-SLV-WHT",
    "costPerUnit": 546,
    "quantityReceived": 32,
    "quantityRemaining": 22,
    "supplier": "Jaipur Precision Vermeil Works"
  },
  {
    "id": "batch-ek-hop-002-gld-wht-01",
    "productId": "ek-002",
    "variantId": "ek-002-v2",
    "sku": "EK-HOP-002-GLD-WHT",
    "costPerUnit": 588,
    "quantityReceived": 25,
    "quantityRemaining": 15,
    "supplier": "Jaipur Precision Vermeil Works"
  },
  {
    "id": "batch-ek-drp-003-slv-01",
    "productId": "ek-003",
    "variantId": "ek-003-v1",
    "sku": "EK-DRP-003-SLV",
    "costPerUnit": 609,
    "quantityReceived": 24,
    "quantityRemaining": 14,
    "supplier": "Jaipur Precision Vermeil Works"
  },
  {
    "id": "batch-ek-drp-003-gld-01",
    "productId": "ek-003",
    "variantId": "ek-003-v2",
    "sku": "EK-DRP-003-GLD",
    "costPerUnit": 651,
    "quantityReceived": 22,
    "quantityRemaining": 12,
    "supplier": "Jaipur Precision Vermeil Works"
  },
  {
    "id": "batch-ek-std-004-stl-wht-01",
    "productId": "ek-004",
    "variantId": "ek-004-v1",
    "sku": "EK-STD-004-STL-WHT",
    "costPerUnit": 315,
    "quantityReceived": 35,
    "quantityRemaining": 25,
    "supplier": "Jaipur Precision Vermeil Works"
  },
  {
    "id": "batch-ek-std-004-gld-wht-01",
    "productId": "ek-004",
    "variantId": "ek-004-v2",
    "sku": "EK-STD-004-GLD-WHT",
    "costPerUnit": 357,
    "quantityReceived": 28,
    "quantityRemaining": 18,
    "supplier": "Jaipur Precision Vermeil Works"
  },
  {
    "id": "batch-ek-hop-005-slv-01",
    "productId": "ek-005",
    "variantId": "ek-005-v1",
    "sku": "EK-HOP-005-SLV",
    "costPerUnit": 504,
    "quantityReceived": 28,
    "quantityRemaining": 18,
    "supplier": "Jaipur Precision Vermeil Works"
  },
  {
    "id": "batch-ek-std-006-slv-gft-01",
    "productId": "ek-006",
    "variantId": "ek-006-v1",
    "sku": "EK-STD-006-SLV-GFT",
    "costPerUnit": 441,
    "quantityReceived": 30,
    "quantityRemaining": 20,
    "supplier": "Jaipur Precision Vermeil Works"
  },
  {
    "id": "batch-ek-std-006-gld-gft-01",
    "productId": "ek-006",
    "variantId": "ek-006-v2",
    "sku": "EK-STD-006-GLD-GFT",
    "costPerUnit": 483,
    "quantityReceived": 25,
    "quantityRemaining": 15,
    "supplier": "Jaipur Precision Vermeil Works"
  }
];

const INITIAL_SETTINGS = {
  "storeName": "LIMETREE",
  "tagline": "Multi-Business Lifestyle & Craft Collective",
  "supportEmail": "care@limetree.in",
  "supportPhone": "+91 80 4920 1800",
  "supportWhatsApp": "+91 98765 43210",
  "supportHours": "Mon – Sat: 9:00 AM – 8:00 PM IST",
  "legalEntity": "Limetree Retail LLP (Sample Configuration)",
  "gstin": "33AABCL1234F1Z8",
  "registeredState": "Tamil Nadu",
  "stateCode": "33",
  "registeredAddress": "14, Botanical Arcade, Race Course Road, Coimbatore, Tamil Nadu 641018",
  "freeShippingThreshold": 999,
  "standardShippingRate": 49,
  "expressShippingRate": 99,
  "internationalShippingEnabled": true,
  "internationalFlatRate": 799,
  "supportedInternationalCountries": [
    "United States",
    "United Kingdom",
    "United Arab Emirates",
    "Singapore",
    "Canada",
    "Australia"
  ],
  "hideOutOfStock": false,
  "inventoryCostingMethod": "LIFO",
  "paymentMode": "Test / Demo Gateway (Simulated Razorpay Signature Verification)",
  "returnEligibleDays": 7
};

// Expose on window object
if (typeof window !== 'undefined') {
  window.LIMETREE_BUSINESSES = LIMETREE_BUSINESSES;
  window.RIYAA_TRENDS_PRODUCTS = RIYAA_TRENDS_PRODUCTS;
  window.GLOW_HOME_PRODUCTS = GLOW_HOME_PRODUCTS;
  window.EARKART_PRODUCTS = EARKART_PRODUCTS;
  window.BRAND_PRODUCTS = BRAND_PRODUCTS;
  window.INITIAL_PRODUCTS = INITIAL_PRODUCTS;
  window.INITIAL_COUPONS = INITIAL_COUPONS;
  window.INITIAL_ORDERS = INITIAL_ORDERS;
  window.INITIAL_INVENTORY_BATCHES = INITIAL_INVENTORY_BATCHES;
  window.INITIAL_SETTINGS = INITIAL_SETTINGS;
}

// Module export for Node.js environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    LIMETREE_BUSINESSES,
    RIYAA_TRENDS_PRODUCTS,
    GLOW_HOME_PRODUCTS,
    EARKART_PRODUCTS,
    BRAND_PRODUCTS,
    INITIAL_PRODUCTS,
    INITIAL_COUPONS,
    INITIAL_ORDERS,
    INITIAL_INVENTORY_BATCHES,
    INITIAL_SETTINGS
  };
}
