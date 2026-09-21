/* ============================================================
   BizLink — Township Business & Delivery App
   Plain JS build of the original React + Tailwind demo.
   Screens: signin | signup | landing | browse | orders |
            order-detail | order-track | order-delivered | profile
   ============================================================ */

/* ---------------- Mock Data ---------------- */
const productArt = (urlOrVariant, start, end, accent) => {
  if (typeof urlOrVariant === 'string' && urlOrVariant.startsWith('http')) return urlOrVariant;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="${start}"/>
          <stop offset="100%" stop-color="${end}"/>
        </linearGradient>
      </defs>
      <rect width="400" height="300" rx="28" fill="url(#g)"/>
      <rect x="98" y="76" width="204" height="148" rx="22" fill="rgba(255,255,255,0.16)" stroke="rgba(255,255,255,0.35)"/>
      <circle cx="300" cy="90" r="70" fill="rgba(255,255,255,0.2)"/>
      <circle cx="90" cy="240" r="95" fill="rgba(255,255,255,0.13)"/>
    </svg>
  `)}`;
};

const productPackshot = ({ brand, name, accent, secondary, kind }) => `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="900" height="900" viewBox="0 0 900 900">
    <defs>
      <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stop-color="${secondary}"/>
        <stop offset="100%" stop-color="${accent}"/>
      </linearGradient>
    </defs>
    <rect width="900" height="900" rx="76" fill="url(#bg)"/>
    <circle cx="720" cy="130" r="150" fill="rgba(255,255,255,0.14)"/>
    <circle cx="180" cy="720" r="210" fill="rgba(255,255,255,0.08)"/>
    ${kind === 'bag' ? `
      <path d="M260 250h380l65 500H195l65-500z" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.35)" stroke-width="14"/>
      <path d="M330 300c0-90 60-150 120-150s120 60 120 150" fill="none" stroke="rgba(255,255,255,0.75)" stroke-width="22" stroke-linecap="round"/>
      <text x="450" y="410" font-size="140" text-anchor="middle" font-weight="900" fill="#fffdf6" font-family="Arial, sans-serif">${brand}</text>
      <text x="450" y="560" font-size="78" text-anchor="middle" font-weight="700" fill="#fffdf6" font-family="Arial, sans-serif">${name}</text>
      <text x="450" y="640" font-size="54" text-anchor="middle" fill="#fffdf6" font-family="Arial, sans-serif">10kg</text>
    ` : kind === 'bottle' ? `
      <rect x="310" y="170" width="280" height="550" rx="58" fill="rgba(255,255,255,0.16)" stroke="rgba(255,255,255,0.48)" stroke-width="12"/>
      <rect x="355" y="104" width="190" height="120" rx="30" fill="rgba(255,255,255,0.2)"/>
      <rect x="390" y="80" width="120" height="62" rx="14" fill="rgba(255,255,255,0.28)"/>
      <text x="450" y="345" font-size="120" text-anchor="middle" font-weight="900" fill="#fff" font-family="Arial, sans-serif">${brand}</text>
      <text x="450" y="465" font-size="52" text-anchor="middle" fill="#fff" font-family="Arial, sans-serif">${name}</text>
      <text x="450" y="620" font-size="46" text-anchor="middle" fill="#fff" font-family="Arial, sans-serif">2L</text>
    ` : kind === 'can' ? `
      <rect x="300" y="180" width="300" height="500" rx="110" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.42)" stroke-width="12"/>
      <rect x="330" y="130" width="240" height="100" rx="24" fill="rgba(255,255,255,0.16)"/>
      <text x="450" y="350" font-size="100" text-anchor="middle" font-weight="900" fill="#fff" font-family="Arial, sans-serif">${brand}</text>
      <text x="450" y="500" font-size="52" text-anchor="middle" fill="#fff" font-family="Arial, sans-serif">${name}</text>
      <text x="450" y="610" font-size="42" text-anchor="middle" fill="#fff" font-family="Arial, sans-serif">500ml</text>
    ` : kind === 'bread' ? `
      <path d="M220 580c0-120 90-220 220-220s220 100 220 220v95H220v-95z" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.44)" stroke-width="12"/>
      <path d="M285 430c55-70 130-110 165-110 80 0 155 55 165 140" fill="none" stroke="rgba(255,255,255,0.8)" stroke-width="22" stroke-linecap="round"/>
      <text x="450" y="370" font-size="100" text-anchor="middle" font-weight="900" fill="#fff" font-family="Arial, sans-serif">${brand}</text>
      <text x="450" y="500" font-size="52" text-anchor="middle" fill="#fff" font-family="Arial, sans-serif">${name}</text>
      <text x="450" y="610" font-size="40" text-anchor="middle" fill="#fff" font-family="Arial, sans-serif">700g</text>
    ` : kind === 'box' ? `
      <rect x="220" y="180" width="460" height="520" rx="44" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.45)" stroke-width="12"/>
      <text x="450" y="390" font-size="120" text-anchor="middle" font-weight="900" fill="#fff" font-family="Arial, sans-serif">${brand}</text>
      <text x="450" y="525" font-size="58" text-anchor="middle" fill="#fff" font-family="Arial, sans-serif">${name}</text>
      <text x="450" y="610" font-size="42" text-anchor="middle" fill="#fff" font-family="Arial, sans-serif">2kg</text>
    ` : `
      <rect x="220" y="190" width="460" height="460" rx="36" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.45)" stroke-width="12"/>
      <text x="450" y="420" font-size="120" text-anchor="middle" font-weight="900" fill="#fff" font-family="Arial, sans-serif">${brand}</text>
      <text x="450" y="530" font-size="56" text-anchor="middle" fill="#fff" font-family="Arial, sans-serif">${name}</text>
    `}
  </svg>
`)}`;

const PRODUCT_IMAGES = {
  maize: productPackshot({ brand: 'IWISA', name: 'MAIZE MEAL', accent: '#d97706', secondary: '#fef3c7', kind: 'bag' }),
  oil: productPackshot({ brand: 'SUNFOIL', name: 'COOKING OIL', accent: '#ef4444', secondary: '#fca5a5', kind: 'bottle' }),
  cola: productPackshot({ brand: 'Coca-Cola', name: 'ORIGINAL', accent: '#dc2626', secondary: '#f87171', kind: 'can' }),
  bread: productPackshot({ brand: 'SASKO', name: 'BROWN BREAD', accent: '#b45309', secondary: '#f59e0b', kind: 'bread' }),
  detergent: productPackshot({ brand: 'SKIP', name: 'WASHING POWDER', accent: '#2563eb', secondary: '#93c5fd', kind: 'box' }),
  pens: productPackshot({ brand: 'BIC', name: 'PENS', accent: '#059669', secondary: '#86efac', kind: 'box' })
};

const INITIAL_PRODUCTS = [
  { id: 'p1', name: 'Iwisa Super Maize Meal 10kg', vendor: 'Ubuntu Suppliers', rating: 4.8, reviewsCount: 120, price: 119.99, inStock: true, category: 'Groceries', image: PRODUCT_IMAGES.maize },
  { id: 'p2', name: 'Sunfoil Cooking Oil 2L', vendor: 'Kasi Essentials', rating: 4.6, reviewsCount: 85, price: 64.99, inStock: true, category: 'Groceries', image: PRODUCT_IMAGES.oil },
  { id: 'p3', name: 'Coca-Cola Original 500ml (6 Pack)', vendor: "Mamsi's Tuckshop", rating: 4.7, reviewsCount: 210, price: 69.99, inStock: true, category: 'Drinks', image: PRODUCT_IMAGES.cola },
  { id: 'p4', name: 'Sasko Brown Bread 700g', vendor: 'FreshStop Local', rating: 4.5, reviewsCount: 64, price: 16.99, inStock: true, category: 'Groceries', image: PRODUCT_IMAGES.bread },
  { id: 'p5', name: 'Skip Washing Powder 2kg', vendor: 'HomeCare Hub', rating: 4.6, reviewsCount: 92, price: 54.99, inStock: true, category: 'Household', image: PRODUCT_IMAGES.detergent },
  { id: 'p6', name: 'BIC Pens (10 Pack)', vendor: 'EduStation', rating: 4.8, reviewsCount: 173, price: 27.99, inStock: true, category: 'Stationery', image: PRODUCT_IMAGES.pens }
];

const INITIAL_ORDERS = [
  {
    id: 'BLK-100245', date: '21 Sep 2026', time: '14:32',
    status: 'Out for delivery', statusColor: 'bg-blue-100 text-blue-700 border-blue-200',
    itemsCount: 3, total: 184.97,
    items: [
      { name: 'Iwisa Super Maize Meal 10kg', price: 119.99, qty: 1, image: PRODUCT_IMAGES.maize },
      { name: 'Sunfoil Cooking Oil 2L', price: 64.99, qty: 1, image: PRODUCT_IMAGES.oil },
      { name: 'Sasko Brown Bread 700g', price: 16.99, qty: 1, image: PRODUCT_IMAGES.bread }
    ],
    address: '1237 Maphalla Street, Atteridgeville, Pretoria, 0008',
    estimatedDelivery: 'Today, 16:00 – 17:00', recipient: 'Mpho Ramarumo',
    rider: { name: 'Thabo M.', rating: 4.8, deliveries: 320, vehicle: 'On a motorcycle • BKD 452 GP', etaMinutes: 12 }
  },
  {
    id: 'BLK-100198', date: '18 Sep 2026', time: '11:15',
    status: 'Delivered', statusColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    itemsCount: 4, total: 132.50,
    items: [
      { name: 'Coca-Cola Original 500ml (6 Pack)', price: 69.99, qty: 1, image: PRODUCT_IMAGES.cola },
      { name: 'Sasko Brown Bread 700g', price: 16.99, qty: 2, image: PRODUCT_IMAGES.bread },
      { name: 'BIC Pens (10 Pack)', price: 27.99, qty: 1, image: PRODUCT_IMAGES.pens }
    ],
    address: '1237 Maphalla Street, Atteridgeville, Pretoria, 0008',
    deliveredAt: '18 Sep 2026 at 12:04', recipient: 'Mpho Ramarumo'
  },
  {
    id: 'BLK-100176', date: '15 Sep 2026', time: '16:00',
    status: 'Cancelled', statusColor: 'bg-slate-100 text-slate-600 border-slate-200',
    itemsCount: 2, total: 78.00,
    items: [
      { name: 'Skip Washing Powder 2kg', price: 54.99, qty: 1, image: PRODUCT_IMAGES.detergent },
      { name: 'BIC Pens (10 Pack)', price: 27.99, qty: 1, image: PRODUCT_IMAGES.pens }
    ],
    address: '1237 Maphalla Street, Atteridgeville, Pretoria, 0008'
  },
  {
    id: 'BLK-100140', date: '12 Sep 2026', time: '09:45',
    status: 'Delivered', statusColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    itemsCount: 5, total: 210.35,
    items: [
      { name: 'Iwisa Super Maize Meal 10kg', price: 119.99, qty: 1, image: PRODUCT_IMAGES.maize },
      { name: 'Sunfoil Cooking Oil 2L', price: 64.99, qty: 1, image: PRODUCT_IMAGES.oil }
    ],
    address: '1237 Maphalla Street, Atteridgeville, Pretoria, 0008',
    deliveredAt: '12 Sep 2026 at 10:30', recipient: 'Mpho Ramarumo'
  }
];

const CATEGORIES = ['All', 'Groceries', 'Drinks', 'Household', 'Personal Care', 'Stationery', 'More'];
const ORDER_TABS = ['All', 'Processing', 'On the way', 'Delivered'];

/* ---------------- Business-side mock data ---------------- */
const TOWNSHIP_BUSINESSES = [
  { id: 'tb1', name: 'Ubuntu Suppliers', area: 'Atteridgeville, Pretoria', tag: 'Groceries & staple foods', rating: 4.8, orders: 320 },
  { id: 'tb2', name: "Mamsi's Tuckshop", area: 'Mamelodi East, Pretoria', tag: 'Drinks, snacks & daily goods', rating: 4.7, orders: 515 },
  { id: 'tb3', name: 'Kasi Essentials', area: 'Soshanguve, Pretoria', tag: 'Home, pantry & essentials', rating: 4.6, orders: 268 }
];

const SUPPLIER_SEARCH_POOL = [
  { id: 'sp1', name: 'Ubuntu Suppliers', area: 'Atteridgeville', rating: 4.8, deliveries: 1200, products: [INITIAL_PRODUCTS[0]] },
  { id: 'sp2', name: 'Kasi Essentials', area: 'Soshanguve', rating: 4.6, deliveries: 890, products: [INITIAL_PRODUCTS[1]] },
  { id: 'sp3', name: "Mamsi's Tuckshop", area: 'Mamelodi', rating: 4.7, deliveries: 2100, products: [INITIAL_PRODUCTS[2]] },
  { id: 'sp4', name: 'FreshStop Local', area: 'Atteridgeville', rating: 4.5, deliveries: 560, products: [INITIAL_PRODUCTS[3]] },
  { id: 'sp5', name: 'HomeCare Hub', area: 'Hammanskraal', rating: 4.6, deliveries: 430, products: [INITIAL_PRODUCTS[4]] },
  { id: 'sp6', name: 'EduStation', area: 'Centurion', rating: 4.8, deliveries: 310, products: [INITIAL_PRODUCTS[5]] }
];

const ANALYTICS = {
  revenue: 12480,
  revenueDelta: 12.4,
  ordersMonth: 47,
  avgDelivery: 24,
  rating: 4.8,
  weekly: [1420, 1890, 1680, 2210, 1940, 2450, 890]
};
const WEEK_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

/* ---------------- App State ---------------- */
const state = {
  currentScreen: 'landing',
  selectedOrder: INITIAL_ORDERS[0],
  cartItems: [
    { ...INITIAL_PRODUCTS[0], quantity: 1 },
    { ...INITIAL_PRODUCTS[1], quantity: 1 },
    { ...INITIAL_PRODUCTS[3], quantity: 1 }
  ],
  isCartOpen: false,
  activeCategory: 'All',
  orderTabFilter: 'All',
  searchQuery: '',
  toastMessage: null,
  toastTimer: null,
  currentBusiness: TOWNSHIP_BUSINESSES[0],
  supplierQuery: '',
  routePoolOpen: false,
  poolOrder: null,
  selectedPoolDay: null,
  role: 'consumer',
  activeScenario: 's1',
  scenarioIndex: 0,
  accountType: 'business'
};

const SCENARIO_FLOW = {
  s1: [
    { id: 'S1-01', title: 'Landing Page', action: 'Click “Sign Up”', response: 'User enters BizLink and chooses a township business account.', next: 'S1-02', cta: 'Sign Up' },
    { id: 'S1-02', title: 'Sign Up', action: 'Select “Township Business”', response: 'Account type is set to township business and the user continues to the dashboard.', next: 'S1-03', cta: 'Continue' },
    { id: 'S1-03', title: 'Business Dashboard', action: 'Click “Business Profile”', response: 'The dashboard opens the business profile overview and status cards.', next: 'S1-04', cta: 'Open Profile' },
    { id: 'S1-04', title: 'Business Profile', action: 'Click “Dashboard”', response: 'The profile confirms the business identity and verification for Thabo’s Catering.', next: 'S1-03', cta: 'Back to Dashboard' },
    { id: 'S1-05', title: 'Supplier Search', action: 'Search “Cooking Oil”', response: 'BizLink surfaces nearby suppliers and wholesalers for the requested product.', next: 'S1-06', cta: 'Search' },
    { id: 'S1-06', title: 'Search Results', action: 'Click “View Product”', response: 'The business sees ABC Wholesale and compares stock, price and distance.', next: 'S1-07', cta: 'View Product' },
    { id: 'S1-07', title: 'Product & Supplier Page', action: 'Select quantity and click “Place Order”', response: 'The order is created and the delivery planner opens.', next: 'S1-08', cta: 'Place Order' },
    { id: 'S1-08', title: 'Route Planning Popup', action: 'Select preferred delivery date', response: 'BizLink highlights compatible pooled routes for nearby businesses.', next: 'S1-09', cta: 'Choose 3 July' },
    { id: 'S1-09', title: 'Pool Options', action: 'Click “Join Shared Route”', response: 'The system estimates a lower delivery fee and confirms compatible route pooling.', next: 'S1-10', cta: 'Join Shared Route' },
    { id: 'S1-10', title: 'Shared Route Confirmed', action: 'Tap “Track Order”', response: 'The order is assigned to a pooled route and the delivery fee drops to R55.', next: 'S1-11', cta: 'Track Order' },
    { id: 'S1-11', title: 'System Response', action: 'Order moves to fulfilment', response: 'Supplier → Business → Shared route → Delivery status all exist in one connected flow.', next: 'demo-landing', cta: 'Finish Scenario' }
  ],
  s2: [
    { id: 'S2-01', title: 'Business Order Dashboard', action: 'Consumer order received', response: 'The business sees a new order for a catering meal box and opens the details page.', next: 'S2-02', cta: 'View Order' },
    { id: 'S2-02', title: 'Order Details', action: 'Click “Accept Order”', response: 'The business confirms payment and prepares the consumer request.', next: 'S2-03', cta: 'Accept Order' },
    { id: 'S2-03', title: 'Prepare Order', action: 'Mark ready for pickup', response: 'The order status moves from received to packed and ready for collection.', next: 'S2-04', cta: 'Mark Ready' },
    { id: 'S2-04', title: 'Assign Driver', action: 'Select verified driver', response: 'Sipho M. is assigned and the ETA is calculated.', next: 'S2-05', cta: 'Assign Driver' },
    { id: 'S2-05', title: 'Driver Assigned', action: 'Tap “Track Driver”', response: 'The driver is confirmed, verified and on the way to collect the order.', next: 'S2-06', cta: 'Track Driver' },
    { id: 'S2-06', title: 'Pickup Verification', action: 'Enter pickup OTP', response: 'OTP confirms the correct package was handed to the right driver.', next: 'S2-07', cta: 'Confirm Pickup' },
    { id: 'S2-07', title: 'Live Tracking', action: 'Follow route on map', response: 'GPS-style status updates show transit direction and ETA to the consumer.', next: 'S2-08', cta: 'View Map' },
    { id: 'S2-08', title: 'Delivery Completed', action: 'Driver enters customer OTP', response: 'The delivery is verified and completion is logged with proof of delivery.', next: 'S2-09', cta: 'Confirm Delivery' },
    { id: 'S2-09', title: 'Business Notification', action: 'Business receives delivery alert', response: 'The business sees customer feedback and order completion confirmation.', next: 'S2-10', cta: 'Review Feedback' },
    { id: 'S2-10', title: 'Consumer Rating & Review', action: 'Submit rating', response: 'Trust is strengthened with a positive review and service score.', next: 'demo-landing', cta: 'Finish Scenario' }
  ],
  s3: [
    { id: 'S3-01', title: 'Consumer Sign Up', action: 'Select “Consumer”', response: 'The consumer creates an account and enters the marketplace.', next: 'S3-02', cta: 'Continue' },
    { id: 'S3-02', title: 'Consumer Dashboard', action: 'Search “Chicken Meal”', response: 'The dashboard opens product discovery and category browsing.', next: 'S3-03', cta: 'Search' },
    { id: 'S3-03', title: 'Consumer Profile', action: 'Review saved addresses and history', response: 'The profile confirms payment and delivery information is ready.', next: 'S3-04', cta: 'Open Profile' },
    { id: 'S3-04', title: 'Product Search', action: 'Browse results', response: 'The system shows relevant food options and promoted merchants first.', next: 'S3-05', cta: 'View Results' },
    { id: 'S3-05', title: 'Promoted Listing', action: 'Tap “View Product”', response: 'Mama’s Kitchen appears in a sponsored placement because of promotion.', next: 'S3-06', cta: 'View Product' },
    { id: 'S3-06', title: 'Product & Business Page', action: 'Click “Add to Order”', response: 'The consumer chooses one meal and moves into checkout.', next: 'S3-07', cta: 'Add to Order' },
    { id: 'S3-07', title: 'Checkout', action: 'Place order', response: 'The total is shown with delivery address and charges in a clear summary.', next: 'S3-08', cta: 'Place Order' },
    { id: 'S3-08', title: 'Order Confirmation + OTP', action: 'Open tracking', response: 'The consumer receives a delivery OTP and confirmation reference.', next: 'S3-09', cta: 'Track Order' },
    { id: 'S3-09', title: 'Driver Assigned', action: 'View driver details', response: 'A verified driver is assigned and the route is prepated for pickup.', next: 'S3-10', cta: 'Track Driver' },
    { id: 'S3-10', title: 'Live Tracking', action: 'Watch live delivery progress', response: 'The route updates from kitchen to customer in real time.', next: 'S3-11', cta: 'Follow Delivery' },
    { id: 'S3-11', title: 'Delivery Complete', action: 'Enter delivery OTP', response: 'Proof of delivery is captured and item arrival is validated.', next: 'S3-12', cta: 'Confirm Delivery' },
    { id: 'S3-12', title: 'Rating & Review', action: 'Submit review', response: 'The consumer leaves feedback and closes the trust loop for the transaction.', next: 'demo-landing', cta: 'Finish Scenario' }
  ]
};

/* ---------------- Helpers ---------------- */
const money = n => 'R' + Number(n).toFixed(2);

const countInCart = () => state.cartItems.reduce((s, i) => s + i.quantity, 0);
const cartSubtotal = () => state.cartItems.reduce((s, i) => s + i.price * i.quantity, 0);

function showToast(msg) {
  state.toastMessage = msg;
  if (state.toastTimer) clearTimeout(state.toastTimer);
  state.toastTimer = setTimeout(() => {
    state.toastMessage = null;
    render();
  }, 3000);
  render();
}

/* ---------------- Inline SVG Icons ---------------- */
const svg = (viewBox = '0 0 24 24') =>
  pathData => () => `<svg class="w-5 h-5" viewBox="${viewBox}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${pathData}"/></svg>`;

const ICONS = {
  Back: () => `<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>`,
  Search: svg()('M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'),
  Bell: svg()('M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'),
  Cart: svg()('M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'),
  Home: svg()('M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'),
  Browse: svg()('M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'),
  Orders: svg()('M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'),
  User: svg()('M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'),
  Eye: svg()('M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'),
  EyeOff: svg()('M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a10.012 10.012 0 013.982-.863c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21M3 3l18 18'),
  Lock: svg()('M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'),
  Mail: svg()('M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'),
  Phone: svg()('M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'),
  Star: () => `<svg class="w-3.5 h-3.5" viewBox="0 0 20 20" fill="#fbbf24"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`,
  Truck: svg()('M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0m6 0H9m11 0v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0017 9.586V16'),
  MapPin: svg()('M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z'),
  Check: () => `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13l4 4L19 7"/></svg>`,
  Copy: () => `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>`,
  Plus: () => `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v16m8-8H4"/></svg>`,
  Minus: () => `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 12H4"/></svg>`,
  Settings: svg()('M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z'),
  Filter: () => `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>`,
  Sort: () => `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"/></svg>`,
  Message: svg()('M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'),
  ChevronRight: svg()('M9 5l7 7-7 7')
};

