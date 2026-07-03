export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  rating: number;
  reviews: number;
  badge?: string;
  colors?: string[];
  description: string;
  specs: { label: string; value: string }[];
  seller: { name: string; avatar: string; rating: number; sales: number; verified: boolean };
  stock: number;
  sold: number;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  productCount: number;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 299.99,
    originalPrice: 399.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop",
    ],
    category: "Electronics",
    rating: 4.8,
    reviews: 2453,
    badge: "Best Seller",
    colors: ["#1A1A1A", "#F5F5DC", "#004242"],
    description: "Experience studio-quality sound with our Premium Wireless Headphones. Featuring advanced Active Noise Cancellation, 40-hour battery life, and ultra-comfortable memory foam ear cushions. Bluetooth 5.3 ensures seamless connectivity with all your devices.",
    specs: [
      { label: "Driver Size", value: "40mm Dynamic" },
      { label: "Frequency Response", value: "20Hz - 20kHz" },
      { label: "Battery Life", value: "40 Hours" },
      { label: "Charging", value: "USB-C Fast Charge" },
      { label: "Connectivity", value: "Bluetooth 5.3" },
      { label: "Weight", value: "250g" },
    ],
    seller: { name: "AudioTech Official", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face", rating: 4.9, sales: 12400, verified: true },
    stock: 156,
    sold: 2453,
  },
  {
    id: "2",
    name: "Minimalist Leather Watch",
    price: 189.00,
    originalPrice: 249.00,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=800&h=800&fit=crop",
    ],
    category: "Accessories",
    rating: 4.9,
    reviews: 1823,
    badge: "New",
    colors: ["#8B4513", "#1A1A1A", "#D4A574"],
    description: "Timeless elegance meets modern craftsmanship. This minimalist leather watch features a genuine Italian leather strap, sapphire crystal glass, and Japanese quartz movement. Water-resistant up to 50 meters.",
    specs: [
      { label: "Movement", value: "Japanese Quartz" },
      { label: "Case Material", value: "Stainless Steel" },
      { label: "Strap", value: "Genuine Italian Leather" },
      { label: "Water Resistance", value: "50 meters" },
      { label: "Case Diameter", value: "40mm" },
      { label: "Glass", value: "Sapphire Crystal" },
    ],
    seller: { name: "LuxeTime Store", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face", rating: 4.8, sales: 8900, verified: true },
    stock: 89,
    sold: 1823,
  },
  {
    id: "3",
    name: "Smart Fitness Tracker",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1510017803434-a899398421b3?w=800&h=800&fit=crop",
    ],
    category: "Electronics",
    rating: 4.6,
    reviews: 3102,
    colors: ["#004242", "#FF6B4A", "#1A1A1A"],
    description: "Track every move with precision. Advanced heart rate monitoring, sleep tracking, GPS, and 14-day battery life. Water-resistant and built for any adventure.",
    specs: [
      { label: "Display", value: "1.4\" AMOLED" },
      { label: "Sensors", value: "Heart Rate, SpO2, GPS" },
      { label: "Battery", value: "14 Days" },
      { label: "Water Resistance", value: "IP68" },
      { label: "Compatibility", value: "iOS & Android" },
      { label: "Weight", value: "35g" },
    ],
    seller: { name: "FitGear Pro", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face", rating: 4.7, sales: 15600, verified: true },
    stock: 234,
    sold: 3102,
  },
  {
    id: "4",
    name: "Organic Cotton Hoodie",
    price: 89.00,
    originalPrice: 120.00,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1578768079470-0a4a41d64a19?w=800&h=800&fit=crop",
    ],
    category: "Fashion",
    rating: 4.7,
    reviews: 987,
    badge: "30% OFF",
    colors: ["#004242", "#F0EDE8", "#1A1A1A"],
    description: "Sustainable comfort at its finest. Made from 100% organic cotton with a brushed fleece interior. Relaxed fit with kangaroo pocket and adjustable drawstring hood.",
    specs: [
      { label: "Material", value: "100% Organic Cotton" },
      { label: "Fit", value: "Relaxed" },
      { label: "Care", value: "Machine Washable" },
      { label: "Origin", value: "Ethically Made" },
      { label: "Weight", value: "350 GSM" },
    ],
    seller: { name: "EcoWear Co.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face", rating: 4.6, sales: 5600, verified: true },
    stock: 312,
    sold: 987,
  },
  {
    id: "5",
    name: "Bamboo Sunglasses",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&h=800&fit=crop",
    ],
    category: "Accessories",
    rating: 4.5,
    reviews: 654,
    colors: ["#8B4513", "#1A1A1A"],
    description: "Eco-friendly style with premium UV400 polarized lenses. Handcrafted bamboo frames that are lightweight, durable, and sustainable.",
    specs: [
      { label: "Frame", value: "Natural Bamboo" },
      { label: "Lenses", value: "UV400 Polarized" },
      { label: "Weight", value: "28g" },
      { label: "Includes", value: "Bamboo Case & Cloth" },
    ],
    seller: { name: "Green Shades", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face", rating: 4.5, sales: 3200, verified: true },
    stock: 178,
    sold: 654,
  },
  {
    id: "6",
    name: "Portable Bluetooth Speaker",
    price: 79.99,
    originalPrice: 109.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&h=800&fit=crop",
    ],
    category: "Electronics",
    rating: 4.8,
    reviews: 4210,
    badge: "Hot Deal",
    colors: ["#004242", "#FF6B4A"],
    description: "360-degree immersive sound in a compact design. IPX7 waterproof, 24-hour playtime, and built-in microphone for hands-free calls.",
    specs: [
      { label: "Output", value: "20W" },
      { label: "Battery", value: "24 Hours" },
      { label: "Waterproof", value: "IPX7" },
      { label: "Connectivity", value: "Bluetooth 5.0" },
      { label: "Weight", value: "540g" },
    ],
    seller: { name: "SoundWave Audio", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face", rating: 4.8, sales: 21000, verified: true },
    stock: 445,
    sold: 4210,
  },
  {
    id: "7",
    name: "Canvas Sneakers",
    price: 59.00,
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop",
    ],
    category: "Fashion",
    rating: 4.4,
    reviews: 1567,
    colors: ["#FFFFFF", "#1A1A1A", "#004242"],
    description: "Classic canvas sneakers with a modern twist. Vulcanized rubber sole for durability, cushioned insole for all-day comfort.",
    specs: [
      { label: "Upper", value: "Canvas" },
      { label: "Sole", value: "Vulcanized Rubber" },
      { label: "Insole", value: "Cushioned EVA" },
      { label: "Closure", value: "Lace-Up" },
    ],
    seller: { name: "StepStyle", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face", rating: 4.4, sales: 9800, verified: true },
    stock: 567,
    sold: 1567,
  },
  {
    id: "8",
    name: "Smart Home Hub",
    price: 199.99,
    originalPrice: 279.99,
    image: "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=800&fit=crop",
    ],
    category: "Electronics",
    rating: 4.7,
    reviews: 2890,
    badge: "Trending",
    colors: ["#F0EDE8", "#1A1A1A"],
    description: "Control your entire smart home from one device. Compatible with 500+ smart devices, voice assistant built-in, and advanced automation routines.",
    specs: [
      { label: "Compatibility", value: "500+ Devices" },
      { label: "Voice Assistant", value: "Built-in" },
      { label: "Connectivity", value: "WiFi 6, Zigbee, Z-Wave" },
      { label: "Display", value: "7\" Touch Screen" },
      { label: "Speakers", value: "Dual 10W" },
    ],
    seller: { name: "SmartLife Tech", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face", rating: 4.7, sales: 7800, verified: true },
    stock: 123,
    sold: 2890,
  },
];

