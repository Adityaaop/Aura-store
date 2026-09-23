const getProducts = (categoryMap) => [
  {
    name: "Aura Horizon ANC Headphones",
    image: "/uploads/headphones.jpg",
    brand: "Aura Audio",
    quantity: 45,
    category: categoryMap["Audio"],
    description:
      "Engineered with custom 40mm beryllium drivers and active adaptive noise cancellation. Features plush memory foam earcups, ultra-low latency wireless streaming, 40 hours of playback, and a refined matte black architectural finish.",
    rating: 4.9,
    numReviews: 38,
    price: 349,
    countInStock: 25,
  },
  {
    name: "Aura Shift Wireless Mechanical Keyboard",
    image: "/uploads/keyboard.jpg",
    brand: "Aura Workspace",
    quantity: 60,
    category: categoryMap["Peripherals"],
    description:
      "CNC-machined aluminum body featuring hot-swappable tactile switches, sound-dampening acoustic silicone pads, double-shot PBT keycaps, and customizable warm ambient underglow. Engineered for ultimate tactile precision.",
    rating: 4.8,
    numReviews: 29,
    price: 219,
    countInStock: 18,
  },
  {
    name: "Aura Titanium Smartwatch Ultra",
    image: "/uploads/smartwatch.jpg",
    brand: "Aura Wear",
    quantity: 35,
    category: categoryMap["Wearables"],
    description:
      "Crafted from aerospace-grade brushed titanium with a scratch-resistant sapphire crystal OLED display. Equipped with biometric health tracking, ECG monitoring, standalone GPS, and 7-day battery endurance.",
    rating: 4.9,
    numReviews: 44,
    price: 499,
    countInStock: 14,
  },
  {
    name: "Aura SoundSphere Smart Speaker",
    image: "/uploads/speaker.jpg",
    brand: "Aura Audio",
    quantity: 50,
    category: categoryMap["Audio"],
    description:
      "High-fidelity room-filling 360-degree acoustics housed in an acoustic mesh and anodized aluminum cylinder. Features ambient halo light indicators, lossless Wi-Fi / Bluetooth streaming, and smart assistant integration.",
    rating: 4.7,
    numReviews: 21,
    price: 279,
    countInStock: 20,
  },
  {
    name: "Aura Lumina Mirrorless Cinema Camera",
    image: "/uploads/camera.jpg",
    brand: "Aura Optical",
    quantity: 20,
    category: categoryMap["Photography"],
    description:
      "Full-frame 45MP back-illuminated sensor with 8K RAW cinema recording capability, 5-axis in-body image stabilization, tactical knurled dials, and dual card slots. Designed for discerning visual artists and filmmakers.",
    rating: 5.0,
    numReviews: 17,
    price: 1899,
    countInStock: 8,
  },
  {
    name: "Aura Artisan Felt & Leather Desk Pad",
    image: "/uploads/deskmat.jpg",
    brand: "Aura Workspace",
    quantity: 100,
    category: categoryMap["Workspace"],
    description:
      "Handcrafted from high-density charcoal merino wool felt and premium full-grain Italian leather organizer tray. Includes an embedded magnetic cable channel and wireless charging alignment pad.",
    rating: 4.9,
    numReviews: 32,
    price: 89,
    countInStock: 45,
  },
];

export default getProducts;
