// LimeTree Catalog Data & Seed Data (Riyaa Trends Kids, Glow Home, Earkart)
const INITIAL_PRODUCTS = [
  {
    "id": "RT-007",
    "name": "Kids Daisy Floral Flutter Dress & Bloomers Set",
    "brand": "Riyaa Trends Kids",
    "brandSlug": "clothing",
    "category": "Clothing",
    "subcategory": "Dresses",
    "price": 34,
    "origPrice": 46,
    "rating": 5,
    "reviewCount": 78,
    "image": "images/kids_dress_daisy.jpg",
    "images": [
      "images/kids_dress_daisy.jpg",
      "images/kids_dress_tiered.jpg"
    ],
    "featured": true,
    "bestseller": true,
    "badge": "Bestseller Dress",
    "stock": 30,
    "sizes": [
      "2-3Y",
      "3-4Y",
      "4-5Y",
      "5-6Y",
      "7-8Y"
    ],
    "colors": [
      {
        "name": "Daisy Yellow",
        "hex": "#FEF08A"
      },
      {
        "name": "Pastel Sage",
        "hex": "#A4B89B"
      }
    ],
    "details": {
      "Fabric": "100% Breathable Organic Cotton with buttercup daisy floral print",
      "Fit": "Easy breezy flutter sleeves with matching soft bloomers",
      "Wash Care": "Machine wash gentle cold",
      "Return": "Yes",
      "Free Shipping": "Yes"
    },
    "description": "Charming yellow daisy floral dress with flutter cap sleeves, elasticated waist, and ultra-soft organic cotton gentle on delicate skin.",
    "returnsAllowed": true,
    "freeShipping": true
  },
  {
    "id": "RT-008",
    "name": "Kids Pastel Tiered Organic Cotton Sundress",
    "brand": "Riyaa Trends Kids",
    "brandSlug": "clothing",
    "category": "Clothing",
    "subcategory": "Dresses",
    "price": 36,
    "origPrice": 48,
    "rating": 4.9,
    "reviewCount": 62,
    "image": "images/kids_dress_tiered.jpg",
    "images": [
      "images/kids_dress_tiered.jpg",
      "images/kids_dress_daisy.jpg"
    ],
    "featured": true,
    "bestseller": false,
    "badge": "New Arrival",
    "stock": 25,
    "sizes": [
      "2-3Y",
      "3-4Y",
      "4-5Y",
      "5-6Y",
      "7-8Y"
    ],
    "colors": [
      {
        "name": "Sage & Blush Tiered",
        "hex": "#A4B89B"
      },
      {
        "name": "Soft Cream",
        "hex": "#FDFBF7"
      }
    ],
    "details": {
      "Fabric": "100% GOTS-Certified Muslin Cotton (Airy & lightweight)",
      "Fit": "Tiered ruffles with gentle wooden button placket and shoulder straps",
      "Wash Care": "Machine wash cold gentle",
      "Return": "Yes",
      "Free Shipping": "Yes"
    },
    "description": "Delicate three-tier cotton sundress in calming sage green and blush tones with natural wooden buttons and soft lace-trimmed hems.",
    "returnsAllowed": true,
    "freeShipping": true
  },
  {
    "id": "RT-001",
    "name": "Kids Organic Cotton Embroidered Sun Tee",
    "brand": "Riyaa Trends Kids",
    "brandSlug": "clothing",
    "category": "Clothing",
    "subcategory": "T-shirts",
    "price": 24,
    "origPrice": 32,
    "rating": 4.9,
    "reviewCount": 128,
    "image": "images/kids_tee_sage.jpg",
    "images": [
      "images/kids_tee_sage.jpg",
      "images/kids_tee_pastel.jpg"
    ],
    "featured": true,
    "bestseller": true,
    "badge": "Kids Favorite",
    "stock": 42,
    "sizes": [
      "2-3Y",
      "3-4Y",
      "4-5Y",
      "5-6Y",
      "7-8Y",
      "9-10Y"
    ],
    "colors": [
      {
        "name": "Pastel Sage",
        "hex": "#A4B89B"
      },
      {
        "name": "Sunshine Yellow",
        "hex": "#FDE047"
      },
      {
        "name": "Cotton Cloud",
        "hex": "#F8FAFC"
      }
    ],
    "details": {
      "Fabric": "100% GOTS-Certified Gentle Organic Cotton (Ultra-soft for sensitive kids skin)",
      "Fit": "Comfortable easy-movement play fit with tagless itch-free neck",
      "Wash Care": "Machine wash gentle cold, tumble dry low",
      "Return": "Yes",
      "Free Shipping": "No"
    },
    "description": "Super soft, breathable organic cotton tee crafted specially for playtime and everyday giggles. Features a joyful embroidered sun on the chest.",
    "returnsAllowed": true,
    "freeShipping": false
  },
  {
    "id": "RT-004",
    "name": "Kids Pastel Crewneck Play Tee",
    "brand": "Riyaa Trends Kids",
    "brandSlug": "clothing",
    "category": "Clothing",
    "subcategory": "T-shirts",
    "price": 22,
    "origPrice": 28,
    "rating": 4.7,
    "reviewCount": 83,
    "image": "images/kids_tee_pastel.jpg",
    "images": [
      "images/kids_tee_pastel.jpg",
      "images/kids_tee_sage.jpg"
    ],
    "featured": false,
    "bestseller": false,
    "badge": "Pastel Staple",
    "stock": 28,
    "sizes": [
      "2-3Y",
      "3-4Y",
      "4-5Y",
      "5-6Y",
      "7-8Y"
    ],
    "colors": [
      {
        "name": "Sky Blue",
        "hex": "#93C5FD"
      },
      {
        "name": "Peach Sorbet",
        "hex": "#FDBA74"
      }
    ],
    "details": {
      "Fabric": "100% Pre-washed Ringspun Cotton (Zero shrinkage)",
      "Fit": "Relaxed two-tone contrast collar cut for quick dressing",
      "Wash Care": "Machine wash cold",
      "Return": "Yes",
      "Free Shipping": "No"
    },
    "description": "Cheerful pastel sky-blue tee with peach neckband. Pre-washed for cloud-like softness right out of the box.",
    "returnsAllowed": true,
    "freeShipping": false
  },
  {
    "id": "RT-002",
    "name": "Kids French Terry Drawstring Play Shorts",
    "brand": "Riyaa Trends Kids",
    "brandSlug": "clothing",
    "category": "Clothing",
    "subcategory": "Shorts",
    "price": 26,
    "origPrice": 34,
    "rating": 4.8,
    "reviewCount": 94,
    "image": "images/kids_shorts_sand.jpg",
    "images": [
      "images/kids_shorts_sand.jpg"
    ],
    "featured": true,
    "bestseller": false,
    "badge": "Trending Playwear",
    "stock": 35,
    "sizes": [
      "2-3Y",
      "3-4Y",
      "4-5Y",
      "5-6Y",
      "7-8Y",
      "9-10Y"
    ],
    "colors": [
      {
        "name": "Warm Sand",
        "hex": "#CBB89E"
      },
      {
        "name": "Olive Green",
        "hex": "#7E8D6F"
      }
    ],
    "details": {
      "Fabric": "100% Brushed French Terry Cotton (Lightweight & durable)",
      "Fit": "Gentle non-pinching elastic waistband with soft cotton drawcord",
      "Wash Care": "Machine wash cold, easy tumble dry",
      "Return": "Yes",
      "Free Shipping": "No"
    },
    "description": "Designed for active little explorers. Ultra-soft French terry with rolled cuffs and a gentle, non-pinching elastic waistband.",
    "returnsAllowed": true,
    "freeShipping": false
  },
  {
    "id": "RT-005",
    "name": "Kids Linen-Blend Adventure Shorts",
    "brand": "Riyaa Trends Kids",
    "brandSlug": "clothing",
    "category": "Clothing",
    "subcategory": "Shorts",
    "price": 28,
    "origPrice": 36,
    "rating": 4.8,
    "reviewCount": 67,
    "image": "images/kids_shorts_sand.jpg",
    "images": [
      "images/kids_shorts_sand.jpg"
    ],
    "featured": false,
    "bestseller": false,
    "badge": "Summer Breezy",
    "stock": 24,
    "sizes": [
      "3-4Y",
      "4-5Y",
      "5-6Y",
      "7-8Y",
      "9-10Y"
    ],
    "colors": [
      {
        "name": "Oatmeal Linen",
        "hex": "#E5DDD0"
      },
      {
        "name": "Terracotta",
        "hex": "#B86548"
      }
    ],
    "details": {
      "Fabric": "55% Natural European Flax Linen, 45% Organic Cotton",
      "Fit": "Breathable airy cut for hot summer days",
      "Wash Care": "Machine wash gentle cold",
      "Return": "Yes",
      "Free Shipping": "No"
    },
    "description": "Breezy summer shorts keeping kids cool during park visits, beach days, and family outings.",
    "returnsAllowed": true,
    "freeShipping": false
  },
  {
    "id": "RT-003",
    "name": "Kids Cozy Fleece Tapered Track Pants",
    "brand": "Riyaa Trends Kids",
    "brandSlug": "clothing",
    "category": "Clothing",
    "subcategory": "Track Pants",
    "price": 32,
    "origPrice": 42,
    "rating": 4.9,
    "reviewCount": 156,
    "image": "images/kids_trackpants_navy.jpg",
    "images": [
      "images/kids_trackpants_navy.jpg"
    ],
    "featured": true,
    "bestseller": true,
    "badge": "Bestseller Jogger",
    "stock": 28,
    "sizes": [
      "2-3Y",
      "3-4Y",
      "4-5Y",
      "5-6Y",
      "7-8Y",
      "9-10Y"
    ],
    "colors": [
      {
        "name": "Slate Blue",
        "hex": "#3D4F66"
      },
      {
        "name": "Warm Oatmeal",
        "hex": "#D6CABA"
      }
    ],
    "details": {
      "Fabric": "Plush Organic Cotton Fleece with brushed cloud-soft interior",
      "Fit": "Tapered joggers with snug ribbed ankle cuffs (prevents tripping)",
      "Wash Care": "Machine wash cold inside-out",
      "Return": "Yes",
      "Free Shipping": "Yes"
    },
    "description": "The coziest joggers for little adventurers. Made with plush organic fleece, stretchy ankle cuffs that keep warmth in, and deep pockets.",
    "returnsAllowed": true,
    "freeShipping": true
  },
  {
    "id": "RT-006",
    "name": "Kids Heavyweight Fleece Winter Joggers",
    "brand": "Riyaa Trends Kids",
    "brandSlug": "clothing",
    "category": "Clothing",
    "subcategory": "Track Pants",
    "price": 34,
    "origPrice": 44,
    "rating": 4.9,
    "reviewCount": 110,
    "image": "images/kids_trackpants_navy.jpg",
    "images": [
      "images/kids_trackpants_navy.jpg"
    ],
    "featured": false,
    "bestseller": true,
    "badge": "Extra Cozy",
    "stock": 31,
    "sizes": [
      "2-3Y",
      "3-4Y",
      "4-5Y",
      "5-6Y",
      "7-8Y",
      "9-10Y"
    ],
    "colors": [
      {
        "name": "Heather Grey",
        "hex": "#CBD5E1"
      },
      {
        "name": "Forest Green",
        "hex": "#3F6212"
      }
    ],
    "details": {
      "Fabric": "Heavyweight 380 GSM Thermal Fleece",
      "Fit": "Snug cozy jogger fit with reinforced knees",
      "Wash Care": "Machine wash warm",
      "Return": "Yes",
      "Free Shipping": "Yes"
    },
    "description": "Extra-warm fleece joggers reinforced at the knees for active crawlers and climbers through chilly autumn and winter days.",
    "returnsAllowed": true,
    "freeShipping": true
  },
  {
    "id": "GH-001",
    "name": "French Lavender & Golden Amber Soy Candle",
    "brand": "Glow Home",
    "brandSlug": "candles",
    "category": "Candles",
    "subcategory": "Floral & Calming",
    "price": 28,
    "origPrice": 35,
    "rating": 4.9,
    "reviewCount": 142,
    "image": "images/glow_candle_lavender.jpg",
    "images": [
      "images/glow_candle_lavender.jpg"
    ],
    "featured": true,
    "bestseller": true,
    "stock": 50,
    "fragrance": "French Lavender & Golden Amber",
    "fragranceProfile": {
      "family": "Floral & Calming"
    },
    "details": {
      "Wax": "100% Hand-Poured Natural Soy Wax",
      "Burn Time": "50-55 Hours",
      "Wick": "Pure cotton lead-free braided wick",
      "Return": "Yes",
      "Free Shipping": "No"
    },
    "description": "A serene floral blend of wild French lavender buds, fresh herbal notes, and warm comforting amber.",
    "returnsAllowed": true,
    "freeShipping": false
  },
  {
    "id": "GH-002",
    "name": "Calabrian Bergamot & Lime Zest Candle",
    "brand": "Glow Home",
    "brandSlug": "candles",
    "category": "Candles",
    "subcategory": "Citrus & Uplifting",
    "price": 32,
    "origPrice": 40,
    "rating": 5,
    "reviewCount": 98,
    "image": "images/glow_candle_bergamot.jpg",
    "images": [
      "images/glow_candle_bergamot.jpg"
    ],
    "featured": true,
    "bestseller": false,
    "stock": 35,
    "fragrance": "Calabrian Bergamot & Lime Zest",
    "fragranceProfile": {
      "family": "Citrus & Uplifting"
    },
    "details": {
      "Wax": "Clean-Burning Botanical Soy Wax",
      "Burn Time": "55-60 Hours",
      "Wick": "Natural crackling wood wick",
      "Return": "Yes",
      "Free Shipping": "Yes"
    },
    "description": "Zesty Italian bergamot, fresh squeezed lime peel, and sparkling citron that invigorates and lifts your mood.",
    "returnsAllowed": true,
    "freeShipping": true
  },
  {
    "id": "GH-003",
    "name": "Mysore Sandalwood & Smoky Amber Candle",
    "brand": "Glow Home",
    "brandSlug": "candles",
    "category": "Candles",
    "subcategory": "Woody & Sensual",
    "price": 34,
    "origPrice": 42,
    "rating": 4.9,
    "reviewCount": 117,
    "image": "images/glow_candle_sandalwood.jpg",
    "images": [
      "images/glow_candle_sandalwood.jpg"
    ],
    "featured": true,
    "bestseller": true,
    "stock": 22,
    "fragrance": "Mysore Sandalwood & Smoky Amber",
    "fragranceProfile": {
      "family": "Woody & Sensual"
    },
    "details": {
      "Wax": "Dark Soy & Coconut Botanical Blend",
      "Burn Time": "55-60 Hours",
      "Wick": "Crackling hardwood wick",
      "Return": "Yes",
      "Free Shipping": "Yes"
    },
    "description": "Deep, meditative Mysore sandalwood infused with charred birch, golden resin amber, and earthy cedarwood.",
    "returnsAllowed": true,
    "freeShipping": true
  },
  {
    "id": "GH-004",
    "name": "Bourbon Vanilla & Wild Honeycomb Candle",
    "brand": "Glow Home",
    "brandSlug": "candles",
    "category": "Candles",
    "subcategory": "Gourmand & Warm",
    "price": 29,
    "origPrice": 36,
    "rating": 4.8,
    "reviewCount": 89,
    "image": "images/glow_candle_vanilla.jpg",
    "images": [
      "images/glow_candle_vanilla.jpg"
    ],
    "featured": false,
    "bestseller": false,
    "stock": 45,
    "fragrance": "Bourbon Vanilla & Wild Honeycomb",
    "fragranceProfile": {
      "family": "Gourmand & Warm"
    },
    "details": {
      "Wax": "Natural Soy & Organic Beeswax Blend",
      "Burn Time": "50 Hours",
      "Wick": "Organic cotton wick",
      "Return": "Yes",
      "Free Shipping": "No"
    },
    "description": "Warm Madagascar bourbon vanilla paired with golden raw honeycomb and sweet caramelized brown sugar.",
    "returnsAllowed": true,
    "freeShipping": false
  },
  {
    "id": "GH-005",
    "name": "White Jasmine & Green Tea Mist Candle",
    "brand": "Glow Home",
    "brandSlug": "candles",
    "category": "Candles",
    "subcategory": "Floral & Calming",
    "price": 30,
    "origPrice": 38,
    "rating": 4.7,
    "reviewCount": 76,
    "image": "images/glow_candle_jasmine.jpg",
    "images": [
      "images/glow_candle_jasmine.jpg"
    ],
    "featured": false,
    "bestseller": false,
    "stock": 28,
    "fragrance": "White Jasmine & Green Tea",
    "fragranceProfile": {
      "family": "Floral & Calming"
    },
    "details": {
      "Wax": "100% Pure Soy Wax in Matte White Jar",
      "Burn Time": "50-55 Hours",
      "Wick": "Dual-core cotton wick",
      "Return": "Yes",
      "Free Shipping": "No"
    },
    "description": "Delicate nighttime jasmine blossoms infused with crisp steamed green tea leaves and refreshing herbal dew.",
    "returnsAllowed": true,
    "freeShipping": false
  },
  {
    "id": "GH-006",
    "name": "Spiced Cinnamon & Clementine Apothecary Candle",
    "brand": "Glow Home",
    "brandSlug": "candles",
    "category": "Candles",
    "subcategory": "Spice & Festive",
    "price": 31,
    "origPrice": 38,
    "rating": 4.9,
    "reviewCount": 104,
    "image": "images/glow_candle_cinnamon.jpg",
    "images": [
      "images/glow_candle_cinnamon.jpg"
    ],
    "featured": false,
    "bestseller": false,
    "stock": 32,
    "fragrance": "Spiced Cinnamon & Clementine",
    "fragranceProfile": {
      "family": "Spice & Festive"
    },
    "details": {
      "Wax": "Terracotta Vessel Natural Soy Wax",
      "Burn Time": "52 Hours",
      "Wick": "Crackling wood wick",
      "Return": "Yes",
      "Free Shipping": "Yes"
    },
    "description": "Festive crushed cinnamon sticks, dried clementine peel, ground clove, and a hint of warm nutmeg.",
    "returnsAllowed": true,
    "freeShipping": true
  },
  {
    "id": "EK-001",
    "name": "Solitaire Moissanite Brilliant Round Studs",
    "brand": "Earkart",
    "brandSlug": "studs",
    "category": "Studs",
    "subcategory": "Solitaire & Classic",
    "price": 65,
    "origPrice": 85,
    "rating": 5,
    "reviewCount": 215,
    "image": "images/earkart_stud_diamond.jpg",
    "images": [
      "images/earkart_stud_diamond.jpg"
    ],
    "featured": true,
    "bestseller": true,
    "stock": 35,
    "design": "4-Prong Classic Basket Setting",
    "material": "Solid 925 Sterling Silver with Pure Rhodium Dip",
    "gemstone": "Certified VVS1 D-Color Lab Moissanite (1.0ct eq. each)",
    "details": {
      "Material": "Solid 925 Sterling Silver (Rhodium plated)",
      "Gemstone": "D-Color Flawless Moissanite",
      "Hypoallergenic": "100% Nickel-free, safe for daily wear",
      "Return": "Yes",
      "Free Shipping": "Yes"
    },
    "description": "Exceptional brilliance with unmatched diamond-grade fire. Secure 4-prong baskets with double-notched safety posts.",
    "returnsAllowed": true,
    "freeShipping": true
  },
  {
    "id": "EK-002",
    "name": "Vintage Emerald-Cut Gemstone Halo Studs",
    "brand": "Earkart",
    "brandSlug": "studs",
    "category": "Studs",
    "subcategory": "Vintage & Statement",
    "price": 78,
    "origPrice": 98,
    "rating": 4.9,
    "reviewCount": 168,
    "image": "images/earkart_stud_emerald.jpg",
    "images": [
      "images/earkart_stud_emerald.jpg"
    ],
    "featured": true,
    "bestseller": true,
    "stock": 28,
    "design": "Art Deco Emerald Cut with Micro-Pavé Halo",
    "material": "18K Yellow Gold Vermeil over 925 Silver",
    "gemstone": "Colombian Green Emerald Zirconia",
    "details": {
      "Material": "18K Gold Vermeil over 925 Sterling Silver",
      "Gemstone": "Emerald-cut Forest Green Crystal",
      "Hypoallergenic": "Ultra-gentle on sensitive earlobes",
      "Return": "Yes",
      "Free Shipping": "Yes"
    },
    "description": "Regal vintage grandeur. Deep forest green emeralds framed by glistening pavé accents and warm 18K gold vermeil.",
    "returnsAllowed": true,
    "freeShipping": true
  },
  {
    "id": "EK-003",
    "name": "Luminous Baroque Freshwater Pearl Blossom Studs",
    "brand": "Earkart",
    "brandSlug": "studs",
    "category": "Studs",
    "subcategory": "Pearls & Organic",
    "price": 52,
    "origPrice": 68,
    "rating": 4.9,
    "reviewCount": 134,
    "image": "images/earkart_stud_pearl.jpg",
    "images": [
      "images/earkart_stud_pearl.jpg"
    ],
    "featured": true,
    "bestseller": false,
    "stock": 32,
    "design": "Organic Baroque Pearl Setting",
    "material": "14K Solid Yellow Gold Posts",
    "gemstone": "AAA Grade Natural Freshwater Baroque Pearls (9-10mm)",
    "details": {
      "Material": "14K Solid Gold Posts",
      "Gemstone": "Natural AAA Freshwater Baroque Pearl",
      "Hypoallergenic": "Naturally biocompatible",
      "Return": "Yes",
      "Free Shipping": "Yes"
    },
    "description": "Naturally iridescent organic baroque pearls with pink-champagne undertones set on solid 14K gold posts.",
    "returnsAllowed": true,
    "freeShipping": true
  },
  {
    "id": "EK-004",
    "name": "Architectural Honeycomb Hexagon Studs",
    "brand": "Earkart",
    "brandSlug": "studs",
    "category": "Studs",
    "subcategory": "Minimalist Geometric",
    "price": 46,
    "origPrice": 58,
    "rating": 4.8,
    "reviewCount": 91,
    "image": "images/earkart_stud_honeycomb.jpg",
    "images": [
      "images/earkart_stud_honeycomb.jpg"
    ],
    "featured": false,
    "bestseller": false,
    "stock": 38,
    "design": "Open Honeycomb Hexagon with Center Micro-Diamonds",
    "material": "18K Yellow Gold with Protective E-Coating",
    "gemstone": "Micro-Pavé Cubic Zirconia cluster",
    "details": {
      "Material": "18K Gold Plated with Anti-Tarnish E-Shield",
      "Gemstone": "Micro-faceted Brilliant Zirconia",
      "Hypoallergenic": "Hypoallergenic titanium post core",
      "Return": "No",
      "Free Shipping": "No"
    },
    "description": "Clean modern lines inspired by architectural geometry with sparkling cluster centers in warm 18K yellow gold.",
    "returnsAllowed": false,
    "freeShipping": false
  },
  {
    "id": "EK-005",
    "name": "Celestial Starburst Pavé Diamond Studs",
    "brand": "Earkart",
    "brandSlug": "studs",
    "category": "Studs",
    "subcategory": "Celestial & Whimsical",
    "price": 49,
    "origPrice": 62,
    "rating": 4.8,
    "reviewCount": 82,
    "image": "images/earkart_stud_starburst.jpg",
    "images": [
      "images/earkart_stud_starburst.jpg"
    ],
    "featured": false,
    "bestseller": false,
    "stock": 25,
    "design": "Eight-Point Polaris North Star Motif",
    "material": "925 Sterling Silver with Micro-Pavé Setting",
    "gemstone": "Brilliant White Topaz Zirconia stones",
    "details": {
      "Material": "925 Sterling Silver with Pure Rhodium Dip",
      "Gemstone": "Multi-stone Micro-Pavé Accent Array",
      "Hypoallergenic": "100% Nickel-free",
      "Return": "Yes",
      "Free Shipping": "No"
    },
    "description": "Intricate 8-point celestial starbursts sparkling with pavé-set gemstones that catch the light with every turn.",
    "returnsAllowed": true,
    "freeShipping": false
  },
  {
    "id": "EK-006",
    "name": "Midnight Noir Bezel-Set Onyx Studs",
    "brand": "Earkart",
    "brandSlug": "studs",
    "category": "Studs",
    "subcategory": "Minimalist Geometric",
    "price": 42,
    "origPrice": 54,
    "rating": 4.7,
    "reviewCount": 74,
    "image": "images/earkart_cat.jpg",
    "images": [
      "images/earkart_cat.jpg"
    ],
    "featured": false,
    "bestseller": false,
    "stock": 40,
    "design": "Low-profile Bezel Round Studs (6mm)",
    "material": "Surgical-grade 316L Stainless Steel with Black PVD",
    "gemstone": "Natural Black Onyx Cabochon",
    "details": {
      "Material": "316L Surgical Stainless Steel",
      "Gemstone": "Natural Polished Black Onyx",
      "Hypoallergenic": "Medical-grade hypoallergenic",
      "Return": "No",
      "Free Shipping": "No"
    },
    "description": "Sleek, moody, and universally flattering. Genuine black onyx in a smooth protective bezel. Safe for 24/7 wear.",
    "returnsAllowed": false,
    "freeShipping": false
  }
];