/* ---------------- Shared Pieces ---------------- */
function bizLinkLogo(subtitle) {
  return `<div>
    <div class="flex items-center space-x-0.5 font-black text-2xl tracking-tight">
      <span class="text-amber-500">Biz</span><span class="text-[#002B66]">Link</span>
    </div>
    ${subtitle ? `<div class="text-[10px] tracking-widest font-bold uppercase text-slate-500 mt-0.5">${subtitle}</div>` : ''}
  </div>`;
}

function bottomNav() {
  const cur = state.currentScreen;
  const isOrderArea = ['orders', 'order-detail', 'order-track', 'order-delivered'].includes(cur);
  const items = [
    { label: 'Home', icon: ICONS.Home(), active: cur === 'landing', screen: 'landing' },
    { label: 'Browse', icon: ICONS.Browse(), active: cur === 'browse', screen: 'browse' },
    { label: 'Orders', icon: ICONS.Orders(), active: isOrderArea, screen: 'orders' },
    { label: 'Cart', icon: ICONS.Cart(), cart: true },
    { label: 'Profile', icon: ICONS.User(), active: cur === 'profile', screen: 'profile' }
  ];

  return `<nav class="bottom-nav">
    ${items.map(it => {
      if (it.cart) {
        const n = countInCart();
        return `<button class="nav-item" data-action="toggle-cart" aria-label="Cart">
          <div class="relative">
            ${it.icon}
            ${n > 0 ? `<span class="absolute -top-2 -right-2 bg-amber-500 text-slate-900 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white">${n}</span>` : ''}
          </div>
          <span class="nav-label">Cart</span>
        </button>`;
      }
      return `<button class="nav-item ${it.active ? 'active' : ''}" data-action="go" data-screen="${it.screen}">
        ${it.icon}
        <span class="nav-label">${it.label}${it.active ? '<span class="nav-dot"></span>' : ''}</span>
      </button>`;
    }).join('')}
  </nav>`;
}

function toastHtml() {
  return state.toastMessage ? `<div class="toast">${state.toastMessage}</div>` : '';
}

