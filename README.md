# Krispet Website Redesign — Front-End Implementation

A front-end implementation and UX redesign for the **Krispet** e-commerce platform. This project translates high-fidelity Figma prototypes into a clean, accessible, and responsive web application

* **Live Demo:** [cmaii2411.github.io/uid-a3/](https://cmaii2411.github.io/uid-a3/)
* **Repository:** [github.com/cmaii2411/uid-a3](https://github.com/cmaii2411/uid-a3)
* **Author:** Chi Mai Tran

---

## 📌 Project Overview

The original Krispet site suffered from 3 main UX and accessibility issues that created significant user friction:
* **Arbitrary Typography & Accessibility Violations:** Fragmented text styling (mixing Serif, Sans, and Monospace) and tiny 10px fonts disrupted reading rhythm and violated basic WCAG accessibility standards.
* **Brand Identity & Trust:** Low-quality imagery, low-contrast text, and dense text walls compromised the brand's premium positioning and trust
* **Visual Hierarchy & Affordance:** Ambiguous button hierarchy and identical visual weights left users confused on key actions.

### Key Solutions Implemented
* **WCAG 2.1 AA Readability:** Standardized visual hierarchy using **Quicksand** for headings and **Montserrat** for body text
* **Elevated Aesthetic:** Refined layout using card containers, high-quality media, optimized whitespace, and Krispet's signature color palette (`#850E35`, `#EE6983`)
* **Clear Affordances:** Added standard visual cues, interactive button hover states, sticky header, slide-out cart drawer, and interactive carousels

---

## 🛠 Tech Stack & Assets

* **Core Stack:** HTML5, CSS3, JavaScript (ES6+)
* **Typography:** [Quicksand](https://fonts.google.com/specimen/Quicksand) & [Montserrat](https://fonts.google.com/specimen/Montserrat) via Google Fonts
* **Icons:** [Flaticon](https://www.flaticon.com/)
* **State Management:** Native `localStorage` for cart item persistence and order receipts

---

## 📂 Project Structure

```text
uid-a3/
├── index.html                 # Homepage
├── pages/                     # Application views
│   ├── cart.html              # Dedicated full cart page
│   ├── checkout.html          # Responsive multi-step checkout flow
│   ├── product.html           # Dynamic product detail page (PDP)
│   ├── productlist.html       # Dynamic catalog & search results page
│   └── thankyou.html          # Order confirmation & receipt page
├── scripts/                   # JavaScript modules
│   ├── global.js              # Shared components (Header, Footer, Scroll Reveal, Search logic)
│   ├── cart.js                # Core slide-out cart drawer state management
│   ├── cart-page.js           # Full cart page dynamic rendering
│   ├── checkout.js            # Responsive checkout transitions & order execution
│   ├── index.js               # Homepage hero banner & carousel dynamics
│   ├── product.js             # Dynamic PDP data binding & variant selection
│   ├── productlist.js         # Collection grid rendering & header customization
│   └── thankyou.js            # Dynamic order receipt rendering from localStorage
└── styles/                    # Modular stylesheets
    ├── global.css             # CSS variables, typography reset, global utilities
    ├── index.css              # Landing page styling
    ├── product.css            # Dynamic product page layout
    ├── productlist.css        # Product grid & sidebar layout
    ├── checkout.css           # Multi-step checkout form styling
    ├── cart.css               # Slide-out cart drawer styles
    └── thankyou.css           # Confirmation receipt styling
```

---

## 📋 Features & Enhancements

* **Flattened & Sticky Navigation:** Flattened header height to maximize viewport space and added sticky positioning for persistent cart and search accessibility.
* **Slide-out Cart Drawer:** Immediate visual feedback when items are added, dynamically modifying totals and badge counts via `cart.js`.
* **Dynamic Query Routing:** Search queries and collection filters pass through URL parameters to dynamically load appropriate headers and product collections.
* **Interactive Micro-Interactions:** Custom hover states, smooth scroll-reveal triggers (`scroll-reveal`), and infinite banner carousels.
* **Interactive Order Confirmation:** Replaced static confirmation text with an interactive order summary receipt dynamically rendered from `localStorage`.

---

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/cmaii2411/uid-a3.git](https://github.com/cmaii2411/uid-a3.git)
   cd uid-a3
