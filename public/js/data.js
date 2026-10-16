// LimeTree Catalog Data & Seed Data (Riyaa Trends, Glow Home, Earkart)
const INITIAL_PRODUCTS = [
  {
    id: "RT-001",
    name: "Heavyweight Organic Relaxed Tee",
    brand: "Riyaa Trends",
    brandSlug: "clothing",
    category: "Clothing",
    subcategory: "T-shirts",
    price: 34.00,
    origPrice: 44.00,
    rating: 4.9,
    reviewCount: 128,
    image: "images/riyaa_tee_sage.jpg",
    images: [
      "images/riyaa_tee_sage.jpg",
      "images/riyaa_trends_cat.jpg",
      "images/limetree_hero.jpg"
    ],
    featured: true,
    bestseller: true,
    badge: "Bestseller",
    stock: 42,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Sage Green", hex: "#8FA382" },
      { name: "Sand Beige", hex: "#D6C4B0" },
      { name: "Washed Slate", hex: "#3A4550" },
      { name: "Chalk White", hex: "#F3F1EC" }
    ],
    details: {
      "Fabric": "100% GOTS-Certified Organic Combed Cotton (240 GSM)",
      "Fit": "Relaxed boxy cut with drop shoulder & reinforced rib collar",
      "Wash Care": "Machine wash cold inside-out, tumble dry low or line dry"
    },
    description: "Designed for everyday ease, this premium heavyweight t-shirt from Riyaa Trends delivers the ultimate combination of tailored drape and breathable softness. Pre-shrunk and garment-dyed for vintage charm and zero color fading."
  },
  {
    id: "RT-002",
    name: "French Terry Everyday Lounge Shorts",
    brand: "Riyaa Trends",
    brandSlug: "clothing",
    category: "Clothing",
    subcategory: "Shorts",
    price: 38.00,
    origPrice: 48.00,
    rating: 4.8,
    reviewCount: 94,
    image: "images/riyaa_shorts_sand.jpg",
    images: [
      "images/riyaa_shorts_sand.jpg",
      "images/riyaa_trends_cat.jpg"
    ],
    featured: true,
    bestseller: false,
    badge: "Trending",
    stock: 35,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Warm Sand", hex: "#C8B59E" },
      { name: "Olive Moss", hex: "#6F7C63" },
      { name: "Midnight Navy", hex: "#222B38" }
    ],
    details: {
      "Fabric": "320 GSM Premium French Terry Cotton with loopback interior",
      "Fit": "Above-the-knee 6-inch inseam with custom-dyed metal-tipped drawcord",
      "Wash Care": "Gentle cycle cold, flat air dry"
    },
    description: "The signature Riyaa Trends lounge shorts strike the perfect balance between relaxed weekend lounging and city errands. Features deep slanted pockets, tailored side vents, and an ultra-soft brushed finish."
  },
  {
    id: "RT-003",
    name: "Performance Flex Tapered Track Pants",
    brand: "Riyaa Trends",
    brandSlug: "clothing",
    category: "Clothing",
    subcategory: "Track Pants",
    price: 54.00,
    origPrice: 68.00,
    rating: 4.9,
    reviewCount: 156,
    image: "images/riyaa_trackpants_slate.jpg",
    images: [
      "images/riyaa_trackpants_slate.jpg",
      "images/riyaa_trends_cat.jpg"
    ],
    featured: true,
    bestseller: true,
    badge: "Popular",
    stock: 28,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Midnight Slate", hex: "#2B3342" },
      { name: "Forest Olive", hex: "#3D493A" },
      { name: "Melange Grey", hex: "#6F757D" }
    ],
    details: {
      "Fabric": "Four-way stretch breathable modal & recycled poly-blend with DWR finish",
      "Fit": "Tapered athletic fit with ribbed ankle cuffs and articulated knees",
      "Wash Care": "Machine wash cold, air dry quickly"
    },
    description: "Engineered for movement and all-day comfort. Features concealed YKK zip pockets, aerodynamic seam lines, and an ergonomic waistband that never digs in."
  },
  {
    id: "RT-004",
    name: "Mineral Wash Vintage Boxy Tee",
    brand: "Riyaa Trends",
    brandSlug: "clothing",
    category: "Clothing",
    subcategory: "T-shirts",
    price: 36.00,
    origPrice: 46.00,
    rating: 4.7,
    reviewCount: 83,
    image: "images/riyaa_trends_cat.jpg",
    images: [
      "images/riyaa_trends_cat.jpg",
      "images/riyaa_tee_sage.jpg"
    ],
    featured: false,
    bestseller: false,
    badge: "Vintage",
    stock: 19,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Mineral Charcoal", hex: "#43464B" },
      { name: "Bone White", hex: "#EBE7DF" },
      { name: "Sage Mist", hex: "#949F8F" }
    ],
    details: {
      "Fabric": "100% Combed Compact Cotton (220 GSM) with natural stone wash",
      "Fit": "Streetwear oversized drop-shoulder silhouette",
      "Wash Care": "Machine wash cold, avoid tumble dry"
    },
    description: "Artisan mineral-washed tee providing that coveted lived-in aesthetic with buttery handfeel and shape retention through hundreds of wears."
  },
  {
    "id": "RT-005",
    "name": "Resort Linen Blend Drawstring Shorts",
    "brand": "Riyaa Trends",
    "brandSlug": "clothing",
    "category": "Clothing",
    "subcategory": "Shorts",
    "price": 44.00,
    "origPrice": 56.00,
    "rating": 4.8,
    "reviewCount": 67,
    "image": "images/riyaa_shorts_sand.jpg",
    "images": [
      "images/riyaa_shorts_sand.jpg",
      "images/riyaa_trends_cat.jpg"
    ],
    featured: false,
    bestseller: false,
    badge: "Linen",
    stock: 24,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Natural Flax", hex: "#D8CDBC" },
      { name: "Washed Navy", hex: "#303C4D" }
    ],
    details: {
      "Fabric": "55% European Flax Linen, 45% Organic Cotton",
      "Fit": "Relaxed resort cut with breathable airy weave",
      "Wash Care": "Hand wash or gentle machine wash cold"
    },
    description: "Breezy luxury tailored for sunny afternoons, coastal holidays, or casual terrace lunches. Naturally thermoregulating fabric that keeps you effortlessly cool."
  },
  {
    "id": "RT-006",
    "name": "Heritage Heavy Fleece Track Pants",
    "brand": "Riyaa Trends",
    "brandSlug": "clothing",
    "category": "Clothing",
    "subcategory": "Track Pants",
    "price": 58.00,
    "origPrice": 72.00,
    "rating": 4.9,
    "reviewCount": 110,
    "image": "images/riyaa_trackpants_slate.jpg",
    "images": [
      "images/riyaa_trackpants_slate.jpg"
    ],
    featured: false,
    bestseller: true,
    badge: "Cozy Fleece",
    stock: 31,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Oatmeal Heather", hex: "#CBC6BD" },
      { name: "Pitch Black", hex: "#1C1C1E" }
    ],
    details: {
      "Fabric": "400 GSM Ultra-dense Cotton Fleece with brushed thermal interior",
      "Fit": "Classic cozy streetwear jogger fit",
      "Wash Care": "Machine wash warm inside out"
    },
    description: "Pure cocooning warmth. Crafted from heavyweight plush fleece with reinforced seams, back patch pocket, and thick ribbed cuffs."
  },
  {
    id: "GH-001",
    name: "French Lavender & Golden Amber Soy Candle",
    brand: "Glow Home",
    brandSlug: "candles",
    category: "Candles",
    subcategory: "Floral & Calming",
    price: 28.00,
    origPrice: 35.00,
    rating: 4.9,
    reviewCount: 142,
    image: "images/glow_candle_lavender.jpg",
    images: [
      "images/glow_candle_lavender.jpg",
      "images/glow_home_cat.jpg",
      "images/limetree_hero.jpg"
    ],
    featured: true,
    bestseller: true,
    badge: "Aromatherapy",
    stock: 50,
    fragrance: "French Lavender & Golden Amber",
    fragranceProfile: {
      family: "Floral & Herbal",
      top: "Wild Provence Lavender, Bergamot Blossom",
      heart: "Chamomile Petals, French Lilac",
      base: "Warm Amber, Tonka Bean, Creamy Vanilla"
    },
    details: {
      "Wax Type": "100% Hand-Poured Natural Soy Wax",
      "Burn Time": "50-55 Hours (8 oz / 226g)",
      "Wick": "Pure cotton lead-free braided wick",
      "Vessel": "Amber apothecary glass jar with matte black lid"
    },
    description: "Transform your sanctuary with this calming blend of sun-drenched French lavender fields softened by glowing golden amber and Madagascar vanilla. Hand-poured into an apothecary amber glass jar that casts a mesmerizing, soothing amber glow."
  },
  {
    id: "GH-002",
    name: "Calabrian Bergamot & Lime Zest Candle",
    brand: "Glow Home",
    brandSlug: "candles",
    category: "Candles",
    subcategory: "Citrus & Uplifting",
    price: 32.00,
    origPrice: 40.00,
    rating: 5.0,
    reviewCount: 98,
    image: "images/glow_candle_bergamot.jpg",
    images: [
      "images/glow_candle_bergamot.jpg",
      "images/glow_home_cat.jpg"
    ],
    featured: true,
    bestseller: true,
    badge: "Lime Signature",
    stock: 40,
    fragrance: "Bergamot & Fresh Lime Zest",
    fragranceProfile: {
      family: "Citrus & Fresh",
      top: "Crushed Lime Leaves, Sparkling Calabrian Bergamot, Mandarin",
      heart: "White Basil, Jasmine Sambac",
      base: "Vetiver, Blonde Woods, Sheer Musk"
    },
    details: {
      "Wax Type": "Creamy Coconut & Soy Botanical Wax Blend",
      "Burn Time": "55-60 Hours (8.5 oz / 241g)",
      "Wick": "FSC-certified crackling wooden wick",
      "Vessel": "Textured off-white artisan ceramic tumbler"
    },
    description: "An energizing, sun-filled citrus explosion. Notes of crisp kaffir lime zest and sun-ripened Italian bergamot nestled in an artisanal off-white matte ceramic vessel. The natural wooden wick crackles gently like an intimate hearth."
  },
  {
    id: "GH-003",
    name: "Mysore Sandalwood & Smoky Amber Candle",
    brand: "Glow Home",
    brandSlug: "candles",
    category: "Candles",
    subcategory: "Woody & Sensual",
    price: 34.00,
    origPrice: 42.00,
    rating: 4.9,
    reviewCount: 117,
    image: "images/glow_candle_sandalwood.jpg",
    images: [
      "images/glow_candle_sandalwood.jpg",
      "images/glow_home_cat.jpg"
    ],
    featured: true,
    bestseller: false,
    badge: "Artisanal",
    stock: 34,
    fragrance: "Mysore Sandalwood & Smoky Amber",
    fragranceProfile: {
      family: "Woody & Earthy",
      top: "Smoked Cardamom, Pink Peppercorn",
      heart: "Cedarwood Atlas, Tuscan Leather, Iris",
      base: "Mysore Sandalwood, Raw Amber, Dark Musk"
    },
    details: {
      "Wax Type": "100% Natural Soy Wax with essential oils",
      "Burn Time": "60 Hours (9 oz / 255g)",
      "Wick": "Dual acoustic crackling wood wicks",
      "Vessel": "Matte dark charcoal stone ceramic vessel"
    },
    description: "Intensely luxurious and grounding. Housed in a handcrafted matte slate ceramic vessel, this fragrance envelops any room in meditative warmth, rich sandalwood, and glowing amber."
  },
  {
    id: "GH-004",
    name: "Bourbon Vanilla & Wild Honeycomb Candle",
    brand: "Glow Home",
    brandSlug: "candles",
    category: "Candles",
    subcategory: "Gourmand & Warm",
    price: 29.00,
    origPrice: 36.00,
    rating: 4.8,
    reviewCount: 89,
    image: "images/glow_home_cat.jpg",
    images: [
      "images/glow_home_cat.jpg",
      "images/glow_candle_lavender.jpg"
    ],
    featured: false,
    bestseller: false,
    badge: "Sweet Comfort",
    stock: 26,
    fragrance: "Bourbon Vanilla & Honey",
    fragranceProfile: {
      family: "Warm Gourmand",
      top: "Almond Milk, Whipped Buttercream",
      heart: "Wild Mountain Honey, Coconut Orchid",
      base: "Cured Bourbon Vanilla Beans, Soft Cashmere"
    },
    details: {
      "Wax Type": "Pure Soy Wax in warm terracotta jar",
      "Burn Time": "50 Hours (8 oz / 226g)",
      "Wick": "Braided organic cotton wick",
      "Vessel": "Earthy terracotta vessel with raw rim"
    },
    description: "A warm comforting hug in candle form. Rich, unctuous vanilla pods steeped in bourbon and wildflower nectar create an intoxicatingly sweet aroma that feels like coming home."
  },
  {
    id: "GH-005",
    name: "White Jasmine & Green Tea Mist Candle",
    brand: "Glow Home",
    brandSlug: "candles",
    category: "Candles",
    subcategory: "Floral & Calming",
    price: 30.00,
    origPrice: 38.00,
    rating: 4.7,
    reviewCount: 76,
    image: "images/glow_candle_lavender.jpg",
    images: [
      "images/glow_candle_lavender.jpg"
    ],
    featured: false,
    bestseller: false,
    badge: "Zen Spa",
    stock: 22,
    fragrance: "White Jasmine & Green Tea",
    fragranceProfile: {
      family: "Fresh Floral",
      top: "Dewy Green Tea, Fresh Mint, Yuzu",
      heart: "Night-blooming Jasmine, White Lily",
      base: "Clean Cedar, Bamboo, Sheer Musk"
    },
    details: {
      "Wax Type": "100% Plant-Based Soy Wax",
      "Burn Time": "48 Hours (7.5 oz / 212g)",
      "Wick": "Cotton core lead-free wick",
      "Vessel": "Ribbed frosted glass jar"
    },
    description: "Delicate and ethereal, reminiscent of a quiet misty morning in a Kyoto botanical garden. Perfect for bedrooms, soothing baths, and mindfulness rituals."
  },
  {
    id: "GH-006",
    name: "Spiced Cinnamon & Clementine Candle",
    brand: "Glow Home",
    brandSlug: "candles",
    category: "Candles",
    subcategory: "Spice & Festive",
    price: 31.00,
    origPrice: 38.00,
    rating: 4.9,
    reviewCount: 104,
    image: "images/glow_candle_bergamot.jpg",
    images: [
      "images/glow_candle_bergamot.jpg"
    ],
    featured: false,
    bestseller: false,
    badge: "Warm Spice",
    stock: 38,
    fragrance: "Spiced Cinnamon & Clementine",
    fragranceProfile: {
      family: "Warm Spice",
      top: "Sparkling Clementine, Blood Orange Peel",
      heart: "Crushed Ceylon Cinnamon, Nutmeg, Star Anise",
      base: "Clove Bud, Warm Vanilla, Spiced Cedar"
    },
    details: {
      "Wax Type": "Clean-burning Soy Wax Blend",
      "Burn Time": "52 Hours (8 oz / 226g)",
      "Wick": "FSC crackling wooden wick",
      "Vessel": "Classic amber glass apothecary jar"
    },
    description: "A celebratory spice melody that infuses your space with festive cheer, crackling sounds, and heartwarming memories."
  },
  {
    id: "EK-001",
    name: "Solitaire Moissanite Brilliant Round Studs",
    brand: "Earkart",
    brandSlug: "studs",
    category: "Studs",
    subcategory: "Solitaire & Classic",
    price: 65.00,
    origPrice: 85.00,
    rating: 5.0,
    reviewCount: 215,
    image: "images/earkart_stud_diamond.jpg",
    images: [
      "images/earkart_stud_diamond.jpg",
      "images/earkart_cat.jpg",
      "images/limetree_hero.jpg"
    ],
    featured: true,
    bestseller: true,
    badge: "Certified Moissanite",
    stock: 45,
    design: "Classic 4-Prong Basket Solitaire (1.0 Carat DEW per ear)",
    material: "Solid 925 Sterling Silver with Rhodium Anti-Tarnish Plating",
    gemstone: "Color D, VVS1 Clarity Round Brilliant Lab Moissanite",
    backing: "Secure Double-Notch Friction Backs",
    details: {
      "Material": "Solid 925 Sterling Silver + Pure Rhodium Finish",
      "Gemstone": "1.0ct DEW each (6.5mm) Lab-Grown Moissanite",
      "Hypoallergenic": "100% Nickel-free, Lead-free, Cadmium-free",
      "Closure": "Friction butterfly back with secure safety notch"
    },
    description: "Unrivaled brilliance that outshines traditional diamonds with 2.4x the fire and dispersion. Each pair is handcrafted in genuine 925 sterling silver with protective rhodium finish for timeless everyday luxury that never tarnishes."
  },
  {
    id: "EK-002",
    name: "Vintage Emerald-Cut Gemstone Halo Studs",
    brand: "Earkart",
    brandSlug: "studs",
    category: "Studs",
    subcategory: "Vintage & Statement",
    price: 78.00,
    origPrice: 98.00,
    rating: 4.9,
    reviewCount: 168,
    image: "images/earkart_stud_emerald.jpg",
    images: [
      "images/earkart_stud_emerald.jpg",
      "images/earkart_cat.jpg"
    ],
    featured: true,
    bestseller: true,
    badge: "18K Gold Vermeil",
    stock: 28,
    design: "Art Deco Emerald Cut with Micro-Pavé Halo Border",
    material: "18K Yellow Gold Vermeil (2.5 Micron) over 925 Silver",
    gemstone: "Lab-Grown Colombian Green Emerald Zirconia (8x6mm)",
    backing: "Custom Comfort Disk Push Backs",
    details: {
      "Material": "18K Yellow Gold Vermeil over 925 Sterling Silver",
      "Gemstone": "Emerald-cut Forest Green Crystal with Pavé Zirconia Halo",
      "Hypoallergenic": "Ultra-gentle on sensitive earlobes",
      "Closure": "Comfort silicone disc back with gold core"
    },
    description: "A regal statement inspired by vintage heirloom jewelry. Deep forest green emeralds framed by glistening pavé accents and warm 18K gold vermeil settings. Perfect for special evenings or elevating daily attire."
  },
  {
    id: "EK-003",
    name: "Luminous Baroque Freshwater Pearl Blossom Studs",
    brand: "Earkart",
    brandSlug: "studs",
    category: "Studs",
    subcategory: "Pearls & Organic",
    price: 52.00,
    origPrice: 68.00,
    rating: 4.9,
    reviewCount: 134,
    image: "images/earkart_stud_pearl.jpg",
    images: [
      "images/earkart_stud_pearl.jpg",
      "images/earkart_cat.jpg"
    ],
    featured: true,
    bestseller: false,
    badge: "Natural Pearl",
    stock: 32,
    design: "Organic Sculpted Baroque Pearl Setting",
    material: "14K Solid Yellow Gold Posts & Cups",
    gemstone: "Hand-selected AAA Grade Natural Freshwater Baroque Pearls (9-10mm)",
    backing: "14K Gold Butterfly Backs",
    details: {
      "Material": "14K Solid Gold Posts with Hand-Polished Finish",
      "Gemstone": "Natural AAA Freshwater Baroque Pearl (9-10mm)",
      "Hypoallergenic": "Naturally biocompatible for everyday wear",
      "Closure": "14K Gold Butterfly Backing"
    },
    description: "No two pearls are identical. Naturally iridescent baroque pearls with lustrous pink-champagne undertones set on solid 14K gold posts. Understated organic elegance for weddings, work, and every day."
  },
  {
    id: "EK-004",
    name: "Architectural Honeycomb Hexagon Studs",
    brand: "Earkart",
    brandSlug: "studs",
    category: "Studs",
    subcategory: "Minimalist Geometric",
    price: 46.00,
    origPrice: 58.00,
    rating: 4.8,
    reviewCount: 91,
    image: "images/earkart_cat.jpg",
    images: [
      "images/earkart_cat.jpg",
      "images/earkart_stud_emerald.jpg"
    ],
    featured: false,
    bestseller: false,
    badge: "Modernist",
    stock: 38,
    design: "Open Honeycomb Hexagon with Center Bezel Sparkle",
    material: "18K Gold Plated Brass with Protective E-Coating",
    gemstone: "0.05ct Flawless Micro Cubic Zirconia accent",
    backing: "Silicone-cushioned Push Backs",
    details: {
      "Material": "18K Yellow Gold with Anti-Tarnish E-Shield",
      "Gemstone": "Micro-faceted Brilliant Zirconia",
      "Hypoallergenic": "Hypoallergenic titanium post core",
      "Closure": "Soft silicone comfort backs"
    },
    description: "Clean modern lines inspired by sacred geometry. Light as air and designed to be worn solo or stacked along the ear lobe alongside your favorite hoops."
  },
  {
    id: "EK-005",
    name: "Celestial Starburst Pavé Diamond Studs",
    brand: "Earkart",
    brandSlug: "studs",
    category: "Studs",
    subcategory: "Celestial & Whimsical",
    price: 49.00,
    origPrice: 62.00,
    rating: 4.8,
    reviewCount: 82,
    image: "images/earkart_stud_diamond.jpg",
    images: [
      "images/earkart_stud_diamond.jpg"
    ],
    featured: false,
    bestseller: false,
    badge: "Celestial",
    stock: 25,
    design: "Eight-Point Polaris North Star Motif",
    material: "925 Sterling Silver with Micro-Pavé Setting",
    gemstone: "Brilliant White Topaz Zirconia stones",
    backing: "Screw Backs for Extra Security",
    details: {
      "Material": "925 Sterling Silver with Pure Rhodium Dip",
      "Gemstone": "Multi-stone Micro-Pavé Accent Array",
      "Hypoallergenic": "100% Nickel-free",
      "Closure": "Threaded screw back for worry-free security"
    },
    description: "Wear the starlight. Intricate 8-point celestial starbursts sparkling with pavé-set gemstones that catch the light with every turn."
  },
  {
    id: "EK-006",
    name: "Midnight Noir Bezel-Set Onyx Studs",
    brand: "Earkart",
    brandSlug: "studs",
    category: "Studs",
    subcategory: "Minimalist Geometric",
    price: 42.00,
    origPrice: 54.00,
    rating: 4.7,
    reviewCount: 74,
    image: "images/earkart_stud_emerald.jpg",
    images: [
      "images/earkart_stud_emerald.jpg"
    ],
    featured: false,
    bestseller: false,
    badge: "Onyx Stone",
    stock: 40,
    design: "Low-profile Bezel Round Studs (6mm)",
    material: "Surgical-grade 316L Stainless Steel with Black PVD",
    gemstone: "Natural Black Onyx Cabochon",
    backing: "Threaded Screw-back Post",
    details: {
      "Material": "316L Surgical Stainless Steel",
      "Gemstone": "Natural Polished Black Onyx",
      "Hypoallergenic": "Medical-grade hypoallergenic",
      "Closure": "Smooth screw back post"
    },
    description: "Sleek, moody, and universally flattering. Genuine black onyx in a smooth protective bezel. Water-resistant, sweat-proof, and safe for 24/7 wear in gym, shower, or sleep."
  }
];