function menuRow(emoji, title, sub, action, msg) {
  const inner = `<div class="flex items-center space-x-3">
      <div class="p-2 bg-slate-100 rounded-xl text-slate-700"><span class="text-sm">${emoji}</span></div>
      <div><div class="font-bold text-xs text-slate-900">${title}</div>
      <div class="text-[10px] text-slate-400">${sub}</div></div>
    </div>${ICONS.ChevronRight()}`;
  return action === 'go'
    ? `<button class="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition" data-action="go" data-screen="${msg}">${inner}</button>`
    : `<button class="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition" data-action="toast" data-msg="${msg}">${inner}</button>`;
}

function orderRow(ord) {
  return `<button class="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:border-slate-300 transition cursor-pointer space-y-3 w-full text-left" data-action="open-order" data-id="${ord.id}">
      <div class="flex justify-between items-center">
        <div><span class="font-black text-sm text-slate-900">#${ord.id}</span>
          <div class="text-[10px] text-slate-400">${ord.date}</div></div>
        <span class="text-[10px] font-bold px-2.5 py-1 rounded-full border ${ord.statusColor}">${ord.status}</span>
      </div>
      <div class="flex items-center justify-between pt-1">
        <div class="flex space-x-2 overflow-x-auto">
          ${ord.items.slice(0, 3).map((it, i) =>
            `<div class="w-10 h-10 bg-slate-100 rounded-lg overflow-hidden border border-slate-200 flex-shrink-0"><img src="${it.image}" alt="${it.name}" class="w-full h-full object-cover"/></div>`
          ).join('')}
        </div>
        <div class="flex items-center space-x-1 text-xs font-bold text-slate-900 flex-shrink-0">
          <span>${ord.itemsCount} items • ${money(ord.total)}</span>${ICONS.ChevronRight()}
        </div>
      </div>
    </button>`;
}

function itemRows(order) {
  return order.items.map((it, i) => `
    <div class="pt-2 first:pt-0 flex items-center space-x-3">
      <img src="${it.image}" alt="${it.name}" class="w-12 h-12 rounded-xl object-cover border border-slate-100 flex-shrink-0"/>
      <div class="flex-1">
        <div class="font-bold text-xs text-slate-900">${it.name}</div>
        <div class="font-black text-xs text-slate-900 mt-0.5">${money(it.price)}</div>
        <div class="text-[10px] text-slate-500">Qty: ${it.qty}</div>
      </div>
    </div>`).join('');
}

/* ---------------- Screens ---------------- */
function screenSignIn() {
  return `<div class="screen-root bg-white relative pb-8">
    <div class="absolute -top-12 -right-12 w-48 h-48 bg-[#002B66] rounded-full z-0"></div>
    <div class="absolute top-12 -right-6 w-28 h-28 bg-amber-400 rounded-full z-0"></div>

    <div class="relative z-10 px-6 pt-12">
      <button class="p-2 -ml-2 text-slate-700 hover:bg-slate-100 rounded-full w-fit mb-6" data-action="go" data-screen="landing">${ICONS.Back()}</button>
      <div class="mb-8">${bizLinkLogo('CONNECT · GROW · MOVE TOGETHER')}</div>

      <div class="mt-8 mb-6">
        <h1 class="text-2xl font-black text-slate-900">Welcome back</h1>
        <p class="text-slate-500 text-sm mt-1">Sign in to your BizLink account</p>
      </div>

      <form id="signin-form" class="space-y-4">
        <div>
          <label class="block text-xs font-bold text-slate-800 mb-1.5">Email address</label>
          <div class="relative">
            <span class="absolute left-3.5 top-3.5 text-slate-400">${ICONS.Mail()}</span>
            <input type="email" value="you@example.com" required class="w-full py-3 pl-11 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
          </div>
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-800 mb-1.5">Password</label>
          <div class="relative">
            <span class="absolute left-3.5 top-3.5 text-slate-400">${ICONS.Lock()}</span>
            <input id="signin-password" type="password" value="password123" required class="w-full py-3 pl-11 pr-11 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
            <button type="button" class="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600" data-action="toggle-password" data-target="signin-password">${ICONS.Eye()}</button>
          </div>
        </div>
        <div class="text-right">
          <button type="button" class="text-xs font-semibold text-blue-600 hover:underline" data-action="toast" data-msg="Password reset link sent to your email!">Forgot password?</button>
        </div>
        <button type="submit" class="w-full bg-[#002B66] text-white font-bold py-3.5 px-4 rounded-xl shadow-md hover:bg-[#001d47] transition flex items-center justify-center space-x-2 mt-4">
          <span>Sign In</span><span class="text-lg">→</span>
        </button>
      </form>

      <div class="mt-6 flex items-center space-x-3">
        <span class="flex-1 h-px bg-slate-200"></span>
        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">or</span>
        <span class="flex-1 h-px bg-slate-200"></span>
      </div>

      <button class="w-full mt-6 border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold py-3.5 px-4 rounded-xl transition flex items-center justify-center space-x-2"
        data-action="business-login">
        <span>🏪</span><span>Sign in as a business</span>
      </button>

      <div class="mt-8 text-center">
        <p class="text-xs text-slate-500">Don't have an account?
          <button class="font-bold text-blue-600 hover:underline ml-1" data-action="go" data-screen="signup">Sign up</button>
        </p>
      </div>
    </div>

    <div class="relative h-28 w-full mt-auto pointer-events-none">
      <div class="absolute bottom-0 left-0 -ml-12 w-44 h-44 bg-amber-400 rounded-full opacity-90"></div>
      <div class="absolute -bottom-16 right-0 -mr-12 w-64 h-32 bg-blue-100/60 rounded-t-full"></div>
    </div>
  </div>`;
}

function screenSignUp() {
  return `<div class="screen-root bg-white relative pb-8">
    <div class="absolute top-0 right-0 w-36 h-36 bg-blue-100/50 rounded-full -mr-10 -mt-10 pointer-events-none"></div>
    <div class="absolute top-8 right-4 w-20 h-20 bg-amber-400 rounded-full pointer-events-none"></div>

    <div class="relative z-10 px-6 pt-12">
      <button class="p-2 -ml-2 text-slate-700 hover:bg-slate-100 rounded-full w-fit mb-4" data-action="go" data-screen="signin">${ICONS.Back()}</button>
      ${bizLinkLogo('LOCAL BUSINESS. CONNECTED.')}

      <div class="mt-6 mb-6">
        <h1 class="text-2xl font-black text-slate-900">Create your account</h1>
        <p class="text-slate-500 text-xs leading-relaxed mt-1">Join BizLink and be part of a stronger local business community.</p>
      </div>

      <form id="signup-form" class="space-y-3.5">
        <div>
          <label class="block text-xs font-bold text-slate-800 mb-1">Full name</label>
          <div class="relative">
            <span class="absolute left-3.5 top-2.5 text-slate-400">${ICONS.User()}</span>
            <input type="text" placeholder="Enter your full name" required class="w-full py-2.5 pl-11 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-xs" />
          </div>
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-800 mb-1">Email address</label>
          <div class="relative">
            <span class="absolute left-3.5 top-2.5 text-slate-400">${ICONS.Mail()}</span>
            <input type="email" placeholder="you@example.com" required class="w-full py-2.5 pl-11 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-xs" />
          </div>
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-800 mb-1">Phone number</label>
          <div class="relative">
            <span class="absolute left-3.5 top-2.5 text-slate-400">${ICONS.Phone()}</span>
            <input type="tel" placeholder="e.g. 071 234 5678" required class="w-full py-2.5 pl-11 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-xs" />
          </div>
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-800 mb-1">Password</label>
          <div class="relative">
            <span class="absolute left-3.5 top-2.5 text-slate-400">${ICONS.Lock()}</span>
            <input id="signup-password" type="password" placeholder="Create a password" required class="w-full py-2.5 pl-11 pr-11 bg-slate-50 border border-slate-200 rounded-xl text-xs" />
            <button type="button" class="absolute right-3.5 top-2.5 text-slate-400" data-action="toggle-password" data-target="signup-password">${ICONS.Eye()}</button>
          </div>
          <div class="mt-2 space-y-1 pl-1">
            <div class="flex items-center space-x-2 text-[11px] text-slate-500"><span class="w-2.5 h-2.5 rounded-full border border-slate-300"></span><span>At least 8 characters</span></div>
            <div class="flex items-center space-x-2 text-[11px] text-slate-500"><span class="w-2.5 h-2.5 rounded-full border border-slate-300"></span><span>Include a letter and a number</span></div>
            <div class="flex items-center space-x-2 text-[11px] text-slate-500"><span class="w-2.5 h-2.5 rounded-full border border-slate-300"></span><span>Include a special character (e.g. ! @ #)</span></div>
          </div>
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-800 mb-2">Account type</label>
          <div class="grid grid-cols-3 gap-2">
            ${accountTypeCard('business', 'Home', 'Business', 'Sell products or services')}
            ${accountTypeCard('customer', 'User', 'Customer', 'Buy from local businesses')}
            ${accountTypeCard('delivery', 'Truck', 'Delivery Partner', 'Deliver products in your area')}
          </div>
        </div>

        <div class="flex items-center space-x-2 pt-1">
          <input type="checkbox" id="terms" required class="rounded focus:ring-blue-500" />
          <label for="terms" class="text-[11px] text-slate-600">
            I agree to the <span class="text-blue-600 underline font-medium">Terms of Service</span> and <span class="text-blue-600 underline font-medium">Privacy Policy</span>
          </label>
        </div>

        <button type="submit" class="w-full bg-[#002B66] text-white font-bold py-3.5 px-4 rounded-xl shadow-md hover:bg-[#001d47] transition flex items-center justify-center space-x-2 mt-4">
          <span>Create Account</span><span class="text-lg">→</span>
        </button>
      </form>

      <div class="mt-6 text-center">
        <p class="text-xs text-slate-500">Already have an account?
          <button class="font-bold text-blue-600 hover:underline ml-1" data-action="go" data-screen="signin">Sign in</button>
        </p>
      </div>
    </div>

    <div class="relative h-20 w-full mt-auto pointer-events-none overflow-hidden">
      <div class="absolute -bottom-10 -left-10 w-44 h-44 bg-[#002B66] rounded-full z-0"></div>
      <div class="absolute -bottom-16 left-20 w-36 h-36 bg-amber-400 rounded-full z-0"></div>
    </div>
  </div>`;
}

function accountTypeCard(type, icon, title, sub) {
  const active = state.accountType === type;
  const iconSvg = ICONS[icon]();
  const cardCls = active
    ? 'border-blue-600 bg-blue-50/50 text-[#002B66]'
    : 'border-slate-200 bg-white text-slate-600';
  return `<button type="button" data-action="set-account-type" data-value="${type}" class="p-3 rounded-xl border text-left relative flex flex-col justify-between transition ${cardCls}">
    <div class="flex justify-between items-start mb-2">
      <div class="p-1.5 rounded-lg ${type === 'business' ? 'bg-blue-100 text-[#002B66]' : 'bg-slate-100 text-slate-700'}">${iconSvg}</div>
      ${active ? '<span class="w-4 h-4 bg-blue-600 text-white rounded-full flex items-center justify-center text-[10px]">✓</span>' : '<span class="w-4 h-4 rounded-full border border-slate-300"></span>'}
    </div>
    <div>
      <div class="font-bold text-xs">${title}</div>
      <div class="text-[9px] text-slate-500 leading-tight mt-0.5">${sub}</div>
    </div>
  </button>`;
}

