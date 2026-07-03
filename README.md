# LUXEN — Healthcare Website

A pixel-faithful recreation of the [WHHub](https://whhub.webflow.io/) reference design,
rebuilt with a modern React stack and rebranded as **LUXEN**.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** — all reveal / stagger / blur / drag / counter animations
- **Lenis** — smooth inertia scrolling
- **lucide-react** — icons (brand/social icons are inline SVG)
- **next/image** — optimized imagery (Unsplash CDN placeholders)

## Design system

| Token | Value |
| --- | --- |
| Font | Urbanist (400–900) |
| Primary | `#0083C3` |
| Surface | `#EFF8FD` |
| Ink (text) | `#010101` |
| Muted | `#6E7276` |
| Navy (dark panels) | `#082238` |
| Card radius | 16–28px |

Tokens live in `app/globals.css`; content lives in `lib/data.ts`; motion variants in `lib/motion.ts`.

## Sections (single long-scroll homepage)

Navbar · Hero · Discover (brand intro + logo marquee) · Solutions (services carousel) ·
Why Choose Us · Process steps · Expert Team · Stats bento · Appointment form ·
Testimonials carousel · Blog · Marquee · Footer.

## Develop

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Swapping imagery / content

All images are centralized in `IMG` at the top of `lib/data.ts` (Unsplash IDs).
Replace the IDs — or drop files in `/public` and point to them — to use your own assets.
Reference screenshots of the original design are kept in `design-reference/`.