const STORE_BRANDS = [
  {
    "id": "clothing",
    "name": "Riyaa Trends Kids",
    "category": "Clothing",
    "tagline": "Organic, Playful and Ultra-Soft Kids Apparel",
    "description": "Gentle on sensitive skin, made for daily play. Discover organic cotton dresses, tees, play shorts, and joggers.",
    "subcategories": [
      "All",
      "Dresses",
      "T-shirts",
      "Shorts",
      "Track Pants"
    ],
    "banner": "images/kids_banner.jpg",
    "itemCount": 8,
    "accentColor": "#4d7c0f",
    "accentLight": "#f7fee7"
  },
  {
    "id": "candles",
    "name": "Glow Home",
    "category": "Candles",
    "tagline": "Hand-Poured Soy Aromatherapy and Cozy Ambiance",
    "description": "Curated olfactory journeys in natural soy wax, crackling wooden wicks, and artisan ceramic vessels.",
    "subcategories": [
      "All",
      "Floral & Calming",
      "Citrus & Uplifting",
      "Woody & Sensual",
      "Gourmand & Warm",
      "Spice & Festive"
    ],
    "banner": "images/glow_home_cat.jpg",
    "itemCount": 6,
    "accentColor": "#b45309",
    "accentLight": "#fef3c7"
  },
  {
    "id": "studs",
    "name": "Earkart",
    "category": "Studs",
    "tagline": "Hypoallergenic Fine Gemstones and Modern Geometrics",
    "description": "High-sparkle moissanite solitaires, 18K gold vermeil vintage emeralds, organic freshwater pearls, and architectural geometries.",
    "subcategories": [
      "All",
      "Solitaire & Classic",
      "Vintage & Statement",
      "Pearls & Organic",
      "Minimalist Geometric",
      "Celestial & Whimsical"
    ],
    "banner": "images/earkart_cat.jpg",
    "itemCount": 6,
    "accentColor": "#0f766e",
    "accentLight": "#ccfbf1"
  }
];

const COUPONS = {
  "LIMETREE10": {
    "discount": 0.1,
    "type": "percent",
    "label": "10% Off First Order"
  },
  "WELCOME20": {
    "discount": 20,
    "type": "fixed",
    "minSpend": 80,
    "label": "$20 Off Orders Over $80"
  },
  "GLOWVIBES": {
    "discount": 0,
    "freeShipping": true,
    "label": "Free Express Shipping"
  }
};