function screenLanding() {
  return `<div class="screen-root bg-white">
    <div class="px-6 py-4 flex justify-between items-center bg-white sticky top-0 z-20 border-b border-slate-100">
      ${bizLinkLogo('')}
      <button class="p-2 text-slate-800" data-action="toast" data-msg="Menu coming soon!">
        <div class="space-y-1.5 w-6">
          <span class="block h-0.5 bg-slate-900 rounded-full"></span>
          <span class="block h-0.5 bg-slate-900 rounded-full"></span>
          <span class="block h-0.5 bg-slate-900 rounded-full"></span>
        </div>
      </button>
    </div>

    <div class="p-6 space-y-8">
      <div class="space-y-4">
        <div class="text-[10px] font-bold tracking-widest text-slate-500 uppercase">LOCAL BUSINESS. BETTER CONNECTED.</div>
        <h1 class="text-3xl font-black text-slate-900 leading-tight">Your business,<br /><span class="text-[#002B66]">connected</span><span class="text-amber-500">.</span></h1>
        <p class="text-slate-600 text-xs leading-relaxed">Find suppliers, reach customers and move products through one business network.</p>
        <div class="flex flex-col space-y-2.5 pt-2">
          <button class="bg-[#002B66] text-white font-bold py-3 px-6 rounded-xl text-xs flex items-center justify-center space-x-2 shadow-md hover:bg-[#001d47]" data-action="go" data-screen="browse">
            <span>Get Started</span><span>→</span>
          </button>
          <button class="border border-[#002B66] text-[#002B66] font-bold py-2.5 px-6 rounded-xl text-xs flex items-center justify-center hover:bg-blue-50" data-action="go" data-screen="signin">
            <span>Log In</span>
          </button>
        </div>
      </div>

      <div class="relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
        <div class="w-full h-48 overflow-hidden">
          <img src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80" alt="Township market and delivery" class="w-full h-full object-cover" />
        </div>
        <div class="absolute inset-0 bg-gradient-to-r from-[#0b2d5e]/70 to-[#0b2d5e]/10"></div>
        <div class="absolute top-3 left-3 bg-white/90 backdrop-blur-sm p-2 rounded-xl text-[10px] font-bold text-slate-800 shadow-sm border border-slate-100 max-w-[120px]">Stronger Businesses Brighter Communities</div>
        <div class="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl text-[10px] font-bold text-[#002B66] shadow-sm flex items-center space-x-1">
          <svg viewBox="0 0 24 24" class="w-3.5 h-3.5 text-amber-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M4 18h16v2H4zm2-3h2v3H6zm5-5h2v8h-2zm5-4h2v12h-2zM6 8h12V6H6z"/></svg>
          <span>Local Growth</span>
        </div>
      </div>

      <div>
        <div class="text-[10px] font-bold tracking-widest text-slate-500 uppercase">ONE NETWORK.</div>
        <h2 class="text-xl font-black text-slate-900 mb-4">Three connections<span class="text-amber-500">.</span></h2>
        <div class="grid grid-cols-3 gap-2">
          <div class="bg-blue-50/60 p-3 rounded-2xl border border-blue-100 flex flex-col items-center text-center">
            <div class="w-10 h-10 rounded-full bg-blue-100 text-[#002B66] flex items-center justify-center mb-2">${ICONS.Home()}</div>
            <div class="font-bold text-xs text-slate-900">Suppliers</div>
            <p class="text-[9px] text-slate-500 mt-1 leading-tight">Source products from local suppliers.</p>
          </div>
          <div class="bg-amber-50/60 p-3 rounded-2xl border border-amber-100 flex flex-col items-center text-center">
            <div class="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mb-2">${ICONS.User()}</div>
            <div class="font-bold text-xs text-slate-900">Customers</div>
            <p class="text-[9px] text-slate-500 mt-1 leading-tight">Reach more customers in your community.</p>
          </div>
          <div class="bg-sky-50/60 p-3 rounded-2xl border border-sky-100 flex flex-col items-center text-center">
            <div class="w-10 h-10 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center mb-2">${ICONS.Truck()}</div>
            <div class="font-bold text-xs text-slate-900">Delivery</div>
            <p class="text-[9px] text-slate-500 mt-1 leading-tight">Move products faster and easier.</p>
          </div>
        </div>
      </div>

      <div class="space-y-3">
        <h2 class="text-lg font-black text-slate-900">Built for township businesses</h2>
        <p class="text-xs text-slate-500">A simple way to buy, sell and deliver locally.</p>
        <div class="grid grid-cols-3 gap-2 pt-2">
          ${['Support local growth', 'Trusted businesses', 'More opportunities'].map((t, i) => `
            <div class="text-center">
              <div class="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center mx-auto mb-1">${i === 0 ? ICONS.User() : i === 1 ? '🛡️' : '📈'}</div>
              <div class="text-[10px] font-bold text-slate-800">${t}</div>
            </div>`).join('')}
        </div>
      </div>

      <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-start space-x-3">
        <svg viewBox="0 0 48 48" class="w-10 h-10 flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="avatarBg" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stop-color="#fef3c7"/>
              <stop offset="100%" stop-color="#fbbf24"/>
            </linearGradient>
          </defs>
          <rect x="2" y="2" width="44" height="44" rx="22" fill="url(#avatarBg)"/>
          <circle cx="24" cy="18" r="8" fill="#fff7d6"/>
          <path d="M12 37c2-6 7-9 12-9s10 3 12 9" fill="#fff7d6"/>
        </svg>
        <div class="flex-1">
          <p class="text-xs text-slate-700 italic">"BizLink helped me reach more customers in my area. It's simple and really useful!"</p>
          <p class="text-[10px] font-bold text-slate-500 mt-1">– Local Business Owner</p>
        </div>
      </div>

      <div class="bg-[#002B66] text-white p-6 rounded-2xl text-center space-y-3 relative overflow-hidden">
        <div class="absolute top-0 right-0 w-24 h-24 bg-amber-400 rounded-full -mr-8 -mt-8 opacity-90"></div>
        <h3 class="text-base font-bold relative z-10">Ready to grow your business?</h3>
        <button class="bg-white text-[#002B66] font-bold py-2.5 px-6 rounded-xl text-xs hover:bg-amber-400 transition relative z-10" data-action="go" data-screen="signup">Get Started →</button>
      </div>
    </div>

    <div class="bg-[#002B66] text-white px-6 py-6 border-t border-blue-900 mt-auto flex-shrink-0">
      <div class="flex justify-between items-center mb-4">
        <div class="font-black text-xl text-amber-400">BizLink</div>
        <div class="flex space-x-4 text-xs text-blue-200"><span>About</span><span>Contact</span><span>Help</span></div>
      </div>
    </div>

    ${bottomNav()}
  </div>`;
}

function productGridHtml() {
  const q = state.searchQuery.toLowerCase().trim();
  const list = INITIAL_PRODUCTS.filter(p => {
    const okCat = state.activeCategory === 'All' || p.category === state.activeCategory;
    const okQ = !q || p.name.toLowerCase().includes(q) || p.vendor.toLowerCase().includes(q);
    return okCat && okQ;
  });
  if (list.length === 0) {
    return `<div class="py-10 text-center text-slate-400 text-xs">No products found. Try a different search or category.</div>`;
  }
  return list.map(p => `
    <div class="bg-white rounded-2xl p-3 border border-slate-100 shadow-sm flex flex-col justify-between">
      <div>
        <div class="relative mb-2 bg-slate-50 rounded-xl overflow-hidden h-28 flex items-center justify-center">
          <img src="${p.image}" alt="${p.name}" class="h-full w-full object-cover" loading="lazy" />
          <button class="absolute top-2 right-2 text-slate-400 hover:text-red-500 bg-white/80 rounded-full p-1 shadow-sm" data-action="toggle-save" data-id="${p.id}" aria-label="Save">♡</button>
        </div>
        <h3 class="font-bold text-xs text-slate-900 leading-snug line-clamp-2">${p.name}</h3>
        <p class="text-[10px] text-slate-500 mt-0.5">${p.vendor}</p>
        <div class="flex items-center space-x-1 mt-1 text-[10px] text-slate-600">
          ${ICONS.Star()}<span class="font-bold">${p.rating}</span><span class="text-slate-400">(${p.reviewsCount})</span>
        </div>
      </div>
      <div class="mt-3 pt-2 border-t border-slate-50 flex items-center justify-between">
        <div>
          <div class="font-black text-xs text-slate-900">${money(p.price)}</div>
          <div class="text-[9px] text-emerald-600 font-medium">In stock</div>
        </div>
        <button class="bg-[#002B66] text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-[#001d47] flex items-center space-x-1 shadow-sm active:scale-95 transition" data-action="add-to-cart" data-id="${p.id}">
          ${ICONS.Cart()}<span>Add</span>
        </button>
      </div>
    </div>`).join('');
}

function screenBrowse() {
  const n = countInCart();
  return `<div class="screen-root bg-slate-50">
    <div class="bg-white px-4 py-3 sticky top-0 z-20 border-b border-slate-100 space-y-3">
      <div class="flex justify-between items-center">
        ${bizLinkLogo('LOCAL BUSINESS. CONNECTED.')}
        <div class="flex items-center space-x-3">
          <button class="p-2 text-slate-700 hover:bg-slate-100 rounded-full relative" data-action="toast" data-msg="You're all caught up!">
            ${ICONS.Bell()}<span class="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full"></span>
          </button>
          <button class="p-2 text-slate-700 hover:bg-slate-100 rounded-full relative" data-action="toggle-cart">
            ${ICONS.Cart()}
            ${n > 0 ? `<span class="absolute -top-1 -right-1 bg-amber-500 text-slate-900 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">${n}</span>` : ''}
          </button>
        </div>
      </div>

      <div class="relative">
        <span class="absolute left-3.5 top-2.5 text-slate-400">${ICONS.Search()}</span>
        <input id="search-input" type="text" placeholder="Search products or suppliers..." value="${state.searchQuery}" class="w-full bg-slate-100 border border-transparent rounded-xl py-2 pl-10 pr-10 text-xs focus:bg-white focus:border-slate-300" />
        <button class="absolute right-3 top-2.5 text-slate-400" data-action="toast" data-msg="Showing search results">🔍</button>
      </div>

      <div class="flex space-x-2 overflow-x-auto no-scrollbar py-1 text-xs">
        ${CATEGORIES.map(cat => `
          <button class="px-3 py-1.5 rounded-full whitespace-nowrap transition text-xs font-semibold flex items-center space-x-1 ${state.activeCategory === cat ? 'bg-[#002B66] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}" data-action="set-category" data-value="${cat}">
            <span>${cat}</span>
          </button>`).join('')}
      </div>
    </div>

    <div class="p-4 space-y-4">
      <div class="bg-amber-100/90 rounded-2xl p-4 relative overflow-hidden border border-amber-200 flex justify-between items-center">
        <div class="max-w-[60%] space-y-1">
          <h3 class="font-black text-slate-900 text-base leading-tight">Shop local.<br /><span class="text-[#002B66]">Grow local.</span></h3>
          <p class="text-[10px] text-slate-700">Quality products. Stronger communities.</p>
        </div>
        <div class="w-20 h-20 bg-blue-900 rounded-xl overflow-hidden shadow-sm flex items-center justify-center p-1">
          <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&auto=format&fit=crop&q=80" alt="Grocery Basket" class="w-full h-full object-cover rounded-lg" />
        </div>
      </div>

      <div class="flex justify-between items-center">
        <h2 class="font-black text-slate-900 text-base">Browse products</h2>
        <div class="flex items-center space-x-3 text-xs text-slate-600">
          <button class="flex items-center space-x-1 hover:text-slate-900" data-action="toast" data-msg="Filters coming soon!">
            ${ICONS.Filter()}<span>Filter</span>
          </button>
          <span>|</span>
          <button class="flex items-center space-x-1 hover:text-slate-900" data-action="toast" data-msg="Sorted by relevance">
            ${ICONS.Sort()}<span>Sort</span>
          </button>
        </div>
      </div>

      <div id="product-grid" class="grid grid-cols-2 gap-3">${productGridHtml()}</div>
    </div>

    ${bottomNav()}
  </div>`;
}

function screenOrders() {
  const filtered = INITIAL_ORDERS.filter(ord => {
    if (state.orderTabFilter === 'All') return true;
    if (state.orderTabFilter === 'Processing') return ord.status === 'Processing';
    if (state.orderTabFilter === 'On the way') return ord.status === 'Out for delivery';
    if (state.orderTabFilter === 'Delivered') return ord.status === 'Delivered';
    return true;
  });

  return `<div class="screen-root bg-slate-50">
    <div class="bg-white px-4 py-3 sticky top-0 z-20 border-b border-slate-100 space-y-2">
      <div class="flex justify-between items-center">
        ${bizLinkLogo('')}
        <button class="p-2 text-slate-700 hover:bg-slate-100 rounded-full" data-action="toast" data-msg="Search orders coming soon!">${ICONS.Search()}</button>
      </div>
      <div>
        <h1 class="text-xl font-black text-slate-900">My Orders</h1>
        <p class="text-xs text-slate-500">Track and manage your orders.</p>
      </div>
      <div class="flex space-x-2 pt-1 overflow-x-auto no-scrollbar">
        ${ORDER_TABS.map(tab => `
          <button class="px-4 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap ${state.orderTabFilter === tab ? 'bg-[#002B66] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}" data-action="set-order-filter" data-value="${tab}">${tab}</button>`).join('')}
      </div>
    </div>

    <div class="p-4 space-y-3">
      ${filtered.length === 0
        ? '<div class="py-10 text-center text-slate-400 text-xs">No orders in this category yet.</div>'
        : filtered.map(orderRow).join('')}
    </div>

    ${navForRole()}
  </div>`;
}

