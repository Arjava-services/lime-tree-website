/**
 * LIMETREE - Core Data Definitions and Expanded Seed Catalog
 * Every single image from extracted_media and assets is configured as an orderable product!
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
        "id": "rt-001-v1",
        "size": "S (4-5 Yrs)",
        "color": "Navy Graphic",
        "price": 699,
        "stock": 20,
        "sku": "RT-TSH-001-S-NVY"
      },
      {
        "id": "rt-001-v2",
        "size": "M (6-7 Yrs)",
        "color": "Navy Graphic",
        "price": 699,
        "stock": 25,
        "sku": "RT-TSH-001-M-NVY"
      },
      {
        "id": "rt-001-v3",
        "size": "L (8-9 Yrs)",
        "color": "Navy Graphic",
        "price": 749,
        "stock": 18,
        "sku": "RT-TSH-001-L-NVY"
      }
    ]
  },
  {
    "id": "rt-002",
    "businessId": "riyaa-trends",
    "name": "Kids Sunshine Yellow Casual Everyday T-Shirt",
    "category": "T-Shirts",
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
        "id": "rt-002-v1",
        "size": "S (4-5 Yrs)",
        "color": "Sunshine Yellow",
        "price": 649,
        "stock": 15,
        "sku": "RT-TSH-002-S-YLW"
      },
      {
        "id": "rt-002-v2",
        "size": "M (6-7 Yrs)",
        "color": "Sunshine Yellow",
        "price": 649,
        "stock": 22,
        "sku": "RT-TSH-002-M-YLW"
      },
      {
        "id": "rt-002-v3",
        "size": "L (8-9 Yrs)",
        "color": "Sunshine Yellow",
        "price": 699,
        "stock": 14,
        "sku": "RT-TSH-002-L-YLW"
      }
    ]
  },
  {
    "id": "rt-003",
    "businessId": "riyaa-trends",
    "name": "Girls Navy Blue Sporty Loungewear Tracksuit Set",
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
        "id": "rt-003-v1",
        "size": "S (4-5 Yrs)",
        "color": "Navy Blue",
        "price": 1299,
        "stock": 16,
        "sku": "RT-TRK-003-S-NVY"
      },
      {
        "id": "rt-003-v2",
        "size": "M (6-7 Yrs)",
        "color": "Navy Blue",
        "price": 1299,
        "stock": 24,
        "sku": "RT-TRK-003-M-NVY"
      },
      {
        "id": "rt-003-v3",
        "size": "L (8-9 Yrs)",
        "color": "Navy Blue",
        "price": 1349,
        "stock": 12,
        "sku": "RT-TRK-003-L-NVY"
      }
    ]
  },
  {
    "id": "rt-004",
    "businessId": "riyaa-trends",
    "name": "Boys Maroon Urban Performance Tracksuit",
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
        "id": "rt-004-v1",
        "size": "S (4-5 Yrs)",
        "color": "Maroon Berry",
        "price": 1249,
        "stock": 14,
        "sku": "RT-TRK-004-S-MRN"
      },
      {
        "id": "rt-004-v2",
        "size": "M (6-7 Yrs)",
        "color": "Maroon Berry",
        "price": 1249,
        "stock": 20,
        "sku": "RT-TRK-004-M-MRN"
      },
      {
        "id": "rt-004-v3",
        "size": "L (8-9 Yrs)",
        "color": "Maroon Berry",
        "price": 1299,
        "stock": 15,
        "sku": "RT-TRK-004-L-MRN"
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
        "id": "rt-005-v1",
        "size": "S (4-5 Yrs)",
        "color": "Sunshine Yellow",
        "price": 1099,
        "stock": 18,
        "sku": "RT-TRK-005-S-YLW"
      },
      {
        "id": "rt-005-v2",
        "size": "M (6-7 Yrs)",
        "color": "Sunshine Yellow",
        "price": 1099,
        "stock": 22,
        "sku": "RT-TRK-005-M-YLW"
      },
      {
        "id": "rt-005-v3",
        "size": "L (8-9 Yrs)",
        "color": "Sunshine Yellow",
        "price": 1149,
        "stock": 10,
        "sku": "RT-TRK-005-L-YLW"
      }
    ]
  },
  {
    "id": "rt-006",
    "businessId": "riyaa-trends",
    "name": "Boys Fast-Paced Athletic Running Joggers",
    "category": "Trackpants",
    "sku": "RT-TRK-006",
    "description": "Tailored for energetic outdoor sprint and play. Engineered with reinforced knee gussets and a soft non-chafing interior waistband.",
    "basePrice": 1399,
    "salePrice": 1199,
    "status": "active",
    "rating": 4.9,
    "reviewsCount": 36,
    "hsnCode": "61034200",
    "images": [
      "assets/riyaa-trends/IMG-20260222-WA0048.jpg"
    ],
    "features": [
      "Heavyweight 320 GSM Cotton",
      "Reinforced Double-Stitch Hems",
      "Deep Phone/Key Pocket",
      "Colorfast Guarantee"
    ],
    "variants": [
      {
        "id": "rt-006-v1",
        "size": "S (4-5 Yrs)",
        "color": "Deep Maroon",
        "price": 1199,
        "stock": 17,
        "sku": "RT-TRK-006-S-MRN"
      },
      {
        "id": "rt-006-v2",
        "size": "M (6-7 Yrs)",
        "color": "Deep Maroon",
        "price": 1199,
        "stock": 25,
        "sku": "RT-TRK-006-M-MRN"
      },
      {
        "id": "rt-006-v3",
        "size": "L (8-9 Yrs)",
        "color": "Deep Maroon",
        "price": 1249,
        "stock": 12,
        "sku": "RT-TRK-006-L-MRN"
      }
    ]
  },
  {
    "id": "rt-007",
    "businessId": "riyaa-trends",
    "name": "Kids Trampoline Active Play Shorts & Tees Set",
    "category": "Shorts",
    "sku": "RT-SHR-007",
    "description": "High-energy trampoline and playground set crafted from lightweight, tear-resistant ripstop cotton. Lets kids jump, climb, and sprint with complete freedom.",
    "basePrice": 1199,
    "salePrice": 999,
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
        "id": "rt-007-v1",
        "size": "S (4-5 Yrs)",
        "color": "Multi Active",
        "price": 999,
        "stock": 18,
        "sku": "RT-SHR-007-S-ACT"
      },
      {
        "id": "rt-007-v2",
        "size": "M (6-7 Yrs)",
        "color": "Multi Active",
        "price": 999,
        "stock": 26,
        "sku": "RT-SHR-007-M-ACT"
      },
      {
        "id": "rt-007-v3",
        "size": "L (8-9 Yrs)",
        "color": "Multi Active",
        "price": 1049,
        "stock": 15,
        "sku": "RT-SHR-007-L-ACT"
      }
    ]
  },
  {
    "id": "rt-008",
    "businessId": "riyaa-trends",
    "name": "Kids Bedtime Cozy Printed Cotton Tees (Trio Set)",
    "category": "T-Shirts",
    "sku": "RT-TSH-008",
    "description": "Ultra-gentle combed cotton loungewear t-shirts. Designed for lazy mornings, bedtime reading, and snuggly comfort with breathable hypoallergenic cotton.",
    "basePrice": 1299,
    "salePrice": 1099,
    "status": "active",
    "rating": 4.9,
    "reviewsCount": 31,
    "hsnCode": "61091000",
    "images": [
      "assets/riyaa-trends/IMG-20260222-WA0056.jpg"
    ],
    "features": [
      "100% Combed Natural Cotton",
      "Featherlight Breathable Weave",
      "Smooth Flatlock Stitches",
      "Machine Washable"
    ],
    "variants": [
      {
        "id": "rt-008-v1",
        "size": "S (4-5 Yrs)",
        "color": "Pastel Trio",
        "price": 1099,
        "stock": 20,
        "sku": "RT-TSH-008-S-PAS"
      },
      {
        "id": "rt-008-v2",
        "size": "M (6-7 Yrs)",
        "color": "Pastel Trio",
        "price": 1099,
        "stock": 25,
        "sku": "RT-TSH-008-M-PAS"
      },
      {
        "id": "rt-008-v3",
        "size": "L (8-9 Yrs)",
        "color": "Pastel Trio",
        "price": 1149,
        "stock": 14,
        "sku": "RT-TSH-008-L-PAS"
      }
    ]
  },
  {
    "id": "rt-009",
    "businessId": "riyaa-trends",
    "name": "Kids Outdoor Adventure Tracksuit & Top Combo",
    "category": "Trackpants",
    "sku": "RT-TRK-009",
    "description": "Three-friend outdoor adventure set featuring durable cotton trackpants and coordinated graphic tees. Perfect for sibling matching and nature strolls.",
    "basePrice": 1599,
    "salePrice": 1399,
    "status": "active",
    "rating": 4.8,
    "reviewsCount": 27,
    "hsnCode": "61034200",
    "images": [
      "assets/riyaa-trends/IMG-20260222-WA0057.jpg"
    ],
    "features": [
      "Cotton Terry + Interlock Knit",
      "Reinforced Pockets",
      "Anti-Chafing Inner Lining",
      "Flexible Ankle Cuffs"
    ],
    "variants": [
      {
        "id": "rt-009-v1",
        "size": "S (4-5 Yrs)",
        "color": "Forest & Maroon",
        "price": 1399,
        "stock": 16,
        "sku": "RT-TRK-009-S-MIX"
      },
      {
        "id": "rt-009-v2",
        "size": "M (6-7 Yrs)",
        "color": "Forest & Maroon",
        "price": 1399,
        "stock": 22,
        "sku": "RT-TRK-009-M-MIX"
      },
      {
        "id": "rt-009-v3",
        "size": "L (8-9 Yrs)",
        "color": "Forest & Maroon",
        "price": 1449,
        "stock": 11,
        "sku": "RT-TRK-009-L-MIX"
      }
    ]
  },
  {
    "id": "rt-010",
    "businessId": "riyaa-trends",
    "name": "Kids Summer Camp Graphic Tees & Shorts Set",
    "category": "Shorts",
    "sku": "RT-SHR-010",
    "description": "Classic summer camp look with printed character t-shirts and soft elastic shorts. Cool, absorbent, and engineered to endure daily laundry washes.",
    "basePrice": 1099,
    "salePrice": 899,
    "status": "active",
    "rating": 4.9,
    "reviewsCount": 39,
    "hsnCode": "62034200",
    "images": [
      "assets/riyaa-trends/IMG-20260222-WA0058.jpg"
    ],
    "features": [
      "100% Breathable Cotton",
      "Durable Twin-Needle Seams",
      "Soft Stretchy Waistband",
      "Vibrant Child-Safe Inks"
    ],
    "variants": [
      {
        "id": "rt-010-v1",
        "size": "S (4-5 Yrs)",
        "color": "Summer Multi",
        "price": 899,
        "stock": 19,
        "sku": "RT-SHR-010-S-SMR"
      },
      {
        "id": "rt-010-v2",
        "size": "M (6-7 Yrs)",
        "color": "Summer Multi",
        "price": 899,
        "stock": 24,
        "sku": "RT-SHR-010-M-SMR"
      },
      {
        "id": "rt-010-v3",
        "size": "L (8-9 Yrs)",
        "color": "Summer Multi",
        "price": 949,
        "stock": 16,
        "sku": "RT-SHR-010-L-SMR"
      }
    ]
  },
  {
    "id": "rt-011",
    "businessId": "riyaa-trends",
    "name": "Kids Signature Organic Cotton Graphic Tees Trio",
    "category": "T-Shirts",
    "sku": "RT-TSH-011",
    "description": "Our flagship trio photoshoot graphic tees in Mustard, Sky Blue, and Sage Green. Distinctive characters printed on premium 240 GSM organic ring-spun cotton.",
    "basePrice": 999,
    "salePrice": 799,
    "status": "active",
    "rating": 5,
    "reviewsCount": 62,
    "hsnCode": "61091000",
    "images": [
      "assets/riyaa-trends/IMG-20260222-WA0060.jpg"
    ],
    "features": [
      "240 GSM Ring-Spun Cotton",
      "Lycra Neckband Holds Shape",
      "Oeko-Tex Standard 100 Safe",
      "Pre-Shrunk Bio-Wash"
    ],
    "variants": [
      {
        "id": "rt-011-v1",
        "size": "S (4-5 Yrs)",
        "color": "Sage Green",
        "price": 799,
        "stock": 25,
        "sku": "RT-TSH-011-S-SGE"
      },
      {
        "id": "rt-011-v2",
        "size": "M (6-7 Yrs)",
        "color": "Sage Green",
        "price": 799,
        "stock": 30,
        "sku": "RT-TSH-011-M-SGE"
      },
      {
        "id": "rt-011-v3",
        "size": "L (8-9 Yrs)",
        "color": "Sage Green",
        "price": 849,
        "stock": 20,
        "sku": "RT-TSH-011-L-SGE"
      }
    ]
  },
  {
    "id": "rt-012",
    "businessId": "riyaa-trends",
    "name": "Kids Puppy Walk Outdoor Tracksuit & Tee Set",
    "category": "Trackpants",
    "sku": "RT-TRK-012",
    "description": "Adorably styled playful tracksuit set captured on location walking with a cute puppy. Crafted from soft interlock cotton that withstands dirt and lawn tumble.",
    "basePrice": 1599,
    "salePrice": 1349,
    "status": "active",
    "rating": 4.9,
    "reviewsCount": 45,
    "hsnCode": "61034200",
    "images": [
      "assets/riyaa-trends/IMG-20260222-WA0061.jpg"
    ],
    "features": [
      "High-Drape Cotton Blend",
      "Easy Elasticated Pull-On",
      "Side Cargo Style Pockets",
      "Anti-Static Bio-Soft Finish"
    ],
    "variants": [
      {
        "id": "rt-012-v1",
        "size": "S (4-5 Yrs)",
        "color": "Pastel Trio & Navy",
        "price": 1349,
        "stock": 15,
        "sku": "RT-TRK-012-S-MIX"
      },
      {
        "id": "rt-012-v2",
        "size": "M (6-7 Yrs)",
        "color": "Pastel Trio & Navy",
        "price": 1349,
        "stock": 23,
        "sku": "RT-TRK-012-M-MIX"
      },
      {
        "id": "rt-012-v3",
        "size": "L (8-9 Yrs)",
        "color": "Pastel Trio & Navy",
        "price": 1399,
        "stock": 14,
        "sku": "RT-TRK-012-L-MIX"
      }
    ]
  },
  {
    "id": "rt-013",
    "businessId": "riyaa-trends",
    "name": "Kids Cheerful Matching Siblings Co-ord Set",
    "category": "Trackpants",
    "sku": "RT-TRK-013",
    "description": "Harmonious family styling featuring pastel yellow tops and deep joggers. Soft against delicate children skin with non-constrictive tailoring.",
    "basePrice": 1499,
    "salePrice": 1299,
    "status": "active",
    "rating": 4.8,
    "reviewsCount": 28,
    "hsnCode": "61034200",
    "images": [
      "assets/riyaa-trends/IMG-20260222-WA0062.jpg"
    ],
    "features": [
      "Interlock Combed Cotton",
      "Comfort Stretch Ribbing",
      "Eco-Friendly Inks",
      "Easy Machine Wash"
    ],
    "variants": [
      {
        "id": "rt-013-v1",
        "size": "S (4-5 Yrs)",
        "color": "Sunny Co-ord",
        "price": 1299,
        "stock": 18,
        "sku": "RT-TRK-013-S-SNY"
      },
      {
        "id": "rt-013-v2",
        "size": "M (6-7 Yrs)",
        "color": "Sunny Co-ord",
        "price": 1299,
        "stock": 22,
        "sku": "RT-TRK-013-M-SNY"
      },
      {
        "id": "rt-013-v3",
        "size": "L (8-9 Yrs)",
        "color": "Sunny Co-ord",
        "price": 1349,
        "stock": 15,
        "sku": "RT-TRK-013-L-SNY"
      }
    ]
  },
  {
    "id": "rt-014",
    "businessId": "riyaa-trends",
    "name": "Kids Pastel Loungewear Trackpants & Tops Set",
    "category": "Trackpants",
    "sku": "RT-TRK-014",
    "description": "Charming pastel pink, yellow, and navy tracksuit ensemble. Perfect for weekend gatherings, play dates, and casual birthday celebrations.",
    "basePrice": 1599,
    "salePrice": 1349,
    "status": "active",
    "rating": 4.9,
    "reviewsCount": 33,
    "hsnCode": "61034200",
    "images": [
      "assets/riyaa-trends/IMG-20260222-WA0063.jpg"
    ],
    "features": [
      "Pastel Cotton Terry Fabric",
      "Relaxed Comfort Fit",
      "Reinforced Pocket Stitching",
      "Soft Breathable Feel"
    ],
    "variants": [
      {
        "id": "rt-014-v1",
        "size": "S (4-5 Yrs)",
        "color": "Pastel Trio Set",
        "price": 1349,
        "stock": 16,
        "sku": "RT-TRK-014-S-PST"
      },
      {
        "id": "rt-014-v2",
        "size": "M (6-7 Yrs)",
        "color": "Pastel Trio Set",
        "price": 1349,
        "stock": 24,
        "sku": "RT-TRK-014-M-PST"
      },
      {
        "id": "rt-014-v3",
        "size": "L (8-9 Yrs)",
        "color": "Pastel Trio Set",
        "price": 1399,
        "stock": 12,
        "sku": "RT-TRK-014-L-PST"
      }
    ]
  },
  {
    "id": "rt-015",
    "businessId": "riyaa-trends",
    "name": "Kids Athletic Trackpants & Graphic Tee Sport Duo",
    "category": "Trackpants",
    "sku": "RT-TRK-015",
    "description": "Coordinated athletic sportswear ensemble. Lightweight 240 GSM combed cotton crewneck paired with reinforced French terry athletic joggers. Built for playground energy.",
    "basePrice": 1699,
    "salePrice": 1399,
    "status": "active",
    "rating": 4.9,
    "reviewsCount": 38,
    "hsnCode": "61034200",
    "images": [
      "assets/riyaa-trends/IMG-20260222-WA0048.jpg",
      "assets/riyaa-trends/IMG-20260222-WA0055.jpg"
    ],
    "features": [
      "100% Bio-Wash Combed Cotton",
      "French Terry Reinforced Knees",
      "Elastic Drawstring Ankle Joggers",
      "Fade-Resistant Inks"
    ],
    "variants": [
      {
        "id": "rt-015-v1",
        "size": "S (4-5 Yrs)",
        "color": "Maroon & Navy Duo",
        "price": 1399,
        "stock": 18,
        "sku": "RT-TRK-015-S-MRN"
      },
      {
        "id": "rt-015-v2",
        "size": "M (6-7 Yrs)",
        "color": "Maroon & Navy Duo",
        "price": 1399,
        "stock": 24,
        "sku": "RT-TRK-015-M-MRN"
      },
      {
        "id": "rt-015-v3",
        "size": "L (8-9 Yrs)",
        "color": "Maroon & Navy Duo",
        "price": 1449,
        "stock": 14,
        "sku": "RT-TRK-015-L-MRN"
      }
    ]
  },
  {
    "id": "rt-016",
    "businessId": "riyaa-trends",
    "name": "Kids Everyday Sunshine Playtime Cotton Capsule Set",
    "category": "T-Shirts",
    "sku": "RT-TSH-016",
    "description": "Bright sunshine yellow and sky blue weekend outfit set. Pre-washed for velvety handfeel and skin-friendly breathability during active outdoor afternoons.",
    "basePrice": 1199,
    "salePrice": 949,
    "status": "active",
    "rating": 4.8,
    "reviewsCount": 31,
    "hsnCode": "61091000",
    "images": [
      "assets/riyaa-trends/IMG-20260222-WA0057.jpg",
      "assets/riyaa-trends/IMG-20260222-WA0061.jpg"
    ],
    "features": [
      "Oeko-Tex Certified Natural Dyes",
      "Ribbed Lycra Collar",
      "Anti-Shrink Fabric",
      "Double-Needle Hemming"
    ],
    "variants": [
      {
        "id": "rt-016-v1",
        "size": "S (4-5 Yrs)",
        "color": "Sunshine Blue",
        "price": 949,
        "stock": 15,
        "sku": "RT-TSH-016-S-BLU"
      },
      {
        "id": "rt-016-v2",
        "size": "M (6-7 Yrs)",
        "color": "Sunshine Blue",
        "price": 949,
        "stock": 22,
        "sku": "RT-TSH-016-M-BLU"
      },
      {
        "id": "rt-016-v3",
        "size": "L (8-9 Yrs)",
        "color": "Sunshine Blue",
        "price": 999,
        "stock": 16,
        "sku": "RT-TSH-016-L-BLU"
      }
    ]
  }
];

const GLOW_HOME_PRODUCTS = [
  {
    "id": "gh-001",
    "businessId": "glow-home",
    "name": "Artisan Golden Amber Glass Jar Scented Candle",
    "category": "Scented Candles",
    "sku": "GH-CND-001",
    "description": "Pure artisanal sunshine in a glass vessel. Hand-poured with golden botanical wax, natural centered cotton wicks, and rich calming aromatic notes.",
    "basePrice": 899,
    "salePrice": 799,
    "status": "active",
    "rating": 4.9,
    "reviewsCount": 64,
    "hsnCode": "34060010",
    "images": [
      "assets/glow-home/IMG_20260816_171236.jpg",
      "assets/glow-home/IMG_20260816_171246.jpg",
      "assets/glow-home/IMG_20260816_171305.jpg"
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
    "category": "Scented Candles",
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
    "name": "Warm Molten Honey Beeswax Tin Candle",
    "category": "Scented Candles",
    "sku": "GH-CND-003",
    "description": "Freshly cast molten golden wax poured into durable metallic travel tins. Releases comforting earthy honey tones and warm ambient luminescence.",
    "basePrice": 949,
    "salePrice": 849,
    "status": "active",
    "rating": 4.9,
    "reviewsCount": 43,
    "hsnCode": "34060010",
    "images": [
      "assets/glow-home/IMG_20260906_112045.jpg",
      "assets/glow-home/IMG_20260906_112110.jpg"
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
    "name": "Handcrafted Workshop Travel Tin Candles (Set of 4)",
    "category": "Scented Candles",
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
    "name": "Pure Soy Studio Workshop Tin Candle Collection",
    "category": "Scented Candles",
    "sku": "GH-CND-005",
    "description": "Crafted with precision wick placement clips in small studio batches. Delivers a clean, even melt pool that fills rooms with pure sandalwood and amber notes.",
    "basePrice": 1099,
    "salePrice": 949,
    "status": "active",
    "rating": 4.9,
    "reviewsCount": 36,
    "hsnCode": "34060010",
    "images": [
      "assets/glow-home/IMG_20260906_121557.jpg",
      "assets/glow-home/IMG_20260906_121612.jpg"
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
    "category": "Diffusers",
    "sku": "GH-DIF-006",
    "description": "Colorful collection of hand-poured artisan votives and wax melts in pastel blue, coral, and lavender. Perfect for festive trays and evening ambiance.",
    "basePrice": 799,
    "salePrice": 699,
    "status": "active",
    "rating": 4.8,
    "reviewsCount": 29,
    "hsnCode": "34060010",
    "images": [
      "assets/glow-home/IMG_20260927_124013.jpg",
      "assets/glow-home/IMG_20260927_124019.jpg"
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
  },
  {
    "id": "gh-007",
    "businessId": "glow-home",
    "name": "Candy Pastel Fragrance Aroma Wax Discs & Cubes",
    "category": "Room Mists",
    "sku": "GH-MST-007",
    "description": "Flame-free circular wax discs and pastel cubes. Crafted in a spectrum of soft candy pastels for wax warmers, linen closets, and decorative centerpieces.",
    "basePrice": 699,
    "salePrice": 599,
    "status": "active",
    "rating": 4.7,
    "reviewsCount": 18,
    "hsnCode": "34060010",
    "images": [
      "assets/glow-home/IMG_20260927_164632.jpg",
      "assets/glow-home/IMG_20260927_164654.jpg"
    ],
    "features": [
      "High Throw Scented Wax Melts",
      "Vibrant Pastel Palette",
      "Non-toxic Natural Ingredients",
      "Pack of 16 Wax Pieces"
    ],
    "variants": [
      {
        "id": "gh-007-v1",
        "fragrance": "Sweet Florals & Citrus",
        "size": "Pack of 16 Melts",
        "price": 599,
        "stock": 21,
        "sku": "GH-MST-007-16-WXM"
      }
    ]
  },
  {
    "id": "gh-008",
    "businessId": "glow-home",
    "name": "Handcrafted Clear-Cup Tealights (Box of 12)",
    "category": "Scented Candles",
    "sku": "GH-CND-008",
    "description": "Fresh batch of transparent cup tealight candles. Clean-burning with self-trimming cotton wicks that provide 4.5 hours of steady flickering light each.",
    "basePrice": 799,
    "salePrice": 649,
    "status": "active",
    "rating": 4.9,
    "reviewsCount": 51,
    "hsnCode": "34060010",
    "images": [
      "assets/glow-home/IMG_20260927_183306.jpg",
      "assets/glow-home/IMG_20260927_183314.jpg"
    ],
    "features": [
      "12 Clear-Cup Tealights",
      "4.5 Hour Clean Flame Each",
      "Lead-Free Braided Wick",
      "Smokeless & Odorless Wax Base"
    ],
    "variants": [
      {
        "id": "gh-008-v1",
        "fragrance": "Soothing Calm",
        "size": "Box of 12 Tealights",
        "price": 649,
        "stock": 28,
        "sku": "GH-CND-008-12P"
      },
      {
        "id": "gh-008-v2",
        "fragrance": "Soothing Calm",
        "size": "Box of 24 Tealights",
        "price": 1099,
        "stock": 16,
        "sku": "GH-CND-008-24P"
      }
    ]
  },
  {
    "id": "gh-009",
    "businessId": "glow-home",
    "name": "Festive Hand-Crafted Candle Studio Tealight Tray",
    "category": "Scented Candles",
    "sku": "GH-CND-009",
    "description": "Large celebratory arrangement of fresh studio tealights. Perfect for Diwali, festive dinner parties, floating candle bowls, and patio lanterns.",
    "basePrice": 1199,
    "salePrice": 999,
    "status": "active",
    "rating": 4.9,
    "reviewsCount": 39,
    "hsnCode": "34060010",
    "images": [
      "assets/glow-home/IMG_20260927_183322.jpg",
      "assets/glow-home/IMG_20260927_183327.jpg"
    ],
    "features": [
      "High-Purity Botanical Soy Wax",
      "Even Flame Distribution",
      "Zero Black Smoke",
      "Bulk Festive Tray (20 Pcs)"
    ],
    "variants": [
      {
        "id": "gh-009-v1",
        "fragrance": "Festive Glow",
        "size": "Tray of 20 Tealights",
        "price": 999,
        "stock": 20,
        "sku": "GH-CND-009-20P"
      }
    ]
  },
  {
    "id": "gh-010",
    "businessId": "glow-home",
    "name": "Aromatherapy Hand-Poured Candle Studio Batch (24 Pcs)",
    "category": "Scented Candles",
    "sku": "GH-CND-010",
    "description": "Bulk workshop batch of cured tealights infused with calming eucalyptus, mint, and lavender essential oils. Creates a peaceful sanctuary in every room.",
    "basePrice": 1499,
    "salePrice": 1249,
    "status": "active",
    "rating": 5,
    "reviewsCount": 42,
    "hsnCode": "34060010",
    "images": [
      "assets/glow-home/IMG_20260927_183339.jpg",
      "assets/glow-home/IMG_20260927_183345.jpg",
      "assets/glow-home/IMG_20260927_185459.jpg"
    ],
    "features": [
      "24 Precision Cast Cups",
      "Infused with Essential Oils",
      "Consistent 4+ Hour Burn",
      "Eco-Friendly Packaging"
    ],
    "variants": [
      {
        "id": "gh-010-v1",
        "fragrance": "Eucalyptus & Mint Therapy",
        "size": "Bulk 24-Piece Pack",
        "price": 1249,
        "stock": 22,
        "sku": "GH-CND-010-24P"
      }
    ]
  },
  {
    "id": "gh-011",
    "name": "Artisan Molten Golden Wax Studio Tin Candle",
    "category": "Scented Candles",
    "sku": "GH-CND-011",
    "description": "Freshly cast molten golden botanical wax poured in our Coimbatore studio. Enriched with bergamot and wild amber notes for an uplifting afternoon burn.",
    "basePrice": 999,
    "salePrice": 849,
    "images": [
      "assets/glow-home/IMG_20260906_121557.jpg",
      "assets/glow-home/IMG_20260906_121612.jpg"
    ],
    "features": [
      "Pure Soy & Beeswax Blend",
      "Centered Braided Cotton Wick",
      "40+ Hours Clean Burn",
      "Recyclable Gold Tin"
    ],
    "variants": [
      {
        "id": "gh-011-v1",
        "fragrance": "Golden Bergamot Amber",
        "size": "180g (40h Burn)",
        "price": 849,
        "stock": 20,
        "sku": "GH-CND-011-180-AMB"
      },
      {
        "id": "gh-011-v2",
        "fragrance": "Golden Bergamot Amber",
        "size": "280g (60h Burn)",
        "price": 1249,
        "stock": 15,
        "sku": "GH-CND-011-280-AMB"
      }
    ],
    "businessId": "glow-home",
    "status": "active",
    "rating": 4.9,
    "reviewsCount": 57,
    "hsnCode": "34060010"
  },
  {
    "id": "gh-012",
    "name": "Pastel Botanical Ceramic Votives Trio",
    "category": "Scented Candles",
    "sku": "GH-CND-012",
    "description": "Artisan ceramic tealight votives in soft pastel mint, lavender, and buttercup yellow. Infused with natural therapeutic essences for meditation altars.",
    "basePrice": 1199,
    "salePrice": 999,
    "images": [
      "assets/glow-home/IMG_20260927_124019.jpg",
      "assets/glow-home/IMG_20260927_124013.jpg"
    ],
    "features": [
      "3 Pastel Ceramic Votive Cups",
      "IFRA Certified Botanical Oils",
      "Zero Petroleum Paraffin",
      "25 Hours Burn Per Cup"
    ],
    "variants": [
      {
        "id": "gh-012-v1",
        "fragrance": "Lavender, Mint & Citrus Votive Trio",
        "size": "Set of 3 (80g each)",
        "price": 999,
        "stock": 18,
        "sku": "GH-CND-012-TRIO"
      }
    ],
    "businessId": "glow-home",
    "status": "active",
    "rating": 4.9,
    "reviewsCount": 43,
    "hsnCode": "34060010"
  },
  {
    "id": "gh-013",
    "name": "Artisan Studio Pouring Batch Amber Tin Candle",
    "category": "Scented Candles",
    "sku": "GH-CND-013",
    "description": "Small-batch poured candle with centered wicks and golden botanical soy wax. Features relaxing lavender chamomile notes that promote peaceful sleep.",
    "basePrice": 899,
    "salePrice": 749,
    "images": [
      "assets/glow-home/IMG_20260927_164632.jpg"
    ],
    "features": [
      "100% Biodegradable Soy Wax",
      "Lead-Free Braided Cotton Wick",
      "Aromatherapeutic Essential Oils",
      "Travel Tin Vessel"
    ],
    "variants": [
      {
        "id": "gh-013-v1",
        "fragrance": "Lavender & Chamomile Sleep",
        "size": "150g (35h Burn)",
        "price": 749,
        "stock": 22,
        "sku": "GH-CND-013-150-LAV"
      }
    ],
    "businessId": "glow-home",
    "status": "active",
    "rating": 4.9,
    "reviewsCount": 42,
    "hsnCode": "34060010"
  },
  {
    "id": "gh-014",
    "name": "Handcrafted Midnight Amber Jar Scented Candle",
    "category": "Scented Candles",
    "sku": "GH-CND-014",
    "description": "Rich warm glow through an amber glass jar. Slow-poured with natural centered wick and soothing French lavender and Madagascar vanilla fragrance.",
    "basePrice": 1049,
    "salePrice": 899,
    "images": [
      "assets/glow-home/IMG_20260927_164654.jpg"
    ],
    "features": [
      "Amber Glass Keepsake Jar",
      "Clean Soot-Free Throw",
      "Phthalate-Free Fragrance",
      "50+ Hours Flame Life"
    ],
    "variants": [
      {
        "id": "gh-014-v1",
        "fragrance": "Midnight Amber & Vanilla",
        "size": "220g (50h Burn)",
        "price": 899,
        "stock": 16,
        "sku": "GH-CND-014-220-AMB"
      }
    ],
    "businessId": "glow-home",
    "status": "active",
    "rating": 4.9,
    "reviewsCount": 50,
    "hsnCode": "34060010"
  },
  {
    "id": "gh-015",
    "name": "Glow Studio Artisan Batch Hand-Poured Tin",
    "category": "Scented Candles",
    "sku": "GH-CND-015",
    "description": "Fresh studio casting captured immediately after pouring. Golden botanical aroma blended with woody sandalwood for creating serene workspaces.",
    "basePrice": 949,
    "salePrice": 799,
    "images": [
      "assets/glow-home/IMG_20260927_183314.jpg"
    ],
    "features": [
      "Handcrafted Artisan Batch",
      "Sandalwood & White Cedar",
      "Smooth Even Pool Melt",
      "Travel Lid Included"
    ],
    "variants": [
      {
        "id": "gh-015-v1",
        "fragrance": "Ceremonial Sandalwood",
        "size": "180g (40h Burn)",
        "price": 799,
        "stock": 19,
        "sku": "GH-CND-015-180-SND"
      }
    ],
    "businessId": "glow-home",
    "status": "active",
    "rating": 4.9,
    "reviewsCount": 56,
    "hsnCode": "34060010"
  },
  {
    "id": "gh-016",
    "name": "Botanical Wax Molten Casting Candle Bowl",
    "category": "Scented Candles",
    "sku": "GH-CND-016",
    "description": "Rich golden wax casting with braided wick alignment. Infused with natural sweet citrus and botanical vanilla for living room ambiance.",
    "basePrice": 999,
    "salePrice": 849,
    "images": [
      "assets/glow-home/IMG_20260927_183322.jpg"
    ],
    "features": [
      "Centering Wick Anchor",
      "Pure Botanical Wax",
      "Zero Synthetic Additives",
      "Even Edge-to-Edge Melt"
    ],
    "variants": [
      {
        "id": "gh-016-v1",
        "fragrance": "Sweet Orange & Amber",
        "size": "200g (45h Burn)",
        "price": 849,
        "stock": 17,
        "sku": "GH-CND-016-200-ORG"
      }
    ],
    "businessId": "glow-home",
    "status": "active",
    "rating": 4.9,
    "reviewsCount": 41,
    "hsnCode": "34060010"
  },
  {
    "id": "gh-017",
    "name": "Artisan Workshop Heritage Candle Vessel",
    "category": "Scented Candles",
    "sku": "GH-CND-017",
    "description": "Durable metal tin casting with warm golden botanical wax. Produces a comforting crackle-free flame that fills large master bedrooms.",
    "basePrice": 949,
    "salePrice": 799,
    "images": [
      "assets/glow-home/IMG_20260927_183327.jpg"
    ],
    "features": [
      "100% Plant-Based Wax",
      "Smokeless Braided Wick",
      "Natural Botanical Notes",
      "Non-Toxic Biodegradable"
    ],
    "variants": [
      {
        "id": "gh-017-v1",
        "fragrance": "Warm Cinnamon Bark & Honey",
        "size": "180g (40h Burn)",
        "price": 799,
        "stock": 15,
        "sku": "GH-CND-017-180-CIN"
      }
    ],
    "businessId": "glow-home",
    "status": "active",
    "rating": 4.9,
    "reviewsCount": 52,
    "hsnCode": "34060010"
  },
  {
    "id": "gh-018",
    "name": "Botanical Gold Wax Multi-Vessel Studio Set",
    "category": "Scented Candles",
    "sku": "GH-CND-018",
    "description": "Studio collection of hand-poured candle vessels in golden wax. Perfect for curated gift hampers, housewarmings, and festive holiday decor.",
    "basePrice": 1899,
    "salePrice": 1599,
    "images": [
      "assets/glow-home/IMG_20260927_183339.jpg",
      "assets/glow-home/IMG_20260927_183345.jpg"
    ],
    "features": [
      "Curated 2-Vessel Set",
      "Aromatherapeutic Essential Oils",
      "Gift-Ready Presentation Box",
      "80+ Hours Total Burn"
    ],
    "variants": [
      {
        "id": "gh-018-v1",
        "fragrance": "Wild Bergamot & Amber Pair",
        "size": "Pair (2x 180g)",
        "price": 1599,
        "stock": 14,
        "sku": "GH-CND-018-PAIR"
      }
    ],
    "businessId": "glow-home",
    "status": "active",
    "rating": 4.9,
    "reviewsCount": 50,
    "hsnCode": "34060010"
  },
  {
    "id": "gh-019",
    "name": "Artisan Workshop Micro-Batch Pouring Candle",
    "category": "Scented Candles",
    "sku": "GH-CND-019",
    "description": "Limited micro-batch pouring from our artisan workshop table. Features centered lead-free cotton wicks and deeply comforting herbal essences.",
    "basePrice": 999,
    "salePrice": 849,
    "images": [
      "assets/glow-home/IMG_20260927_183350.jpg",
      "assets/glow-home/IMG_20260927_183452.jpg"
    ],
    "features": [
      "Micro-Batch Precision Pour",
      "Natural Centered Wick",
      "Therapeutic Stress Relief",
      "Clean Even Flame"
    ],
    "variants": [
      {
        "id": "gh-019-v1",
        "fragrance": "Wild Lavender & Sage Leaf",
        "size": "200g (45h Burn)",
        "price": 849,
        "stock": 16,
        "sku": "GH-CND-019-200-LAV"
      }
    ],
    "businessId": "glow-home",
    "status": "active",
    "rating": 4.9,
    "reviewsCount": 47,
    "hsnCode": "34060010"
  },
  {
    "id": "gh-020",
    "name": "Master Craftsman Studio Batch Candle Collection",
    "category": "Scented Candles",
    "sku": "GH-CND-020",
    "description": "Celebrated artisan workshop collection. Hand-poured with golden botanical wax blends and natural cotton wicks for a soot-free burn across 55 hours.",
    "basePrice": 1299,
    "salePrice": 1099,
    "images": [
      "assets/glow-home/IMG_20260927_185204.jpg",
      "assets/glow-home/IMG_20260927_185459.jpg"
    ],
    "features": [
      "Studio Collector Batch",
      "Hand-Numbered Metal Tin",
      "Therapeutic Essential Oils",
      "55+ Hours Burn Time"
    ],
    "variants": [
      {
        "id": "gh-020-v1",
        "fragrance": "Amber, Cedar & Sweet Vanilla",
        "size": "250g (55h Burn)",
        "price": 1099,
        "stock": 20,
        "sku": "GH-CND-020-250-AMB"
      }
    ],
    "businessId": "glow-home",
    "status": "active",
    "rating": 4.9,
    "reviewsCount": 47,
    "hsnCode": "34060010"
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
      "assets/earkart/earkart-daisy-pair-original.jpg",
      "assets/earkart/earkart-daisy-single-macro.jpg"
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
    "sku": "EK-HOP-002",
    "description": "Charming nature-inspired botanical flower earrings. Each delicate petal is sculpted by hand to capture the organic symmetry of freshly bloomed daisies.",
    "basePrice": 1499,
    "salePrice": 1299,
    "status": "active",
    "rating": 4.9,
    "reviewsCount": 41,
    "hsnCode": "71131100",
    "images": [
      "assets/earkart/earkart-mini-petal-bloom.jpg",
      "assets/earkart/earkart-daisy-single-macro.jpg"
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
    "sku": "EK-DRP-003",
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
    "sku": "EK-STD-004",
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
    "sku": "EK-HOP-005",
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
    "name": "Handcrafted White Daisy Studs (Emerald Velvet Gift Box)",
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
      "assets/earkart/earkart-daisy-velvet-box.jpg",
      "assets/earkart/earkart-daisy-pair-original.jpg"
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
  },
  {
    "id": "ek-007",
    "businessId": "earkart",
    "name": "Artisan White Daisy Blossom Studs (Model Fit Edition)",
    "category": "Ear Studs",
    "sku": "EK-STD-007",
    "description": "Organic white daisy blossom styled gracefully on the earlobe. Captures the true scale, natural drape, and artisanal charm for everyday styling.",
    "basePrice": 1599,
    "salePrice": 1349,
    "status": "active",
    "rating": 5.0,
    "reviewsCount": 44,
    "hsnCode": "71131100",
    "images": [
      "assets/earkart/earkart-daisy-model-ear.jpg",
      "assets/earkart/earkart-daisy-pair-original.jpg"
    ],
    "features": [
      "Natural Model Ear Scale Reference",
      "Hypoallergenic Silver Posts",
      "Comfort Flat Backing",
      "Sensitive Ear Certified"
    ],
    "variants": [
      {
        "id": "ek-007-v1",
        "material": "Hypoallergenic Silver Post",
        "color": "Pure Daisy White",
        "price": 1349,
        "stock": 18,
        "sku": "EK-STD-007-SLV"
      },
      {
        "id": "ek-007-v2",
        "material": "18K Gold Plated Post",
        "color": "Pure Daisy White",
        "price": 1449,
        "stock": 15,
        "sku": "EK-STD-007-GLD"
      }
    ]
  },
  {
    "id": "ek-008",
    "businessId": "earkart",
    "name": "Artisan Daisy Blossom Macro Petal Stud",
    "category": "Ear Studs",
    "sku": "EK-STD-008",
    "description": "High-magnification view of our sculpted floral daisy stud showing micro-textured radial petals and the raised dimensional golden stamen center.",
    "basePrice": 1799,
    "salePrice": 1499,
    "status": "active",
    "rating": 4.9,
    "reviewsCount": 37,
    "hsnCode": "71131100",
    "images": [
      "assets/earkart/earkart-daisy-single-macro.jpg",
      "assets/earkart/earkart-daisy-pair-original.jpg"
    ],
    "features": [
      "Macro Sculpted Petal Texture",
      "Dimensional Stamen Core",
      "Featherlight 2.2g Weight",
      "Silicone Butterfly Safety Backing"
    ],
    "variants": [
      {
        "id": "ek-008-v1",
        "material": "Solid 925 Sterling Post",
        "color": "Artisan Floral White",
        "price": 1499,
        "stock": 20,
        "sku": "EK-STD-008-SLV"
      },
      {
        "id": "ek-008-v2",
        "material": "18K Gold Dip Finish",
        "color": "Artisan Floral White",
        "price": 1599,
        "stock": 16,
        "sku": "EK-STD-008-GLD"
      }
    ]
  }
];

const BRAND_PRODUCTS = {
  'riyaa-trends': RIYAA_TRENDS_PRODUCTS,
  'glow-home': GLOW_HOME_PRODUCTS,
  'earkart': EARKART_PRODUCTS
};

// Balanced interleaving so all 3 businesses appear in the top rows of the unified catalog
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

const INITIAL_ORDERS = [
  {
    "orderId": "LT-2026-8812",
    "date": "2026-10-14T14:22:00Z",
    "customer": {
      "name": "Aditi Sharma",
      "email": "aditi.sharma@example.com",
      "phone": "+91 98765 43210",
      "address": "Flat 402, Green Glen Layout, Bellandur",
      "city": "Bengaluru",
      "state": "Karnataka",
      "postalCode": "560103",
      "country": "India"
    },
    "items": [
      {
        "productId": "rt-001",
        "businessId": "riyaa-trends",
        "productName": "Kids Organic Cotton Graphic Crewneck T-Shirt",
        "variantId": "rt-001-v2",
        "variantLabel": "Size: M (6-7 Yrs) | Colour: Navy Graphic",
        "sku": "RT-TSH-001-M-NVY",
        "price": 699,
        "quantity": 1,
        "image": "assets/riyaa-trends/IMG-20260222-WA0041.jpg",
        "hsnCode": "61091000",
        "gstRate": 5
      },
      {
        "productId": "gh-001",
        "businessId": "glow-home",
        "productName": "Artisan Golden Amber Glass Jar Scented Candle",
        "variantId": "gh-001-v2",
        "variantLabel": "Size: 250g (50h Burn)",
        "sku": "GH-CND-001-250-LAV",
        "price": 1199,
        "quantity": 1,
        "image": "assets/glow-home/IMG_20260816_171236.jpg",
        "hsnCode": "34060010",
        "gstRate": 18
      }
    ],
    "subtotal": 1898,
    "discountAmount": 189.8,
    "couponApplied": "LIMETREE10",
    "shippingCharge": 0,
    "shippingMethod": "Free Courier Delivery (Above ₹999)",
    "taxBreakdown": {
      "cgst": 102.5,
      "sgst": 102.5,
      "igst": 0,
      "totalTax": 205
    },
    "totalAmount": 1913.2,
    "paymentStatus": "Paid",
    "paymentMethod": "Razorpay UPI / NetBanking",
    "paymentTransactionId": "pay_Rzp98231478201",
    "fulfillmentStatus": "Shipped",
    "trackingNumber": "DEL-8849201948",
    "carrier": "Delhivery Express",
    "trackingUrl": "https://www.delhivery.com/track/package/DEL-8849201948",
    "statusHistory": [
      {
        "status": "Order Placed",
        "timestamp": "2026-10-14T14:22:00Z",
        "note": "Order successfully created."
      },
      {
        "status": "Payment Confirmed",
        "timestamp": "2026-10-14T14:23:15Z",
        "note": "Verified by Razorpay Test Gateway."
      },
      {
        "status": "Packed",
        "timestamp": "2026-10-15T09:30:00Z",
        "note": "Items verified and packed in sustainable kraft box."
      },
      {
        "status": "Shipped",
        "timestamp": "2026-10-15T15:00:00Z",
        "note": "Handed over to Delhivery Express courier."
      }
    ],
    "invoiceNumber": "LT/2026-27/00142"
  },
  {
    "orderId": "LT-2026-8805",
    "date": "2026-10-12T11:05:00Z",
    "customer": {
      "name": "Rohan Verma",
      "email": "rohan.v@example.com",
      "phone": "+91 98450 11223",
      "address": "Villa 12, Palm Meadows",
      "city": "Chennai",
      "state": "Tamil Nadu",
      "postalCode": "600028",
      "country": "India"
    },
    "items": [
      {
        "productId": "ek-001",
        "businessId": "earkart",
        "productName": "Handcrafted White Daisy Floral Stud Earrings (Pair)",
        "variantId": "ek-001-v1",
        "variantLabel": "Material: Silver Post | Colour: White Blossom / Gold",
        "sku": "EK-STD-001-SLV-WHT",
        "price": 1099,
        "quantity": 1,
        "image": "assets/earkart/earkart-daisy-pair-original.jpg",
        "hsnCode": "71131100",
        "gstRate": 3
      }
    ],
    "subtotal": 1099,
    "discountAmount": 0,
    "couponApplied": null,
    "shippingCharge": 0,
    "shippingMethod": "Free Courier Delivery",
    "taxBreakdown": {
      "cgst": 16.48,
      "sgst": 16.48,
      "igst": 0,
      "totalTax": 32.97
    },
    "totalAmount": 1131.97,
    "paymentStatus": "Paid",
    "paymentMethod": "Razorpay Cards (Test)",
    "paymentTransactionId": "pay_Rzp11029482093",
    "fulfillmentStatus": "Delivered",
    "trackingNumber": "BD-994827102",
    "carrier": "Blue Dart Air",
    "trackingUrl": "https://www.bluedart.com",
    "statusHistory": [
      {
        "status": "Order Placed",
        "timestamp": "2026-10-12T11:05:00Z",
        "note": "Customer order placed."
      },
      {
        "status": "Payment Confirmed",
        "timestamp": "2026-10-12T11:06:00Z",
        "note": "Card signature verified."
      },
      {
        "status": "Delivered",
        "timestamp": "2026-10-14T16:10:00Z",
        "note": "Delivered to recipient with OTP confirmation."
      }
    ],
    "invoiceNumber": "LT/2026-27/00140"
  }
];

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
    "id": "batch-rt-shr-007-s-act-01",
    "productId": "rt-007",
    "variantId": "rt-007-v1",
    "sku": "RT-SHR-007-S-ACT",
    "costPerUnit": 420,
    "quantityReceived": 28,
    "quantityRemaining": 18,
    "supplier": "Tirupur Organic Knitters"
  },
  {
    "id": "batch-rt-shr-007-m-act-01",
    "productId": "rt-007",
    "variantId": "rt-007-v2",
    "sku": "RT-SHR-007-M-ACT",
    "costPerUnit": 420,
    "quantityReceived": 36,
    "quantityRemaining": 26,
    "supplier": "Tirupur Organic Knitters"
  },
  {
    "id": "batch-rt-shr-007-l-act-01",
    "productId": "rt-007",
    "variantId": "rt-007-v3",
    "sku": "RT-SHR-007-L-ACT",
    "costPerUnit": 441,
    "quantityReceived": 25,
    "quantityRemaining": 15,
    "supplier": "Tirupur Organic Knitters"
  },
  {
    "id": "batch-rt-tsh-008-s-pas-01",
    "productId": "rt-008",
    "variantId": "rt-008-v1",
    "sku": "RT-TSH-008-S-PAS",
    "costPerUnit": 462,
    "quantityReceived": 30,
    "quantityRemaining": 20,
    "supplier": "Tirupur Organic Knitters"
  },
  {
    "id": "batch-rt-tsh-008-m-pas-01",
    "productId": "rt-008",
    "variantId": "rt-008-v2",
    "sku": "RT-TSH-008-M-PAS",
    "costPerUnit": 462,
    "quantityReceived": 35,
    "quantityRemaining": 25,
    "supplier": "Tirupur Organic Knitters"
  },
  {
    "id": "batch-rt-tsh-008-l-pas-01",
    "productId": "rt-008",
    "variantId": "rt-008-v3",
    "sku": "RT-TSH-008-L-PAS",
    "costPerUnit": 483,
    "quantityReceived": 24,
    "quantityRemaining": 14,
    "supplier": "Tirupur Organic Knitters"
  },
  {
    "id": "batch-rt-trk-009-s-mix-01",
    "productId": "rt-009",
    "variantId": "rt-009-v1",
    "sku": "RT-TRK-009-S-MIX",
    "costPerUnit": 588,
    "quantityReceived": 26,
    "quantityRemaining": 16,
    "supplier": "Tirupur Organic Knitters"
  },
  {
    "id": "batch-rt-trk-009-m-mix-01",
    "productId": "rt-009",
    "variantId": "rt-009-v2",
    "sku": "RT-TRK-009-M-MIX",
    "costPerUnit": 588,
    "quantityReceived": 32,
    "quantityRemaining": 22,
    "supplier": "Tirupur Organic Knitters"
  },
  {
    "id": "batch-rt-trk-009-l-mix-01",
    "productId": "rt-009",
    "variantId": "rt-009-v3",
    "sku": "RT-TRK-009-L-MIX",
    "costPerUnit": 609,
    "quantityReceived": 21,
    "quantityRemaining": 11,
    "supplier": "Tirupur Organic Knitters"
  },
  {
    "id": "batch-rt-shr-010-s-smr-01",
    "productId": "rt-010",
    "variantId": "rt-010-v1",
    "sku": "RT-SHR-010-S-SMR",
    "costPerUnit": 378,
    "quantityReceived": 29,
    "quantityRemaining": 19,
    "supplier": "Tirupur Organic Knitters"
  },
  {
    "id": "batch-rt-shr-010-m-smr-01",
    "productId": "rt-010",
    "variantId": "rt-010-v2",
    "sku": "RT-SHR-010-M-SMR",
    "costPerUnit": 378,
    "quantityReceived": 34,
    "quantityRemaining": 24,
    "supplier": "Tirupur Organic Knitters"
  },
  {
    "id": "batch-rt-shr-010-l-smr-01",
    "productId": "rt-010",
    "variantId": "rt-010-v3",
    "sku": "RT-SHR-010-L-SMR",
    "costPerUnit": 399,
    "quantityReceived": 26,
    "quantityRemaining": 16,
    "supplier": "Tirupur Organic Knitters"
  },
  {
    "id": "batch-rt-tsh-011-s-sge-01",
    "productId": "rt-011",
    "variantId": "rt-011-v1",
    "sku": "RT-TSH-011-S-SGE",
    "costPerUnit": 336,
    "quantityReceived": 35,
    "quantityRemaining": 25,
    "supplier": "Tirupur Organic Knitters"
  },
  {
    "id": "batch-rt-tsh-011-m-sge-01",
    "productId": "rt-011",
    "variantId": "rt-011-v2",
    "sku": "RT-TSH-011-M-SGE",
    "costPerUnit": 336,
    "quantityReceived": 40,
    "quantityRemaining": 30,
    "supplier": "Tirupur Organic Knitters"
  },
  {
    "id": "batch-rt-tsh-011-l-sge-01",
    "productId": "rt-011",
    "variantId": "rt-011-v3",
    "sku": "RT-TSH-011-L-SGE",
    "costPerUnit": 357,
    "quantityReceived": 30,
    "quantityRemaining": 20,
    "supplier": "Tirupur Organic Knitters"
  },
  {
    "id": "batch-rt-trk-012-s-mix-01",
    "productId": "rt-012",
    "variantId": "rt-012-v1",
    "sku": "RT-TRK-012-S-MIX",
    "costPerUnit": 567,
    "quantityReceived": 25,
    "quantityRemaining": 15,
    "supplier": "Tirupur Organic Knitters"
  },
  {
    "id": "batch-rt-trk-012-m-mix-01",
    "productId": "rt-012",
    "variantId": "rt-012-v2",
    "sku": "RT-TRK-012-M-MIX",
    "costPerUnit": 567,
    "quantityReceived": 33,
    "quantityRemaining": 23,
    "supplier": "Tirupur Organic Knitters"
  },
  {
    "id": "batch-rt-trk-012-l-mix-01",
    "productId": "rt-012",
    "variantId": "rt-012-v3",
    "sku": "RT-TRK-012-L-MIX",
    "costPerUnit": 588,
    "quantityReceived": 24,
    "quantityRemaining": 14,
    "supplier": "Tirupur Organic Knitters"
  },
  {
    "id": "batch-rt-trk-013-s-sny-01",
    "productId": "rt-013",
    "variantId": "rt-013-v1",
    "sku": "RT-TRK-013-S-SNY",
    "costPerUnit": 546,
    "quantityReceived": 28,
    "quantityRemaining": 18,
    "supplier": "Tirupur Organic Knitters"
  },
  {
    "id": "batch-rt-trk-013-m-sny-01",
    "productId": "rt-013",
    "variantId": "rt-013-v2",
    "sku": "RT-TRK-013-M-SNY",
    "costPerUnit": 546,
    "quantityReceived": 32,
    "quantityRemaining": 22,
    "supplier": "Tirupur Organic Knitters"
  },
  {
    "id": "batch-rt-trk-013-l-sny-01",
    "productId": "rt-013",
    "variantId": "rt-013-v3",
    "sku": "RT-TRK-013-L-SNY",
    "costPerUnit": 567,
    "quantityReceived": 25,
    "quantityRemaining": 15,
    "supplier": "Tirupur Organic Knitters"
  },
  {
    "id": "batch-rt-trk-014-s-pst-01",
    "productId": "rt-014",
    "variantId": "rt-014-v1",
    "sku": "RT-TRK-014-S-PST",
    "costPerUnit": 567,
    "quantityReceived": 26,
    "quantityRemaining": 16,
    "supplier": "Tirupur Organic Knitters"
  },
  {
    "id": "batch-rt-trk-014-m-pst-01",
    "productId": "rt-014",
    "variantId": "rt-014-v2",
    "sku": "RT-TRK-014-M-PST",
    "costPerUnit": 567,
    "quantityReceived": 34,
    "quantityRemaining": 24,
    "supplier": "Tirupur Organic Knitters"
  },
  {
    "id": "batch-rt-trk-014-l-pst-01",
    "productId": "rt-014",
    "variantId": "rt-014-v3",
    "sku": "RT-TRK-014-L-PST",
    "costPerUnit": 588,
    "quantityReceived": 22,
    "quantityRemaining": 12,
    "supplier": "Tirupur Organic Knitters"
  },
  {
    "id": "batch-rt-trk-015-s-mrn-01",
    "productId": "rt-015",
    "variantId": "rt-015-v1",
    "sku": "RT-TRK-015-S-MRN",
    "costPerUnit": 588,
    "quantityReceived": 28,
    "quantityRemaining": 18,
    "supplier": "Tirupur Organic Knitters"
  },
  {
    "id": "batch-rt-trk-015-m-mrn-01",
    "productId": "rt-015",
    "variantId": "rt-015-v2",
    "sku": "RT-TRK-015-M-MRN",
    "costPerUnit": 588,
    "quantityReceived": 34,
    "quantityRemaining": 24,
    "supplier": "Tirupur Organic Knitters"
  },
  {
    "id": "batch-rt-trk-015-l-mrn-01",
    "productId": "rt-015",
    "variantId": "rt-015-v3",
    "sku": "RT-TRK-015-L-MRN",
    "costPerUnit": 609,
    "quantityReceived": 24,
    "quantityRemaining": 14,
    "supplier": "Tirupur Organic Knitters"
  },
  {
    "id": "batch-rt-tsh-016-s-blu-01",
    "productId": "rt-016",
    "variantId": "rt-016-v1",
    "sku": "RT-TSH-016-S-BLU",
    "costPerUnit": 399,
    "quantityReceived": 25,
    "quantityRemaining": 15,
    "supplier": "Tirupur Organic Knitters"
  },
  {
    "id": "batch-rt-tsh-016-m-blu-01",
    "productId": "rt-016",
    "variantId": "rt-016-v2",
    "sku": "RT-TSH-016-M-BLU",
    "costPerUnit": 399,
    "quantityReceived": 32,
    "quantityRemaining": 22,
    "supplier": "Tirupur Organic Knitters"
  },
  {
    "id": "batch-rt-tsh-016-l-blu-01",
    "productId": "rt-016",
    "variantId": "rt-016-v3",
    "sku": "RT-TSH-016-L-BLU",
    "costPerUnit": 420,
    "quantityReceived": 26,
    "quantityRemaining": 16,
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
    "id": "batch-gh-mst-007-16-wxm-01",
    "productId": "gh-007",
    "variantId": "gh-007-v1",
    "sku": "GH-MST-007-16-WXM",
    "costPerUnit": 252,
    "quantityReceived": 31,
    "quantityRemaining": 21,
    "supplier": "Coimbatore Wax Studios"
  },
  {
    "id": "batch-gh-cnd-008-12p-01",
    "productId": "gh-008",
    "variantId": "gh-008-v1",
    "sku": "GH-CND-008-12P",
    "costPerUnit": 273,
    "quantityReceived": 38,
    "quantityRemaining": 28,
    "supplier": "Coimbatore Wax Studios"
  },
  {
    "id": "batch-gh-cnd-008-24p-01",
    "productId": "gh-008",
    "variantId": "gh-008-v2",
    "sku": "GH-CND-008-24P",
    "costPerUnit": 462,
    "quantityReceived": 26,
    "quantityRemaining": 16,
    "supplier": "Coimbatore Wax Studios"
  },
  {
    "id": "batch-gh-cnd-009-20p-01",
    "productId": "gh-009",
    "variantId": "gh-009-v1",
    "sku": "GH-CND-009-20P",
    "costPerUnit": 420,
    "quantityReceived": 30,
    "quantityRemaining": 20,
    "supplier": "Coimbatore Wax Studios"
  },
  {
    "id": "batch-gh-cnd-010-24p-01",
    "productId": "gh-010",
    "variantId": "gh-010-v1",
    "sku": "GH-CND-010-24P",
    "costPerUnit": 525,
    "quantityReceived": 32,
    "quantityRemaining": 22,
    "supplier": "Coimbatore Wax Studios"
  },
  {
    "id": "batch-gh-cnd-011-180-amb-01",
    "productId": "gh-011",
    "variantId": "gh-011-v1",
    "sku": "GH-CND-011-180-AMB",
    "costPerUnit": 357,
    "quantityReceived": 30,
    "quantityRemaining": 20,
    "supplier": "Coimbatore Wax Studios"
  },
  {
    "id": "batch-gh-cnd-011-280-amb-01",
    "productId": "gh-011",
    "variantId": "gh-011-v2",
    "sku": "GH-CND-011-280-AMB",
    "costPerUnit": 525,
    "quantityReceived": 25,
    "quantityRemaining": 15,
    "supplier": "Coimbatore Wax Studios"
  },
  {
    "id": "batch-gh-cnd-012-trio-01",
    "productId": "gh-012",
    "variantId": "gh-012-v1",
    "sku": "GH-CND-012-TRIO",
    "costPerUnit": 420,
    "quantityReceived": 28,
    "quantityRemaining": 18,
    "supplier": "Coimbatore Wax Studios"
  },
  {
    "id": "batch-gh-cnd-013-150-lav-01",
    "productId": "gh-013",
    "variantId": "gh-013-v1",
    "sku": "GH-CND-013-150-LAV",
    "costPerUnit": 315,
    "quantityReceived": 32,
    "quantityRemaining": 22,
    "supplier": "Coimbatore Wax Studios"
  },
  {
    "id": "batch-gh-cnd-014-220-amb-01",
    "productId": "gh-014",
    "variantId": "gh-014-v1",
    "sku": "GH-CND-014-220-AMB",
    "costPerUnit": 378,
    "quantityReceived": 26,
    "quantityRemaining": 16,
    "supplier": "Coimbatore Wax Studios"
  },
  {
    "id": "batch-gh-cnd-015-180-snd-01",
    "productId": "gh-015",
    "variantId": "gh-015-v1",
    "sku": "GH-CND-015-180-SND",
    "costPerUnit": 336,
    "quantityReceived": 29,
    "quantityRemaining": 19,
    "supplier": "Coimbatore Wax Studios"
  },
  {
    "id": "batch-gh-cnd-016-200-org-01",
    "productId": "gh-016",
    "variantId": "gh-016-v1",
    "sku": "GH-CND-016-200-ORG",
    "costPerUnit": 357,
    "quantityReceived": 27,
    "quantityRemaining": 17,
    "supplier": "Coimbatore Wax Studios"
  },
  {
    "id": "batch-gh-cnd-017-180-cin-01",
    "productId": "gh-017",
    "variantId": "gh-017-v1",
    "sku": "GH-CND-017-180-CIN",
    "costPerUnit": 336,
    "quantityReceived": 25,
    "quantityRemaining": 15,
    "supplier": "Coimbatore Wax Studios"
  },
  {
    "id": "batch-gh-cnd-018-pair-01",
    "productId": "gh-018",
    "variantId": "gh-018-v1",
    "sku": "GH-CND-018-PAIR",
    "costPerUnit": 672,
    "quantityReceived": 24,
    "quantityRemaining": 14,
    "supplier": "Coimbatore Wax Studios"
  },
  {
    "id": "batch-gh-cnd-019-200-lav-01",
    "productId": "gh-019",
    "variantId": "gh-019-v1",
    "sku": "GH-CND-019-200-LAV",
    "costPerUnit": 357,
    "quantityReceived": 26,
    "quantityRemaining": 16,
    "supplier": "Coimbatore Wax Studios"
  },
  {
    "id": "batch-gh-cnd-020-250-amb-01",
    "productId": "gh-020",
    "variantId": "gh-020-v1",
    "sku": "GH-CND-020-250-AMB",
    "costPerUnit": 462,
    "quantityReceived": 30,
    "quantityRemaining": 20,
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
  },
  {
    "id": "batch-ek-std-007-slv-01",
    "productId": "ek-007",
    "variantId": "ek-007-v1",
    "sku": "EK-STD-007-SLV",
    "costPerUnit": 567,
    "quantityReceived": 28,
    "quantityRemaining": 18,
    "supplier": "Jaipur Precision Vermeil Works"
  },
  {
    "id": "batch-ek-std-007-gld-01",
    "productId": "ek-007",
    "variantId": "ek-007-v2",
    "sku": "EK-STD-007-GLD",
    "costPerUnit": 609,
    "quantityReceived": 25,
    "quantityRemaining": 15,
    "supplier": "Jaipur Precision Vermeil Works"
  },
  {
    "id": "batch-ek-std-008-slv-01",
    "productId": "ek-008",
    "variantId": "ek-008-v1",
    "sku": "EK-STD-008-SLV",
    "costPerUnit": 630,
    "quantityReceived": 30,
    "quantityRemaining": 20,
    "supplier": "Jaipur Precision Vermeil Works"
  },
  {
    "id": "batch-ek-std-008-gld-01",
    "productId": "ek-008",
    "variantId": "ek-008-v2",
    "sku": "EK-STD-008-GLD",
    "costPerUnit": 672,
    "quantityReceived": 26,
    "quantityRemaining": 16,
    "supplier": "Jaipur Precision Vermeil Works"
  }
];

const INITIAL_SETTINGS = {
  "storeName": "LIMETREE",
  "tagline": "Multi-Business Lifestyle & Craft Collective",
  "supportEmail": "care@limetree.in",
  "supportPhone": "+91 80 4920 1800",
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

if (typeof window !== 'undefined') {
  window.LIMETREE_BUSINESSES = LIMETREE_BUSINESSES;
  window.INITIAL_PRODUCTS = INITIAL_PRODUCTS;
  window.BRAND_PRODUCTS = BRAND_PRODUCTS;
  window.RIYAA_TRENDS_PRODUCTS = RIYAA_TRENDS_PRODUCTS;
  window.GLOW_HOME_PRODUCTS = GLOW_HOME_PRODUCTS;
  window.EARKART_PRODUCTS = EARKART_PRODUCTS;
  window.INITIAL_COUPONS = INITIAL_COUPONS;
  window.INITIAL_ORDERS = INITIAL_ORDERS;
  window.INITIAL_INVENTORY_BATCHES = INITIAL_INVENTORY_BATCHES;
  window.INITIAL_SETTINGS = INITIAL_SETTINGS;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    LIMETREE_BUSINESSES,
    INITIAL_PRODUCTS,
    BRAND_PRODUCTS,
    RIYAA_TRENDS_PRODUCTS,
    GLOW_HOME_PRODUCTS,
    EARKART_PRODUCTS,
    INITIAL_COUPONS,
    INITIAL_ORDERS,
    INITIAL_INVENTORY_BATCHES,
    INITIAL_SETTINGS
  };
}
