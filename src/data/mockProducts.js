const mockProducts = [
  {
    title: "Apple iPhone 15 Pro Max - 256GB - Titanium (Unlocked) eSIM",
    description: "Experience the ultimate iPhone experience. Features a strong and light titanium design, a new Action button, powerful camera system upgrades, and A17 Pro for next-level mobile gaming performance.",
    price: 899.99,
    originalPrice: 1199.99,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1695048133137-7756f709191d?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1695048133202-b2585eb803d5?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop"
    ],
    condition: "Certified Refurbished",
    shippingPrice: 0,
    sellerName: "Refurbished_Outlet",
    sellerRating: 98.8,
    rating: 4.8,
    reviewsCount: 342,
    watchersCount: 154,
    availableStock: 48,
    soldCount: 104
  },
  {
    title: "Samsung Galaxy S24 Ultra 512GB Titanium Black SM-S928U Unlocked",
    description: "Brand new Samsung Galaxy S24 Ultra in box. Comes with S-Pen, active warranty, and original accessories. 120Hz AMOLED display and 200MP camera.",
    price: 999.00,
    originalPrice: 1299.00,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1610945415295-d9b21034b5c1?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&auto=format&fit=crop"
    ],
    condition: "New",
    shippingPrice: 5.99,
    sellerName: "Direct_Tech_Deals",
    sellerRating: 99.4,
    rating: 4.9,
    reviewsCount: 128,
    watchersCount: 89,
    availableStock: 12,
    soldCount: 38
  },
  {
    title: "Sony WH-1000XM5 Wireless Noise Canceling Headphones - Black",
    description: "Used for 2 months, excellent condition with minimal signs of wear. Noise canceling works perfectly. Original case and charging cable included.",
    price: 199.99,
    originalPrice: 399.99,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&auto=format&fit=crop"
    ],
    condition: "Used",
    shippingPrice: 0,
    sellerName: "Liquidations_Express",
    sellerRating: 97.2,
    rating: 4.6,
    reviewsCount: 84,
    watchersCount: 42,
    availableStock: 3,
    soldCount: 19
  },
  {
    title: "Nike Air Max 90 Running Shoes - White/Black/Red - Men's Size 10",
    description: "100% Authentic, brand new in original box. Legendary comfort, classic style. Features visible Air unit in the heel and durable leather upper.",
    price: 89.95,
    originalPrice: 130.00,
    category: "Fashion",
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582921017967-79d1cb17e359?w=600&auto=format&fit=crop"
    ],
    condition: "New",
    shippingPrice: 0,
    sellerName: "ShoeHaven",
    sellerRating: 99.7,
    rating: 4.7,
    reviewsCount: 1104,
    watchersCount: 231,
    availableStock: 250,
    soldCount: 842
  },
  {
    title: "Vintage Levi's 501 Button Fly Blue Denim Jeans Size 34x32",
    description: "Classic vintage Levi's 501 made in USA. Nice natural wear and fade patterns. No tears, holes, or stains. Perfectly broken in.",
    price: 45.00,
    originalPrice: 79.99,
    category: "Fashion",
    imageUrl: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=600&auto=format&fit=crop"
    ],
    condition: "Used",
    shippingPrice: 4.50,
    sellerName: "Thrift_Legends",
    sellerRating: 99.1,
    rating: 4.5,
    reviewsCount: 19,
    watchersCount: 12,
    availableStock: 1,
    soldCount: 4
  },
  {
    title: "Dyson V15 Detect Cordless Vacuum Cleaner | Yellow/Nickel",
    description: "Dyson official certified refurbished. Rigorously tested by Dyson engineers to function like new. Includes cleaner head, combination tool, and wall dock.",
    price: 429.99,
    originalPrice: 749.99,
    category: "Home & Garden",
    imageUrl: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1562240020-ce31ccb0fa7d?w=600&auto=format&fit=crop"
    ],
    condition: "Certified Refurbished",
    shippingPrice: 0,
    sellerName: "Dyson_Direct_Store",
    sellerRating: 99.8,
    rating: 4.9,
    reviewsCount: 887,
    watchersCount: 114,
    availableStock: 15,
    soldCount: 89
  },
  {
    title: "Rolex Submariner Date 126610LN Oystersteel 41mm Automatic Watch",
    description: "2022 model, comes complete with green Rolex box, warranty card, manual, and green tag. Minor hairline scratches on clasp, otherwise mint.",
    price: 13950.00,
    originalPrice: 15500.00,
    category: "Collectibles",
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=600&auto=format&fit=crop"
    ],
    condition: "Used",
    shippingPrice: 49.99,
    sellerName: "Swiss_Timepieces",
    sellerRating: 100.0,
    rating: 5.0,
    reviewsCount: 34,
    watchersCount: 78,
    availableStock: 1,
    soldCount: 2
  },
  {
    title: "Weber Original Kettle 22-Inch Charcoal Grill - Black",
    description: "Open box display model, never used or fired up. Missing original cardboard packaging but includes all grates, manual, and ash catcher.",
    price: 109.00,
    originalPrice: 139.00,
    category: "Home & Garden",
    imageUrl: "https://images.unsplash.com/photo-1555529771-7888783a18d3?w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1555529771-7888783a18d3?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop"
    ],
    condition: "Open box",
    shippingPrice: 0,
    sellerName: "Home_Goodies_Co",
    sellerRating: 98.5,
    rating: 4.8,
    reviewsCount: 412,
    watchersCount: 16,
    availableStock: 4,
    soldCount: 18
  },
  {
    title: "Canon EOS R5 Mirrorless Digital Camera Body Only 45MP 8K Video",
    description: "Immaculate condition Canon R5 body. Shutter count is only 2,300. Includes original battery, charger, strap, and box.",
    price: 2499.00,
    originalPrice: 3899.00,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1495707902641-75cac588d2e9?w=600&auto=format&fit=crop"
    ],
    condition: "Used",
    shippingPrice: 12.00,
    sellerName: "Camera_Vault",
    sellerRating: 99.6,
    rating: 4.7,
    reviewsCount: 92,
    watchersCount: 55,
    availableStock: 2,
    soldCount: 9
  },
  {
    title: "Pokemon TCG Vintage 1999 Base Set Booster Pack Art Set (3 Packs)",
    description: "Charizard, Blastoise, and Venusaur artwork packs. Packs are unweighed, factory sealed, and in pristine condition from a sealed booster box.",
    price: 999.99,
    originalPrice: 1200.00,
    category: "Collectibles",
    imageUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop"
    ],
    condition: "New",
    shippingPrice: 15.00,
    sellerName: "PokeNostalgia",
    sellerRating: 99.9,
    rating: 5.0,
    reviewsCount: 148,
    watchersCount: 301,
    availableStock: 10,
    soldCount: 24
  },
  {
    title: "Ancel AD310 OBD2 Car Diagnostic Scanner Code Reader Engine Light",
    description: "Brand new OBD2 scanner for all cars. Easily check and clear engine diagnostic codes. Backlit LCD screen and plug-and-play setup.",
    price: 24.95,
    originalPrice: 39.99,
    category: "Motors",
    imageUrl: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=600&auto=format&fit=crop"
    ],
    condition: "New",
    shippingPrice: 0,
    sellerName: "AutoToolsDirect",
    sellerRating: 99.3,
    rating: 4.6,
    reviewsCount: 4531,
    watchersCount: 142,
    availableStock: 75,
    soldCount: 384
  },
  {
    title: "17-Inch Alloy Wheel Rim for 2018-2022 Honda Accord Sedan",
    description: "Used OEM factory replacement wheel. Tested straight and true. Has light curb rash on outer edge, but cosmetically clean.",
    price: 115.00,
    originalPrice: 220.00,
    category: "Motors",
    imageUrl: "https://images.unsplash.com/photo-1611245781329-87399db7335d?w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1611245781329-87399db7335d?w=600&auto=format&fit=crop"
    ],
    condition: "Used",
    shippingPrice: 18.50,
    sellerName: "PartRecyclers",
    sellerRating: 98.2,
    rating: 4.4,
    reviewsCount: 78,
    watchersCount: 8,
    availableStock: 2,
    soldCount: 14
  }
];

export default mockProducts;