function screenOrderDetail() {
  const o = state.selectedOrder;
  return `<div class="screen-root bg-slate-50">
    <div class="bg-white px-4 py-3 sticky top-0 z-20 border-b border-slate-100 flex items-center justify-between">
      <button class="p-1.5 -ml-1 text-slate-700 hover:bg-slate-100 rounded-full" data-action="go" data-screen="orders">${ICONS.Back()}</button>
      <h1 class="font-black text-base text-slate-900">Order Details</h1>
      <div class="w-6"></div>
    </div>

    <div class="p-4 space-y-4">
      <div class="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-3">
        <div class="flex justify-between items-start">
          <div>
            <div class="flex items-center space-x-2">
              <span class="font-black text-base text-slate-900">#${o.id}</span>
              <button class="text-slate-400 hover:text-slate-600" data-action="copy-order">${ICONS.Copy()}</button>
            </div>
            <p class="text-[10px] text-slate-500 mt-0.5">Placed on ${o.date}, ${o.time || '14:32'}</p>
          </div>
          <span class="text-[10px] font-bold px-2.5 py-1 rounded-full ${o.statusColor}">${o.status}</span>
        </div>

        <div class="pt-2">
          <div class="flex items-center justify-between relative">
            <div class="absolute top-3 left-4 right-4 h-0.5 bg-slate-200"></div>
            <div class="absolute top-3 left-4 w-3/4 h-0.5 bg-blue-600"></div>
            ${[
              { label: 'Confirmed', done: true, filled: true },
              { label: 'Preparing', done: true, filled: true },
              { label: 'Picked up', done: true, filled: true },
              { label: 'Out for delivery', done: true, filled: true, active: true },
              { label: 'Delivered', done: false, filled: false }
            ].map(s => `
              <div class="flex flex-col items-center z-10">
                <div class="w-6 h-6 rounded-full ${s.filled ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400 border border-slate-300'} flex items-center justify-center text-[10px] font-bold">
                  ${s.done ? '✓' : '◯'}
                </div>
                <span class="text-[9px] ${s.active ? 'font-bold text-slate-900' : s.done ? 'text-slate-600' : 'text-slate-400'} mt-1">${s.label}</span>
              </div>`).join('')}
          </div>
        </div>
      </div>

      <div class="bg-blue-50/70 p-4 rounded-2xl border border-blue-100 space-y-3">
        <div class="flex items-start space-x-3">
          <div class="p-2 bg-blue-100 text-[#002B66] rounded-xl">${ICONS.Truck()}</div>
          <div>
            <h3 class="font-bold text-xs text-slate-900">Your order is out for delivery</h3>
            <p class="text-[11px] text-slate-600 mt-0.5">Your items are on the way! You can track the delivery in real time.</p>
          </div>
        </div>
        <button class="w-full bg-[#002B66] text-white font-bold py-3 px-4 rounded-xl text-xs hover:bg-[#001d47] transition flex items-center justify-center space-x-2 shadow-sm" data-action="go" data-screen="order-track">
          ${ICONS.MapPin()}<span>Track Order</span>
        </button>
      </div>

      <div class="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-3">
        <h3 class="font-black text-sm text-slate-900">Delivery information</h3>
        <div class="space-y-3 text-xs">
          <div class="flex items-start space-x-3">
            <div class="p-2 bg-slate-100 rounded-xl text-slate-700">${ICONS.MapPin()}</div>
            <div class="flex-1">
              <div class="text-[10px] text-slate-400">Delivery address</div>
              <div class="font-semibold text-slate-800">${o.address}</div>
            </div>
            ${ICONS.ChevronRight()}
          </div>
          <div class="flex items-start space-x-3 pt-2 border-t border-slate-50">
            <div class="p-2 bg-slate-100 rounded-xl text-slate-700">⏰</div>
            <div>
              <div class="text-[10px] text-slate-400">Estimated delivery</div>
              <div class="font-semibold text-slate-800">${o.estimatedDelivery || 'Today, 16:00 – 17:00'}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-3">
        <h3 class="font-black text-sm text-slate-900">Items (${o.items.length})</h3>
        <div class="space-y-3 divide-y divide-slate-100">${itemRows(o)}</div>
      </div>
    </div>

    ${navForRole()}
  </div>`;
}

function screenOrderTrack() {
  const o = state.selectedOrder;
  const rider = o.rider || { name: 'Thabo M.', rating: 4.8, deliveries: 320, vehicle: 'On a motorcycle • BKD 452 GP', etaMinutes: 12 };
  return `<div class="screen-root-track bg-slate-100">
    <div class="bg-white px-4 py-3 sticky top-0 z-20 border-b border-slate-100 flex items-center justify-between">
      <button class="p-1.5 -ml-1 text-slate-700 hover:bg-slate-100 rounded-full" data-action="go" data-screen="order-detail">${ICONS.Back()}</button>
      <h1 class="font-black text-base text-slate-900">Track Order</h1>
      <button class="text-slate-600 font-bold" data-action="toast" data-msg="Order #${o.id}">•••</button>
    </div>

    <div class="p-4 z-10 flex-shrink-0">
      <div class="bg-blue-50/90 backdrop-blur-md p-4 rounded-2xl border border-blue-100 shadow-sm flex items-center space-x-3">
        <div class="p-2.5 bg-blue-600 text-white rounded-xl">${ICONS.Truck()}</div>
        <div>
          <h2 class="font-black text-sm text-slate-900">Arriving in ${rider.etaMinutes} min</h2>
          <p class="text-[11px] text-slate-600">Your rider is on the way to your location.</p>
        </div>
      </div>
    </div>

    <div class="flex-1 relative bg-[#e5ece2] overflow-hidden min-h-[300px]">
      <div class="absolute inset-0 opacity-40 pointer-events-none map-grid"></div>

      <svg class="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400" preserveAspectRatio="none">
        <path d="M 0,100 Q 200,120 400,200" stroke="#f1f5f9" stroke-width="20" fill="none" />
        <path d="M 100,0 L 250,400" stroke="#f1f5f9" stroke-width="16" fill="none" />
        <path d="M 0,120 L 400,240" stroke="#fef08a" stroke-width="10" fill="none" />
        <path d="M 80,260 L 160,180 L 250,150 L 310,120 L 320,80" stroke="#2563eb" stroke-width="5" stroke-dasharray="6 2" fill="none" />
      </svg>

      <div class="absolute top-16 right-28 bg-lime-500 text-slate-900 text-[10px] font-black px-1.5 py-0.5 rounded shadow-sm">R104</div>
      <div class="absolute top-1/2 left-1/3 text-slate-400 font-bold text-xs tracking-widest uppercase pointer-events-none opacity-60">ATTERIDGEVILLE</div>

      <div class="absolute bottom-24 left-16 flex flex-col items-center">
        <div class="w-9 h-9 bg-[#002B66] text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white">${ICONS.Home()}</div>
      </div>

      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10 animate-pulse">
        <div class="bg-[#002B66] text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-md mb-1 whitespace-nowrap">${rider.etaMinutes} min away</div>
        <div class="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center text-slate-900 text-lg shadow-xl border-2 border-white">🛵</div>
      </div>

      <div class="absolute top-14 right-16 flex flex-col items-center">
        <div class="w-9 h-9 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white">${ICONS.Home()}</div>
      </div>

      <div class="absolute bottom-4 right-4 flex flex-col space-y-2">
        <button class="w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center text-slate-700 hover:bg-slate-50" data-action="toast" data-msg="Centering map">🎯</button>
        <button class="w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center text-slate-700 hover:bg-slate-50" data-action="toast" data-msg="Map layers">🗺️</button>
      </div>
    </div>

    <div class="bg-white p-4 rounded-t-3xl shadow-2xl border-t border-slate-100 space-y-4 z-20">
      <div class="grabber"></div>

      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80" alt="Rider" class="w-12 h-12 rounded-full object-cover border-2 border-amber-400 shadow-sm" />
          <div>
            <h3 class="font-black text-sm text-slate-900">${rider.name}</h3>
            <div class="flex items-center space-x-1 text-[10px] text-slate-600 mt-0.5">
              ${ICONS.Star()}<span class="font-bold">${rider.rating}</span><span>(${rider.deliveries} deliveries)</span>
            </div>
            <p class="text-[10px] text-slate-400 mt-0.5">${rider.vehicle}</p>
          </div>
        </div>

        <div class="flex space-x-2">
          <button class="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-full transition" data-action="toast" data-msg="Calling rider ${rider.name.split(' ')[0]}...">${ICONS.Phone()}</button>
          <button class="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-full transition" data-action="toast" data-msg="Opening chat with ${rider.name.split(' ')[0]}">${ICONS.Message()}</button>
        </div>
      </div>

      <div class="bg-blue-50 p-3 rounded-2xl border border-blue-100 flex items-center space-x-3">
        <div class="p-2 bg-blue-100 text-[#002B66] rounded-xl">${ICONS.Truck()}</div>
        <div class="text-xs">
          <div class="font-bold text-slate-900">Your order is out for delivery</div>
          <p class="text-slate-600 text-[10px]">${rider.name} is on the way to your location. Please keep your phone nearby.</p>
        </div>
      </div>
    </div>
  </div>`;
}

function screenOrderDelivered() {
  const o = state.selectedOrder;
  return `<div class="screen-root bg-slate-50">
    <div class="bg-white px-4 py-3 sticky top-0 z-20 border-b border-slate-100 flex items-center justify-between">
      <button class="p-1.5 -ml-1 text-slate-700 hover:bg-slate-100 rounded-full" data-action="go" data-screen="orders">${ICONS.Back()}</button>
      <h1 class="font-black text-base text-slate-900">Order Details</h1>
      <div class="w-6"></div>
    </div>

    <div class="p-4 space-y-4">
      <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center space-y-3 relative overflow-hidden">
        <div class="absolute top-2 left-6 text-amber-400 text-sm">🎉</div>
        <div class="absolute top-4 right-8 text-blue-500 text-xs">✦</div>
        <div class="absolute bottom-6 left-10 text-amber-500 text-xs">✦</div>

        <div class="w-20 h-20 bg-blue-100 rounded-2xl mx-auto flex items-center justify-center relative">
          <span class="text-4xl">📦</span>
          <div class="absolute -bottom-1 -right-1 bg-amber-400 text-slate-900 p-1 rounded-full border-2 border-white text-xs font-bold">✓</div>
        </div>

        <div>
          <h2 class="font-black text-xl text-slate-900">Order Delivered</h2>
          <p class="text-xs text-slate-500 max-w-xs mx-auto mt-1">Your order has been successfully delivered. Thank you for shopping with BizLink!</p>
        </div>

        <div class="pt-2 space-y-2">
          <button class="w-full border border-[#002B66] text-[#002B66] font-bold py-2.5 px-4 rounded-xl text-xs hover:bg-blue-50" data-action="toast" data-msg="Opening official receipt PDF...">View Receipt</button>
          <button class="w-full bg-[#002B66] text-white font-bold py-3 px-4 rounded-xl text-xs hover:bg-[#001d47] shadow-sm" data-action="buy-again">Buy Again</button>
        </div>
      </div>

      <div class="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-3">
        <h3 class="font-black text-sm text-slate-900">Delivery details</h3>
        <div class="space-y-3 text-xs">
          <div class="flex items-start space-x-3">
            <div class="p-2 bg-slate-100 rounded-xl text-slate-700">📅</div>
            <div>
              <div class="text-[10px] text-slate-400">Delivered on</div>
              <div class="font-semibold text-slate-800">${o.deliveredAt || '21 Sep 2026 at 16:24'}</div>
            </div>
          </div>
          <div class="flex items-start space-x-3 pt-2 border-t border-slate-50">
            <div class="p-2 bg-slate-100 rounded-xl text-slate-700">${ICONS.MapPin()}</div>
            <div>
              <div class="text-[10px] text-slate-400">Delivered to</div>
              <div class="font-semibold text-slate-800">${o.address}</div>
            </div>
          </div>
          <div class="flex items-start space-x-3 pt-2 border-t border-slate-50">
            <div class="p-2 bg-slate-100 rounded-xl text-slate-700">${ICONS.User()}</div>
            <div>
              <div class="text-[10px] text-slate-400">Received by</div>
              <div class="font-semibold text-slate-800">${o.recipient || 'Mpho Ramarumo'}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-3">
        <h3 class="font-black text-sm text-slate-900">Items (${o.items.length})</h3>
        <div class="space-y-3 divide-y divide-slate-100">${itemRows(o)}</div>
      </div>
    </div>

    ${navForRole()}
  </div>`;
}