const STORE_BRANDS = [
  {
    id: "clothing",
    name: "Riyaa Trends",
    category: "Clothing",
    tagline: "Effortless Everyday Streetwear & Loungewear",
    description: "Comfort meets modern streetwear aesthetics. Premium heavyweight organic cotton tees, tailored French terry shorts, and flex track pants made for daily movement.",
    subcategories: ["All", "T-shirts", "Shorts", "Track Pants"],
    banner: "images/riyaa_trends_cat.jpg",
    itemCount: 6,
    accentColor: "#4d7c0f",
    accentLight: "#f7fee7"
  },
  {
    id: "candles",
    name: "Glow Home",
    category: "Scented Candles",
    tagline: "Hand-Poured Soy Aromatherapy & Cozy Ambiance",
    description: "Curated olfactory journeys in natural soy wax, crackling wooden wicks, and artisan ceramic vessels. Designed to elevate mood, induce peace, and make home a sanctuary.",
    subcategories: ["All", "Floral & Calming", "Citrus & Uplifting", "Woody & Sensual", "Gourmand & Warm"],
    banner: "images/glow_home_cat.jpg",
    itemCount: 6,
    accentColor: "#b45309",
    accentLight: "#fef3c7"
  },
  {
    id: "studs",
    name: "Earkart",
    category: "Ear Studs",
    tagline: "Hypoallergenic Fine Gemstones & Modern Geometrics",
    description: "High-sparkle moissanite solitaires, 18K gold vermeil vintage emeralds, organic freshwater pearls, and architectural geometries that treat sensitive ears with love.",
    subcategories: ["All", "Solitaire & Classic", "Vintage & Statement", "Pearls & Organic", "Minimalist Geometric"],
    banner: "images/earkart_cat.jpg",
    itemCount: 6,
    accentColor: "#0f766e",
    accentLight: "#ccfbf1"
  }
];

const COUPONS = {
  "LIMETREE10": { discount: 0.10, type: "percent", label: "10% Off First Order" },
  "WELCOME20": { discount: 20.00, type: "fixed", minSpend: 80, label: "$20 Off Orders Over $80" },
  "GLOWVIBES": { discount: 0, freeShipping: true, label: "Free Express Shipping" }
};
