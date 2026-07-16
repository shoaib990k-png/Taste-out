import { Product } from '../types';

// Shared category-appropriate fallback images
const IMG = {
  icecream: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&q=80&w=600',
  faluda:   'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=600',
  shake:    'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&q=80&w=600',
  waffle:   'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=600',
  lollipop: 'https://images.unsplash.com/photo-1549395156-e0c1fe6fc7a5?auto=format&fit=crop&q=80&w=600',
  pancake:  'https://images.unsplash.com/photo-1517093602195-b40af9688b46?auto=format&fit=crop&q=80&w=600',
};

export const products: Product[] = [

  /* ────────────── ICE CREAM ────────────── */
  {
    id: 'ic-1',
    slug: 'ice-cream-scoops',
    name: 'Ice Cream Scoops',
    category: 'Ice Cream',
    description: 'Creamy handcrafted ice cream scoops. Choose your quantity.',
    image: IMG.icecream,
    isBestSeller: true,
    variants: [
      { id: 'single', label: 'Single Scoop',  price: 110 },
      { id: 'double', label: 'Double Scoop',  price: 200 },
      { id: 'triple', label: 'Triple Scoop',  price: 300 },
      { id: 'six',    label: 'Six Scoops',    price: 550 },
    ],
    addons: [
      { id: 'extra-topping', label: 'Extra Topping (One Scoop)', price: 40 },
    ],
  },

  /* ────────────── FALUDA ────────────── */
  {
    id: 'fa-1',
    slug: 'surprise-faluda',
    name: 'Surprise Faluda',
    category: 'Faluda',
    description: 'A delightful surprise faluda loaded with rich toppings and creamy goodness.',
    image: IMG.faluda,
    price: 440,
  },
  {
    id: 'fa-2',
    slug: 'simple-faluda',
    name: 'Simple Faluda',
    category: 'Faluda',
    description: 'Classic faluda made with creamy milk, basil seeds and vermicelli.',
    image: IMG.faluda,
    price: 340,
  },

  /* ────────────── SHAKES ────────────── */
  {
    id: 'sh-1',
    slug: 'kitkat-shake',
    name: 'KitKat Shake',
    category: 'Shakes',
    description: 'Creamy KitKat-flavoured shake.',
    image: IMG.shake,
    price: 380,
    isBestSeller: true,
  },
  {
    id: 'sh-2',
    slug: 'oreo-shake',
    name: 'Oreo Shake',
    category: 'Shakes',
    description: 'Creamy Oreo-flavoured shake.',
    image: IMG.shake,
    price: 380,
  },
  {
    id: 'sh-3',
    slug: 'chocolate-shake',
    name: 'Chocolate Shake',
    category: 'Shakes',
    description: 'Classic chocolate shake.',
    image: IMG.shake,
    price: 290,
  },
  {
    id: 'sh-4',
    slug: 'vanilla-shake',
    name: 'Vanilla Shake',
    category: 'Shakes',
    description: 'Classic vanilla shake.',
    image: IMG.shake,
    price: 290,
  },
  {
    id: 'sh-5',
    slug: 'mango-shake',
    name: 'Mango Shake',
    category: 'Shakes',
    description: 'Refreshing mango shake.',
    image: IMG.shake,
    price: 290,
  },
  {
    id: 'sh-6',
    slug: 'strawberry-shake',
    name: 'Strawberry Shake',
    category: 'Shakes',
    description: 'Refreshing strawberry shake.',
    image: IMG.shake,
    price: 290,
  },

  /* ────────────── BELGIUM WAFFLES ────────────── */
  {
    id: 'bw-1',
    slug: 'kitkat-belgium-waffle',
    name: 'Kit-Kat Belgium Waffle',
    category: 'Belgium Waffles',
    description: 'Chocolate spread, KitKat and chocolate syrup.',
    image: IMG.waffle,
    variants: [
      { id: 'quarter', label: 'Quarter', price: 360 },
      { id: 'half',    label: 'Half',    price: 720 },
    ],
  },
  {
    id: 'bw-2',
    slug: 'oreo-belgium-waffle',
    name: 'Oreo Belgium Waffle',
    category: 'Belgium Waffles',
    description: 'Chocolate spread, Oreo and chocolate syrup.',
    image: IMG.waffle,
    variants: [
      { id: 'quarter', label: 'Quarter', price: 340 },
      { id: 'half',    label: 'Half',    price: 680 },
    ],
  },
  {
    id: 'bw-3',
    slug: 'lotus-belgium-waffle',
    name: 'Lotus Belgium Waffle',
    category: 'Belgium Waffles',
    description: 'Chocolate spread, Lotus spread and chocolate syrup.',
    image: IMG.waffle,
    variants: [
      { id: 'quarter', label: 'Quarter', price: 390 },
      { id: 'half',    label: 'Half',    price: 780 },
    ],
  },
  {
    id: 'bw-4',
    slug: 'dairy-milk-belgium-waffle',
    name: 'Dairy Milk Belgium Waffle',
    category: 'Belgium Waffles',
    description: 'Chocolate spread, chocolate syrup and Dairy Milk.',
    image: IMG.waffle,
    variants: [
      { id: 'quarter', label: 'Quarter', price: 350 },
      { id: 'half',    label: 'Half',    price: 700 },
    ],
  },
  {
    id: 'bw-5',
    slug: 'taste-out-special-belgium-waffle',
    name: 'Taste Out Special Belgium Waffle',
    category: 'Belgium Waffles',
    description: 'Chocolate spread, chocolate syrup, Oreo, Lotus, almond, pistachio and one ice cream scoop.',
    image: IMG.waffle,
    isBestSeller: true,
    variants: [
      { id: 'quarter', label: 'Quarter', price: 360 },
      { id: 'half',    label: 'Half',    price: 720 },
    ],
  },

  /* ────────────── LOLLIPOP WAFFLES ────────────── */
  {
    id: 'lw-1',
    slug: 'choco-bunty-lollipop-waffle',
    name: 'Choco Bunty Lollipop Waffle',
    category: 'Lollipop Waffles',
    description: 'Chocolate spread and Bunty.',
    image: IMG.lollipop,
    price: 290,
  },
  {
    id: 'lw-2',
    slug: 'oreo-lollipop-waffle',
    name: 'Oreo Lollipop Waffle',
    category: 'Lollipop Waffles',
    description: 'Chocolate spread, Oreo and chocolate syrup.',
    image: IMG.lollipop,
    price: 300,
  },
  {
    id: 'lw-3',
    slug: 'lotus-lollipop-waffle',
    name: 'Lotus Lollipop Waffle',
    category: 'Lollipop Waffles',
    description: 'Chocolate spread, Lotus spread and caramel syrup.',
    image: IMG.lollipop,
    price: 340,
  },
  {
    id: 'lw-4',
    slug: 'choco-sprinkles-lollipop-waffle',
    name: 'Choco Sprinkles Lollipop Waffle',
    category: 'Lollipop Waffles',
    description: 'Chocolate spread and sprinkles.',
    image: IMG.lollipop,
    price: 300,
  },
  {
    id: 'lw-5',
    slug: 'taste-out-special-lollipop-waffle',
    name: 'Taste Out Special Lollipop Waffle',
    category: 'Lollipop Waffles',
    description: 'Chocolate spread, chocolate syrup, almond and pistachio.',
    image: IMG.lollipop,
    price: 350,
    isBestSeller: true,
  },

  /* ────────────── PAN CAKES ────────────── */
  {
    id: 'pc-1',
    slug: 'oreo-pan-cakes',
    name: 'Oreo Pan Cakes',
    category: 'Pan Cakes',
    description: 'Chocolate spread, Oreo and chocolate syrup.',
    image: IMG.pancake,
    variants: [
      { id: '6pcs',  label: '6 Pieces',  price: 340 },
      { id: '12pcs', label: '12 Pieces', price: 680 },
    ],
  },
  {
    id: 'pc-2',
    slug: 'lotus-pan-cakes',
    name: 'Lotus Pan Cakes',
    category: 'Pan Cakes',
    description: 'Chocolate spread, Lotus and caramel syrup.',
    image: IMG.pancake,
    variants: [
      { id: '6pcs',  label: '6 Pieces',  price: 380 },
      { id: '12pcs', label: '12 Pieces', price: 760 },
    ],
  },
  {
    id: 'pc-3',
    slug: 'dairy-milk-pan-cakes',
    name: 'Dairy Milk Pan Cakes',
    category: 'Pan Cakes',
    description: 'Chocolate spread, chocolate chips and Dairy Milk.',
    image: IMG.pancake,
    variants: [
      { id: '6pcs',  label: '6 Pieces',  price: 380 },
      { id: '12pcs', label: '12 Pieces', price: 760 },
    ],
  },
  {
    id: 'pc-4',
    slug: 'taste-out-special-pan-cakes',
    name: 'Taste Out Special Pan Cakes',
    category: 'Pan Cakes',
    description: 'Chocolate spread, chocolate syrup, almond, pistachio and one ice cream scoop.',
    image: IMG.pancake,
    isBestSeller: true,
    variants: [
      { id: '6pcs',  label: '6 Pieces',  price: 400 },
      { id: '12pcs', label: '12 Pieces', price: 780 },
    ],
  },
];