function screenProfile() {
  return `<div class="screen-root bg-slate-50">
    <div class="bg-white px-4 py-3 sticky top-0 z-20 border-b border-slate-100 flex justify-between items-center">
      ${bizLinkLogo('')}
      <div class="flex items-center space-x-2">
        <button class="p-2 text-slate-700 hover:bg-slate-100 rounded-full relative" data-action="toast" data-msg="No new notifications">${ICONS.Bell()}</button>
        <button class="p-2 text-slate-700 hover:bg-slate-100 rounded-full" data-action="toast" data-msg="Opening settings...">${ICONS.Settings()}</button>
      </div>
    </div>

    <div class="p-4 space-y-4">
      <div class="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-4">
        <div class="flex items-center space-x-3">
          <div class="relative">
            <div class="w-16 h-16 bg-slate-200 rounded-full overflow-hidden flex items-center justify-center">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80" alt="Mpho Ramarumo" class="w-full h-full object-cover" />
            </div>
            <button class="absolute bottom-0 right-0 bg-[#002B66] text-white p-1 rounded-full border border-white text-[10px]" data-action="toast" data-msg="Editing profile picture...">📷</button>
          </div>
          <div class="flex-1">
            <h2 class="font-black text-base text-slate-900">Mpho Ramarumo</h2>
            <div class="text-xs text-slate-500">Customer</div>
            <div class="flex items-center text-[11px] text-slate-600 mt-1 cursor-pointer hover:underline" data-action="toast" data-msg="Opening address book">
              ${ICONS.MapPin()}<span class="ml-1">Atteridgeville, Pretoria</span>${ICONS.ChevronRight()}
            </div>
          </div>
          <button class="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center space-x-1" data-action="toast" data-msg="Editing profile...">
            ✏️ <span>Edit Profile</span>
          </button>
        </div>

        <div class="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center">
          ${[['12', 'Orders'], ['8', 'Saved Items'], ['3', 'Saved Addresses']].map(s => `
            <div class="bg-blue-50/50 p-2 rounded-xl">
              <div class="text-base font-black text-slate-900">${s[0]}</div>
              <div class="text-[10px] text-slate-500">${s[1]}</div>
            </div>`).join('')}
        </div>
      </div>

      <div class="bg-white rounded-2xl border border-slate-100 shadow-sm divide-y divide-slate-100">
        ${menuRow('📦', 'My Orders', 'Track, return or reorder', 'go', 'orders')}
        ${menuRow('📍', 'My Addresses', 'Manage your delivery addresses', 'toast', 'Saved delivery addresses')}
        ${menuRow('💳', 'Payment Methods', 'Manage cards and payment options', 'toast', 'Payment methods')}
        ${menuRow('♡', 'Saved Items', 'View your wishlist', 'toast', 'Wishlist & saved items')}
        ${menuRow('🔔', 'Notifications', 'Manage your preferences', 'toast', 'Notification settings')}
      </div>

      <div class="bg-white rounded-2xl border border-slate-100 shadow-sm divide-y divide-slate-100">
        ${menuRow('❓', 'Help & Support', 'FAQs, contact support', 'toast', 'Help Center & Support')}
        ${menuRow('ℹ️', 'About BizLink', 'Version 1.0.0', 'toast', 'BizLink Version 1.0.0')}
      </div>

      <button class="w-full bg-red-50 hover:bg-red-100 text-red-600 font-bold py-3.5 px-4 rounded-2xl text-xs transition flex items-center justify-center space-x-2 border border-red-100" data-action="signout">
        <span>🚪</span><span>Sign Out</span>
      </button>
    </div>

    ${navForRole()}
  </div>`;
}

function renderCart() {
  return `<div class="cart-overlay">
    <div class="cart-drawer">
      <div class="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
        <div class="flex items-center space-x-2">
          ${ICONS.Cart()}
          <h2 class="font-black text-base text-slate-900">Your Shopping Cart</h2>
        </div>
        <button class="p-1.5 text-slate-400 hover:text-slate-700 rounded-full" data-action="toggle-cart">✕</button>
      </div>

      <div class="flex-1 overflow-y-auto p-4 space-y-3">
        ${state.cartItems.length === 0
          ? '<div class="text-center py-12 text-slate-400 text-xs">Your cart is empty. Add items from the marketplace!</div>'
          : state.cartItems.map(item => `
            <div class="flex items-center space-x-3 bg-slate-50 p-3 rounded-2xl border border-slate-100">
              <img src="${item.image}" alt="${item.name}" class="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
              <div class="flex-1 min-w-0">
                <h4 class="font-bold text-xs text-slate-900 line-clamp-1">${item.name}</h4>
                <div class="text-[10px] text-slate-500">${item.vendor}</div>
                <div class="font-black text-xs text-slate-900 mt-0.5">${money(item.price * item.quantity)}</div>
              </div>
              <div class="flex items-center space-x-2 bg-white rounded-xl border border-slate-200 p-1 flex-shrink-0">
                <button class="p-1 text-slate-600 hover:bg-slate-100 rounded" data-action="cart-dec" data-id="${item.id}">${ICONS.Minus()}</button>
                <span class="text-xs font-bold w-4 text-center">${item.quantity}</span>
                <button class="p-1 text-slate-600 hover:bg-slate-100 rounded" data-action="cart-inc" data-id="${item.id}">${ICONS.Plus()}</button>
              </div>
            </div>`).join('')}
      </div>

      ${state.cartItems.length > 0 ? `
        <div class="p-4 border-t border-slate-100 bg-white space-y-3">
          <div class="space-y-1 text-xs">
            <div class="flex justify-between text-slate-500"><span>Subtotal</span><span>${money(cartSubtotal())}</span></div>
            <div class="flex justify-between text-slate-500"><span>Delivery fee</span><span>R15.00</span></div>
            <div class="flex justify-between font-black text-slate-900 text-sm pt-2 border-t border-slate-100">
              <span>Total</span><span>${money(cartSubtotal() + 15)}</span>
            </div>
          </div>
          <button class="w-full bg-[#002B66] text-white font-bold py-3.5 rounded-xl text-xs hover:bg-[#001d47] transition shadow-md" data-action="checkout">Checkout Now →</button>
        </div>` : ''}
    </div>
  </div>`;
}

function screenScenarioLanding() {
  const scenarios = [
    { id: 's1', title: 'B2B procurement + route pooling', badge: 'Scenario 1', description: 'Township business sources stock and joins a shared route to reduce delivery costs.' },
    { id: 's2', title: 'B2C fulfilment + tracking + trust', badge: 'Scenario 2', description: 'Business receives a consumer order, assigns a verified driver and completes proof-of-delivery.' },
    { id: 's3', title: 'Consumer discovery + promoted listing', badge: 'Scenario 3', description: 'Consumer discovers a relevant business, orders a product and rates the experience after delivery.' }
  ];

  return `<div class="screen-root bg-slate-50">
    <div class="bg-white px-4 py-3 sticky top-0 z-20 border-b border-slate-100">
      <div class="flex items-center justify-between">
        ${bizLinkLogo('PROTOTYPE STORY')}
        <button class="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-full text-[10px] font-bold" data-action="go" data-screen="landing">Product home</button>
      </div>
    </div>

    <div class="p-4 space-y-4">
      <div class="bg-[#002B66] text-white rounded-3xl p-4 overflow-hidden relative">
        <div class="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-amber-400/90"></div>
        <div class="absolute bottom-0 left-0 w-28 h-28 rounded-full bg-white/10"></div>
        <div class="relative z-10">
          <div class="text-[10px] font-bold tracking-widest uppercase text-blue-200">Three connected stories</div>
          <h1 class="text-2xl font-black mt-2 leading-tight">BizLink demo flow</h1>
          <p class="text-xs text-blue-100 mt-2 leading-relaxed">Each journey maps a real transaction: supplier access, fulfilment and consumer discovery.</p>
        </div>
      </div>

      <div class="space-y-3">
        ${scenarios.map(item => `
          <button class="journey-card w-full text-left" data-action="choose-scenario" data-scenario="${item.id}">
            <div class="flex justify-between items-center mb-2">
              <span class="scenario-badge">${item.badge}</span>
              <span class="text-sm text-slate-400">→</span>
            </div>
            <h2 class="font-black text-base text-slate-900">${item.title}</h2>
            <p class="text-[11px] text-slate-500 mt-1 leading-relaxed">${item.description}</p>
          </button>
        `).join('')}
      </div>
    </div>
  </div>`;
}

function renderScenarioFlow() {
  const flow = SCENARIO_FLOW[state.activeScenario] || SCENARIO_FLOW.s1;
  const step = flow[state.scenarioIndex] || flow[0];
  const isFinal = state.scenarioIndex >= flow.length - 1;

  return `<div class="screen-root bg-slate-50">
    <div class="bg-white px-4 py-3 sticky top-0 z-20 border-b border-slate-100 flex items-center justify-between">
      <button class="p-1.5 -ml-1 text-slate-700 hover:bg-slate-100 rounded-full" data-action="go" data-screen="demo-landing">${ICONS.Back()}</button>
      <div class="text-center">
        <div class="text-[10px] font-bold tracking-widest uppercase text-slate-500">${state.activeScenario === 's1' ? 'Scenario 1' : state.activeScenario === 's2' ? 'Scenario 2' : 'Scenario 3'}</div>
        <div class="font-black text-base text-slate-900">${state.scenarioIndex + 1}/${flow.length}</div>
      </div>
      <button class="text-slate-500 hover:text-slate-700 text-[10px] font-bold" data-action="reset-scenario">Reset</button>
    </div>

    <div class="p-4 space-y-4">
      <div class="scenario-step-panel">
        <div class="step-badge">${step.id}</div>
        <h1 class="text-2xl font-black text-slate-900 mt-3">${step.title}</h1>
        <p class="text-xs text-slate-500 mt-2 leading-relaxed">${step.response}</p>

        <div class="mini-grid mt-4">
          <div class="mini-card">
            <span class="mini-label">Screen</span>
            <strong>${step.title}</strong>
          </div>
          <div class="mini-card">
            <span class="mini-label">Button / action</span>
            <strong>${step.action}</strong>
          </div>
          <div class="mini-card">
            <span class="mini-label">System response</span>
            <strong>${step.response}</strong>
          </div>
          <div class="mini-card">
            <span class="mini-label">Next screen</span>
            <strong>${step.next}</strong>
          </div>
        </div>

        <div class="flow-card mt-4">
          <div class="flow-label">Demo route</div>
          <div class="flow-trail">
            <span>Screen</span>
            <span>→</span>
            <span>Button</span>
            <span>→</span>
            <span>Next screen</span>
          </div>
          <div class="flow-detail">${step.title} → ${step.action} → ${step.next}</div>
        </div>
      </div>

      <div class="scenario-footer">
        <button class="scenario-button secondary" data-action="scenario-back" ${state.scenarioIndex === 0 ? 'disabled' : ''}>Back</button>
        <button class="scenario-button primary" data-action="scenario-next">${isFinal ? 'Finish' : 'Next step'}</button>
      </div>
    </div>
  </div>`;
}

/* ---------------- Business screens ---------------- */
// Role-aware bottom nav: consumer screens keep the shopper nav,
// business screens keep the business dashboard nav.
function navForRole() {
  return state.role === 'business' ? businessBottomNav() : bottomNav();
}

function businessBottomNav() {
  const cur = state.currentScreen;
  const items = [
    { label: 'Dashboard', icon: ICONS.Home(), active: cur === 'business-dashboard', screen: 'business-dashboard' },
    { label: 'Suppliers', icon: ICONS.Browse(), active: cur === 'business-suppliers', screen: 'business-suppliers' },
    { label: 'Orders', icon: ICONS.Orders(), active: cur === 'orders', screen: 'orders' },
    { label: 'Cart', icon: ICONS.Cart(), cart: true },
    { label: 'Profile', icon: ICONS.User(), active: cur === 'profile', screen: 'profile' }
  ];
  return `<nav class="bottom-nav">
    ${items.map(it => {
      if (it.cart) {
        const n = countInCart();
        return `<button class="nav-item" data-action="toggle-cart" aria-label="Cart">
          <div class="relative">
            ${it.icon}
            ${n > 0 ? `<span class="absolute -top-2 -right-2 bg-amber-500 text-slate-900 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white">${n}</span>` : ''}
          </div>
          <span class="nav-label">Cart</span>
        </button>`;
      }
      return `<button class="nav-item ${it.active ? 'active' : ''}" data-action="go" data-screen="${it.screen}">
        ${it.icon}
        <span class="nav-label">${it.label}${it.active ? '<span class="nav-dot"></span>' : ''}</span>
      </button>`;
    }).join('')}
  </nav>`;
}