export const categories: Category[] = [
  { id: "1", name: "Electronics", image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=400&h=400&fit=crop", productCount: 156 },
  { id: "2", name: "Fashion", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop", productCount: 234 },
  { id: "3", name: "Accessories", image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=400&fit=crop", productCount: 189 },
  { id: "4", name: "Home & Living", image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=400&fit=crop", productCount: 312 },
  { id: "5", name: "Sports", image: "https://images.unsplash.com/photo-1461896836934-bd45ba8a0e41?w=400&h=400&fit=crop", productCount: 98 },
  { id: "6", name: "Beauty", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop", productCount: 167 },
];

export const carouselProducts = products.slice(0, 6).map((p, i) => ({
  ...p,
  badge: i === 0 ? "Trending" : i === 1 ? "New" : i === 2 ? "Hot" : undefined,
}));

export const reviews = [
  { id: 1, reviewer: "Sarah Chen", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face", product: "Premium Wireless Headphones", rating: 5, text: "Absolutely love these! The sound quality is incredible and the noise cancellation is top-notch. Best purchase I've made this year.", date: "2 days ago", verified: true },
  { id: 2, reviewer: "Marcus Rodriguez", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face", product: "Smart Fitness Watch", rating: 5, text: "This watch tracks everything perfectly. The Web3 integration for health data is genius. Highly recommend!", date: "5 days ago", verified: true },
  { id: 3, reviewer: "Aisha Patel", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face", product: "Minimalist Backpack", rating: 4, text: "Great quality and design. The blockchain certificate of authenticity is a nice touch. Would buy again.", date: "1 week ago", verified: true },
  { id: 4, reviewer: "James Wilson", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face", product: "Wireless Earbuds Pro", rating: 5, text: "Perfect fit, amazing sound, and the crypto cashback is a sweet bonus. The future of shopping!", date: "1 week ago", verified: true },
  { id: 5, reviewer: "Elena Kowalski", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face", product: "Vintage Leather Jacket", rating: 5, text: "This jacket is stunning. The NFT certificate proves it's genuine leather. Fast shipping too!", date: "2 weeks ago", verified: true },
  { id: 6, reviewer: "David Kim", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face", product: "Pro Camera Lens", rating: 5, text: "Crystal clear images. The blockchain verification gave me confidence in the authenticity. 10/10.", date: "2 weeks ago", verified: true },
];

export const offers = [
  "MEGA SALE: Up to 50% off on Electronics",
  "FREE SHIPPING on orders over $50",
  "NEW USERS: Get 20% off with code WELCOME20",
  "FLASH DEAL: Smart Watch at $99 only today",
  "BUY 2 GET 1 FREE on all Fashion items",
  "EXCLUSIVE: Early access to Summer Collection 2026",
  "WEB3 BONUS: Pay with crypto and get 5% extra off",
];