function screenBusinessSelect() {
  return `<div class="screen-root bg-slate-50">
    <div class="bg-white px-4 py-3 sticky top-0 z-20 border-b border-slate-100 flex items-center justify-between">
      <button class="p-1.5 -ml-1 text-slate-700 hover:bg-slate-100 rounded-full" data-action="go" data-screen="signin">${ICONS.Back()}</button>
      <h1 class="font-black text-base text-slate-900">Your Business</h1>
      <div class="w-6"></div>
    </div>

    <div class="p-4 space-y-4">
      <div class="pt-1">
        <h2 class="text-xl font-black text-slate-900">Select your township business</h2>
        <p class="text-xs text-slate-500 mt-1 leading-relaxed">Choose the secondary township business you operate. We'll show deliveries pooling near this area.</p>
      </div>

      <div class="space-y-3">
        ${TOWNSHIP_BUSINESSES.map(b => {
          const active = state.currentBusiness.id === b.id;
          return `<button class="w-full bg-white p-4 rounded-2xl border shadow-sm transition text-left flex items-center space-x-3 ${active ? 'border-[#002B66] ring-2 ring-[#002B66]/20' : 'border-slate-100 hover:border-slate-300'}" data-action="select-business" data-id="${b.id}">
            <div class="w-12 h-12 ${active ? 'bg-blue-100 text-[#002B66]' : 'bg-slate-100 text-slate-700'} rounded-xl flex items-center justify-center flex-shrink-0">
              ${b.id === 'tb1' ? ICONS.Home() : b.id === 'tb2' ? '🏪' : '🛒'}
            </div>
            <div class="flex-1 min-w-0">
              <div class="font-black text-sm text-slate-900">${b.name}</div>
              <div class="text-[10px] text-slate-500 flex items-center space-x-1 mt-0.5">${ICONS.MapPin()}<span>${b.area}</span></div>
              <div class="text-[10px] text-slate-400 mt-0.5">${b.tag} • ${ICONS.Star() === '' ? '' : ''}<span class="text-amber-500 font-bold">${b.rating}</span></div>
            </div>
            ${active ? '<span class="w-5 h-5 bg-[#002B66] text-white rounded-full flex items-center justify-center text-[10px] font-black flex-shrink-0">✓</span>' : '<span class="w-5 h-5 rounded-full border border-slate-300 flex-shrink-0"></span>'}
          </button>`;
        }).join('')}
      </div>

      <button class="w-full bg-[#002B66] text-white font-bold py-3.5 px-4 rounded-xl shadow-md hover:bg-[#001d47] transition" data-action="select-business" data-id="${state.currentBusiness.id}">
        Continue as ${state.currentBusiness.name.split(' ')[0]} →
      </button>
    </div>

    ${businessBottomNav()}
  </div>`;
}

function screenBusinessDashboard() {
  const b = state.currentBusiness;
  const maxSale = Math.max(...ANALYTICS.weekly);
  return `<div class="screen-root bg-slate-50">
    <div class="bg-white px-4 py-3 sticky top-0 z-20 border-b border-slate-100 space-y-3">
      <div class="flex justify-between items-center">
        ${bizLinkLogo('BUSINESS CENTRE')}
        <div class="flex items-center space-x-3">
          <button class="p-2 text-slate-700 hover:bg-slate-100 rounded-full relative" data-action="toast" data-msg="You're all caught up!">
            ${ICONS.Bell()}<span class="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full"></span>
          </button>
          <button class="p-2 text-slate-700 hover:bg-slate-100 rounded-full" data-action="go" data-screen="profile">${ICONS.User()}</button>
        </div>
      </div>
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-xl font-black text-slate-900">Business Analytics</h1>
          <p class="text-xs text-slate-500 mt-0.5">${b.name} • ${b.area}</p>
        </div>
        <button class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full text-[10px] font-bold" data-action="toast" data-msg="This month report">Sep 2026</button>
      </div>
    </div>

    <div class="p-4 space-y-4">
      <!-- Analytics stat cards -->
      <div class="grid grid-cols-2 gap-3">
        <div class="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
          <div class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Weekly Revenue</div>
          <div class="font-black text-xl text-slate-900 mt-1">${money(ANALYTICS.revenue)}</div>
          <div class="text-[10px] font-bold text-emerald-600 mt-0.5">▲ ${ANALYTICS.revenueDelta}% vs last week</div>
        </div>
        <div class="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
          <div class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Orders (Month)</div>
          <div class="font-black text-xl text-slate-900 mt-1">${ANALYTICS.ordersMonth}</div>
          <div class="text-[10px] font-bold text-blue-600 mt-0.5">▲ 8 new today</div>
        </div>
        <div class="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
          <div class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Avg Delivery</div>
          <div class="font-black text-xl text-slate-900 mt-1">${ANALYTICS.avgDelivery} min</div>
          <div class="text-[10px] font-bold text-slate-500 mt-0.5">Across the township</div>
        </div>
        <div class="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
          <div class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Customer Rating</div>
          <div class="flex items-center space-x-1 mt-1">${ICONS.Star()}<span class="font-black text-xl text-slate-900">${ANALYTICS.rating}</span></div>
          <div class="text-[10px] font-bold text-slate-500 mt-0.5">214 reviews</div>
        </div>
      </div>

      <!-- Weekly sales bar chart -->
      <div class="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <div class="flex justify-between items-center mb-3">
          <h3 class="font-black text-sm text-slate-900">Sales this week</h3>
          <span class="text-[10px] font-bold text-emerald-600">${money(ANALYTICS.revenue)} total</span>
        </div>
        <div class="flex items-end justify-between gap-2 h-24">
          ${ANALYTICS.weekly.map((v, i) => `
            <div class="flex-1 flex flex-col items-center justify-end h-full">
              <div class="text-[9px] font-bold text-slate-500 mb-1">${money(v).replace('R', 'R')}</div>
              <div class="bar ${v === maxSale ? 'bar-best' : ''}" style="height:${Math.round(v / maxSale * 100)}%"></div>
              <div class="text-[9px] font-bold text-slate-400 mt-1">${WEEK_LABELS[i]}</div>
            </div>`).join('')}
        </div>
      </div>

      <!-- Supplier search -->
      <div class="bg-blue-50/70 p-4 rounded-2xl border border-blue-100 space-y-3">
        <div class="flex items-start space-x-3">
          <div class="p-2 bg-blue-100 text-[#002B66] rounded-xl">${ICONS.Home()}</div>
          <div>
            <h3 class="font-bold text-xs text-slate-900">Find suppliers</h3>
            <p class="text-[11px] text-slate-600 mt-0.5">Search suppliers to restock or source new products near your township.</p>
          </div>
        </div>
        <form id="supplier-search-form" class="space-y-2">
          <div class="relative">
            <span class="absolute left-3 top-2.5 text-slate-400">${ICONS.Search()}</span>
            <input id="supplier-search-input" type="text" placeholder="Search suppliers or enter a product name..." class="w-full bg-white border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-xs" />
          </div>
          <button type="submit" class="w-full bg-[#002B66] text-white font-bold py-2.5 px-4 rounded-xl text-xs hover:bg-[#001d47] shadow-sm">📦 Search Suppliers</button>
        </form>
      </div>

      <!-- Recent procurement -->
      <div class="bg-white rounded-2xl border border-slate-100 shadow-sm divide-y divide-slate-100">
        <div class="p-4"><h3 class="font-black text-sm text-slate-900">Recent supplier orders</h3></div>
        ${[
          ['Iwisa Super Maize Meal 10kg', 'Ubuntu Suppliers', 'OUT FOR DELIVERY', 'bg-blue-100 text-blue-700 border-blue-200'],
          ['Sunfoil Cooking Oil 2L', 'Kasi Essentials', 'DELIVERED', 'bg-emerald-100 text-emerald-700 border-emerald-200'],
          ['Coca-Cola Original 6 Pack', "Mamsi's Tuckshop", 'SCHEDULED', 'bg-slate-100 text-slate-600 border-slate-200']
        ].map(([n, v, st, sc]) => `
          <button class="w-full p-4 flex items-center space-x-3 text-left hover:bg-slate-50 transition" data-action="toast" data-msg="Opening order from ${v}">
            <div class="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-700 flex-shrink-0">📦</div>
            <div class="flex-1 min-w-0">
              <div class="font-bold text-xs text-slate-900 line-clamp-1">${n}</div>
              <div class="text-[10px] text-slate-400">${v} • Today</div>
            </div>
            <span class="text-[10px] font-bold px-2 py-1 rounded-full border ${sc} flex-shrink-0">${st}</span>
          </button>`).join('')}
      </div>
    </div>

    ${businessBottomNav()}
  </div>`;
}

function screenBusinessSuppliers() {
  const q = state.supplierQuery.toLowerCase().trim();
  const matching = SUPPLIER_SEARCH_POOL.filter(s =>
    !q || s.name.toLowerCase().includes(q) || s.area.toLowerCase().includes(q) ||
    s.products.some(p => p.name.toLowerCase().includes(q))
  );
  return `<div class="screen-root bg-slate-50">
    <div class="bg-white px-4 py-3 sticky top-0 z-20 border-b border-slate-100 flex items-center justify-between">
      <button class="p-1.5 -ml-1 text-slate-700 hover:bg-slate-100 rounded-full" data-action="go" data-screen="business-dashboard">${ICONS.Back()}</button>
      <h1 class="font-black text-base text-slate-900">Suppliers</h1>
      <button class="text-slate-400 hover:text-slate-600" data-action="toggle-cart" aria-label="Cart">${ICONS.Cart()}</button>
    </div>

    <div class="p-4 space-y-4">
      <div class="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-2">
        <h2 class="font-black text-sm text-slate-900">Search suppliers &amp; products</h2>
        <form id="supplier-search-form" class="space-y-2">
          <div class="relative">
            <span class="absolute left-3 top-2.5 text-slate-400">${ICONS.Search()}</span>
            <input id="supplier-search-input" type="text" value="${state.supplierQuery}" placeholder="Enter a product name (e.g. maize meal)..." class="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-xs focus:bg-white" />
          </div>
        </form>
        <p class="text-[10px] text-slate-400">${matching.length} supplier${matching.length === 1 ? '' : 's'} found ${q ? `for "${state.supplierQuery}"` : '— showing all'}</p>
      </div>

      ${matching.length === 0
        ? '<div class="py-12 text-center text-slate-400 text-xs space-y-2"><div class="text-3xl">🔍</div><p>No suppliers found for "' + state.supplierQuery + '".</p><p class="text-[10px]">Try "maize", "oil", "bread" or "cola".</p></div>'
        : matching.map(s => supplierCard(s, q)).join('')}
    </div>

    ${businessBottomNav()}
  </div>`;
}

function supplierCard(s, q) {
  const prods = q ? s.products.filter(p => p.name.toLowerCase().includes(q)) : s.products;
  return `<div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 space-y-3">
    <div class="flex items-center space-x-3">
      <div class="w-11 h-11 bg-slate-100 rounded-xl flex items-center justify-center text-slate-700 flex-shrink-0">🏭</div>
      <div class="flex-1 min-w-0">
        <div class="font-black text-sm text-slate-900">${s.name}</div>
        <div class="text-[10px] text-slate-500 flex items-center space-x-1 mt-0.5">${ICONS.MapPin()}<span>${s.area}</span></div>
      </div>
      <div class="text-right flex-shrink-0">
        <div class="flex items-center justify-end space-x-1 text-[10px] text-slate-600">${ICONS.Star()}<span class="font-bold">${s.rating}</span></div>
        <div class="text-[9px] text-slate-400 mt-0.5">${s.deliveries} deliveries</div>
      </div>
    </div>
    <div class="space-y-2 divide-y divide-slate-100">
      ${prods.map(p => `
        <div class="pt-2 first:pt-0">
          <div class="flex items-center space-x-3">
            <img src="${p.image}" alt="${p.name}" class="w-11 h-11 rounded-xl object-cover border border-slate-100 flex-shrink-0" />
            <div class="flex-1 min-w-0">
              <div class="font-bold text-xs text-slate-900 line-clamp-1">${p.name}</div>
              <div class="text-[10px] text-slate-500">${p.vendor} • In stock</div>
              <div class="font-black text-xs text-slate-900 mt-0.5">${money(p.price)}</div>
            </div>
          </div>
          <button class="mt-2 w-full px-3 py-2 bg-[#002B66] text-white rounded-xl text-[11px] font-bold shadow-sm hover:bg-[#001d47] active:scale-95 transition" data-action="place-order" data-pid="${p.id}">Place Order</button>
        </div>`).join('')}
    </div>
  </div>`;
}

/* ---------------- Route Pooling calendar modal ---------------- */
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Mock pool days: deliveries near your township (deterministic for the demo month)
function isDeliveryPoolDay(day) { return day % 3 === 0; }
function nearestPoolDay(fromDay) {
  for (let d = fromDay; d <= 30; d++) if (isDeliveryPoolDay(d)) return d;
  return 30;
}

function buildCalendar() {
  const year = 2026, monthIdx = 8, today = 21;
  const firstDay = new Date(year, monthIdx, 1).getDay(); // 0 = Sunday
  const mondayStart = (firstDay + 6) % 7;
  const cells = [];
  for (let i = 0; i < mondayStart; i++) cells.push(null);
  for (let d = 1; d <= 30; d++) cells.push(d);
  return { year, monthIdx, mondayStart, daysInMonth: 30, today, cells };
}

function renderRoutePool() {
  if (!state.routePoolOpen || !state.poolOrder) return '';
  const p = state.poolOrder.product;
  const cal = buildCalendar();
  return `<div class="pool-overlay">
    <div class="pool-modal">
      <div class="flex items-center justify-between mb-1">
        <div class="flex items-center space-x-2">
          <div class="p-2 bg-amber-100 text-amber-700 rounded-xl">🚚</div>
          <div>
            <h2 class="font-black text-base text-slate-900">Route Pooling</h2>
            <p class="text-[10px] text-slate-500">Bundle your order with deliveries near you</p>
          </div>
        </div>
        <button class="p-1.5 text-slate-400 hover:text-slate-700 rounded-full" data-action="close-route-pool">✕</button>
      </div>

      <div class="bg-slate-50 rounded-2xl border border-slate-100 p-3 flex items-center space-x-3 mt-3">
        <img src="${p.image}" alt="${p.name}" class="w-11 h-11 rounded-xl object-cover border border-slate-100 flex-shrink-0" />
        <div class="flex-1 min-w-0">
          <div class="font-bold text-xs text-slate-900 line-clamp-1">${p.name}</div>
          <div class="text-[10px] text-slate-500">From ${state.poolOrder.supplier} • Qty 1</div>
          <div class="font-black text-xs text-slate-900 mt-0.5">${money(p.price)}</div>
        </div>
        <div class="text-right flex-shrink-0">
          <div class="text-[9px] text-slate-400">Pooling saves</div>
          <div class="font-black text-xs text-emerald-600">-${money(6)}</div>
        </div>
      </div>

      <div class="mt-4">
        <h3 class="font-bold text-sm text-slate-900">Pick a delivery route</h3>
        <p class="text-[10px] text-slate-500 mt-0.5">Highlighted days have pooled deliveries near ${state.currentBusiness.area}.</p>

        <div class="bg-white rounded-2xl border border-slate-200 mt-3 p-3">
          <div class="flex justify-between items-center mb-2">
            <span class="font-black text-sm text-slate-900">${MONTH_NAMES[cal.monthIdx]} ${cal.year}</span>
            <span class="text-[10px] font-bold text-slate-400">${state.currentBusiness.name}</span>
          </div>
          <div class="calendar-grid">
            ${['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(d => `<div class="day-head">${d}</div>`).join('')}
            ${cal.cells.map(d => {
              if (d === null) return '<div></div>';
              let cls = 'day-cell';
              if (d < cal.today) cls += ' past';
              else if (isDeliveryPoolDay(d)) cls += ' delivery';
              if (d === cal.today) cls += ' today';
              if (d === state.selectedPoolDay) cls += ' selected';
              return `<button class="${cls}" data-action="select-pool-day" data-day="${d}">
                ${d === cal.today ? '<span class="today-dot"></span>' : ''}${d}
              </button>`;
            }).join('')}
          </div>
          <div class="flex items-center space-x-4 mt-2 pt-2 border-t border-slate-100 text-[9px] text-slate-500">
            <span class="flex items-center space-x-1"><span class="legend-dot legend-delivery"></span><span>Deliveries near you</span></span>
            <span class="flex items-center space-x-1"><span class="legend-dot legend-selected"></span><span>Selected route</span></span>
            <span class="flex items-center space-x-1"><span class="legend-dot legend-today"></span><span>Today</span></span>
          </div>
        </div>
      </div>

      <div class="mt-4 space-y-2">
        <button class="w-full bg-[#002B66] text-white font-bold py-3 rounded-xl text-xs hover:bg-[#001d47] shadow-md transition" data-action="confirm-route">
          Confirm Pooled Route →
        </button>
        <button class="w-full border border-slate-200 text-slate-600 font-bold py-2.5 rounded-xl text-xs hover:bg-slate-50" data-action="standard-delivery">
          Standard delivery (skip pooling)
        </button>
      </div>
    </div>
  </div>`;
}

/* ---------------- Main render ---------------- */
const SCREENS = {
  'demo-landing': screenScenarioLanding,
  scenario: renderScenarioFlow,
  signin: screenSignIn,
  signup: screenSignUp,
  landing: screenLanding,
  browse: screenBrowse,
  orders: screenOrders,
  'order-detail': screenOrderDetail,
  'order-track': screenOrderTrack,
  'order-delivered': screenOrderDelivered,
  profile: screenProfile,
  'business-select': screenBusinessSelect,
  'business-dashboard': screenBusinessDashboard,
  'business-suppliers': screenBusinessSuppliers
};

function render() {
  const screen = document.getElementById('screen');
  let html = SCREENS[state.currentScreen]();
  if (state.isCartOpen) html += renderCart();
  if (state.routePoolOpen) html += renderRoutePool();
  html += toastHtml();
  screen.innerHTML = html;

  // Focus handling after render (keep search input focused)
  if (document.activeElement && document.activeElement.id === 'search-input') {
    const input = document.getElementById('search-input');
    if (input) input.focus();
  }
}

function updateProductGrid() {
  const grid = document.getElementById('product-grid');
  if (grid) grid.innerHTML = productGridHtml();
}

/* ---------------- Actions ---------------- */
function addToCart(id) {
  const product = INITIAL_PRODUCTS.find(p => p.id === id);
  if (!product) return;
  const existing = state.cartItems.find(i => i.id === id);
  if (existing) {
    state.cartItems = state.cartItems.map(i => i.id === id ? { ...i, quantity: i.quantity + 1 } : i);
  } else {
    state.cartItems = [...state.cartItems, { ...product, quantity: 1 }];
  }
  showToast(`Added ${product.name} to cart`);
}

function openOrder(id) {
  const order = INITIAL_ORDERS.find(o => o.id === id);
  if (!order) return;
  state.selectedOrder = order;
  state.currentScreen = order.status === 'Delivered' ? 'order-delivered' : 'order-detail';
  render();
}

function checkout() {
  if (state.cartItems.length === 0) {
    showToast('Your cart is empty');
    return;
  }
  state.isCartOpen = false;
  showToast('Order placed successfully!');
  state.currentScreen = 'order-detail';
  render();
}

function handleAction(el) {
  const action = el.dataset.action;
  switch (action) {
    case 'go':
      state.currentScreen = el.dataset.screen;
      render();
      break;
    case 'toggle-cart':
      state.isCartOpen = !state.isCartOpen;
      render();
      break;
    case 'add-to-cart':
      addToCart(el.dataset.id);
      break;
    case 'cart-inc': {
      const id = el.dataset.id;
      state.cartItems = state.cartItems.map(i => i.id === id ? { ...i, quantity: i.quantity + 1 } : i);
      render();
      break;
    }
    case 'cart-dec': {
      const id = el.dataset.id;
      state.cartItems = state.cartItems
        .map(i => i.id === id ? { ...i, quantity: i.quantity - 1 } : i)
        .filter(i => i.quantity > 0);
      render();
      break;
    }
    case 'set-category':
      state.activeCategory = el.dataset.value;
      render();
      break;
    case 'set-order-filter':
      state.orderTabFilter = el.dataset.value;
      render();
      break;
    case 'open-order':
      openOrder(el.dataset.id);
      break;
    case 'copy-order':
      showToast('Order ID copied');
      break;
    case 'toggle-save':
      showToast('Saved to wishlist!');
      break;
    case 'toggle-password': {
      const input = document.getElementById(el.dataset.target);
      if (input) input.type = input.type === 'password' ? 'text' : 'password';
      break;
    }
    case 'set-account-type':
      state.accountType = el.dataset.value;
      render();
      break;
    case 'checkout':
      checkout();
      break;
    case 'buy-again':
      showToast('Re-ordered items added to cart!');
      state.isCartOpen = true;
      render();
      break;
    case 'signout':
      showToast('Signed out');
      state.role = 'consumer';
      state.currentScreen = 'signin';
      render();
      break;
    case 'business-login':
      state.role = 'business';
      state.currentScreen = 'business-select';
      render();
      break;
    case 'choose-scenario': {
      state.activeScenario = el.dataset.scenario;
      state.scenarioIndex = 0;
      state.currentScreen = 'scenario';
      render();
      break;
    }
    case 'scenario-next': {
      const flow = SCENARIO_FLOW[state.activeScenario] || SCENARIO_FLOW.s1;
      const isFinal = state.scenarioIndex >= flow.length - 1;
      if (isFinal) {
        state.currentScreen = 'demo-landing';
      } else {
        state.scenarioIndex += 1;
        state.currentScreen = 'scenario';
      }
      render();
      break;
    }
    case 'scenario-back': {
      if (state.scenarioIndex > 0) {
        state.scenarioIndex -= 1;
      }
      state.currentScreen = 'scenario';
      render();
      break;
    }
    case 'reset-scenario':
      state.scenarioIndex = 0;
      state.currentScreen = 'scenario';
      render();
      break;
    case 'select-business': {
      const biz = TOWNSHIP_BUSINESSES.find(b => b.id === el.dataset.id);
      if (biz) state.currentBusiness = biz;
      state.role = 'business';
      state.currentScreen = 'business-dashboard';
      showToast(`Welcome back, ${state.currentBusiness.name}`);
      break;
    }
    case 'place-order': {
      const product = INITIAL_PRODUCTS.find(p => p.id === el.dataset.pid);
      if (!product) break;
      const supplier = SUPPLIER_SEARCH_POOL.find(s => s.products.some(p => p.id === el.dataset.pid));
      state.poolOrder = { product, supplier: supplier ? supplier.name : product.vendor };
      state.selectedPoolDay = null;
      state.routePoolOpen = true;
      render();
      break;
    }
    case 'select-pool-day': {
      const d = parseInt(el.dataset.day, 10);
      if (d < 21) break; // past days not selectable
      state.selectedPoolDay = d;
      render();
      break;
    }
    case 'confirm-route': {
      if (!state.selectedPoolDay) state.selectedPoolDay = nearestPoolDay(22);
      const day = state.selectedPoolDay;
      state.routePoolOpen = false;
      showToast(`Delivery routed for ${MONTH_NAMES[8]} ${day} — pooled with 3 deliveries near you`);
      state.currentScreen = 'business-dashboard';
      render();
      break;
    }
    case 'standard-delivery':
      state.routePoolOpen = false;
      showToast('Standard delivery scheduled for tomorrow');
      state.currentScreen = 'business-dashboard';
      render();
      break;
    case 'close-route-pool':
      state.routePoolOpen = false;
      render();
      break;
    case 'toast':
      showToast(el.dataset.msg);
      break;
  }
}

/* ---------------- Event wiring ---------------- */
document.addEventListener('click', e => {
  const el = e.target.closest('[data-action]');
  if (!el) return;
  e.preventDefault();
  handleAction(el);
});

document.addEventListener('submit', e => {
  const form = e.target.closest('form');
  if (!form) return;
  e.preventDefault();
  if (form.id === 'signin-form') {
    state.role = 'consumer';
    state.currentScreen = 'browse';
    showToast('Signed in successfully!');
  } else if (form.id === 'signup-form') {
    if (state.accountType === 'business') {
      state.role = 'business';
      state.currentScreen = 'business-select';
      showToast('Account created! Select your business');
    } else {
      state.role = 'consumer';
      state.currentScreen = 'browse';
      showToast('Account created successfully!');
    }
  } else if (form.id === 'supplier-search-form') {
    const input = document.getElementById('supplier-search-input');
    state.supplierQuery = input ? input.value : '';
    state.currentScreen = 'business-suppliers';
    render();
  }
});

document.addEventListener('input', e => {
  if (e.target && e.target.id === 'search-input') {
    state.searchQuery = e.target.value;
    updateProductGrid();
  }
});

/* ---------------- Boot ---------------- */
const initialScreen = (location.hash || '').replace('#', '');
if (SCREENS[initialScreen]) state.currentScreen = initialScreen;
if (!SCREENS[initialScreen]) state.currentScreen = 'landing';
render();