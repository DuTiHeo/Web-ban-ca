# Design System Document

## 1. Overview & Creative North Star
### The Creative North Star: "The Oceanic Curator"
This design system moves beyond the standard e-commerce grid to create a high-end, editorial experience for Aqualife. It treats aquatic life not as "inventory," but as rare art. We achieve this through "The Oceanic Curator" philosophy: a digital environment that feels as fluid, deep, and serene as the ocean itself.

By utilizing intentional asymmetry, sophisticated tonal layering, and high-contrast typography, we break the "template" look. We favor breathing room (whitespace) over density, and depth over flat outlines. The layout follows a rhythmic flow, mimicking the natural movement of water, guiding the user’s eye through a premium gallery-like journey rather than a rigid catalog.

---

## 2. Colors
Our palette is a sophisticated interplay of deep aquatic tones and pristine whites, designed to make the vibrant colors of exotic fish "pop."

- **Primary & Action:** `primary` (#005e97) and `primary_container` (#0077be) serve as our signature "Ocean Blue." Use these for high-intent actions and brand moments.
- **Deep Sea Accents:** `secondary` (#2f6386) provides grounding, while `tertiary` (#8b4800) acts as a rare, organic contrast—reminiscent of coral or driftwood—to be used sparingly for specialized highlights.
- **The "No-Line" Rule:** 1px solid borders are strictly prohibited for defining sections. Structure must be created through background shifts. For example, transition from a `surface` (#f7f9fb) section to a `surface_container_low` (#f2f4f6) section to denote a change in content.
- **Surface Hierarchy:** Use the `surface_container` tiers to nest content. A product card (`surface_container_lowest` - #ffffff) should sit atop a `surface_container_low` background, creating a natural, soft lift without heavy shadows.
- **The Glass & Gradient Rule:** For floating navigation or product overlays, use Glassmorphism. Apply `surface` colors at 80% opacity with a `20px` backdrop blur. Enhance primary buttons with a subtle gradient from `primary` to `primary_container` to add "soul" and a professional finish.

---

## 3. Typography
We utilize a dual-font strategy to balance editorial authority with modern readability.

- **Display & Headlines (Manrope):** We use Manrope for all `display` and `headline` roles. Its geometric yet warm curves mirror the fluidity of water. 
    - *Usage:* `display-lg` (3.5rem) should be used for hero statements with tight letter-spacing (-0.02em) to create a high-end editorial feel.
- **Body & Labels (Inter):** Inter is the workhorse for all functional text. It provides exceptional legibility at smaller scales.
    - *Usage:* `body-md` (0.875rem) for product descriptions, and `label-md` (0.75rem) for technical specifications.
- **Hierarchy as Identity:** Create "Vocal Contrast." Pair a large `headline-lg` title with a significantly smaller `label-md` all-caps subtitle to create an expensive, curated aesthetic.

---

## 4. Elevation & Depth
Depth in this system is atmospheric, not structural. We mimic the way light diffuses underwater.

- **The Layering Principle:** Stack your containers.
    - Level 0: `surface` (The seabed).
    - Level 1: `surface_container_low` (Sectioning).
    - Level 2: `surface_container_lowest` (Cards/Interaction elements).
- **Ambient Shadows:** Standard drop shadows are forbidden. When a floating state is required (e.g., a hovered card), use an extra-diffused shadow: `offset-y: 12px`, `blur: 32px`, and a color of `on_surface` at 5% opacity. This mimics natural ambient light.
- **The "Ghost Border" Fallback:** If accessibility requires a container edge, use a Ghost Border: `outline_variant` at 15% opacity. It should be felt, not seen.
- **Glassmorphism:** Use for persistent elements like the top navigation bar. This allows the vibrant imagery of the fish to bleed through as the user scrolls, maintaining a sense of immersion.

---

## 5. Components

### Buttons
- **Primary:** `primary` background, `on_primary` text. Use `lg` (0.5rem) corner radius. Add a subtle 2px inner-glow on the top edge for a "polished" effect.
- **Secondary:** `surface_container_high` background with `on_secondary_container` text. No border.

### Product Cards
- **Structure:** Use `surface_container_lowest` for the card body. 
- **Spacing:** `4` (1.4rem) internal padding. 
- **Constraint:** Forbid the use of divider lines within cards. Use `spacing-2` to separate title from price.

### Chips (Filters/Categories)
- Use `surface_container_high` for unselected states and `primary` for selected. 
- Roundedness: `full` (9999px) to contrast with the `lg` (8px) corners of cards and buttons.

### Inputs & Search
- Background: `surface_container_low`. 
- State: On focus, transition the background to `surface_container_lowest` and apply a Ghost Border of `primary` at 30% opacity.

### Featured Gallery (Custom Component)
- Instead of a standard grid, use an **Asymmetric Masonry Layout**. Some product images should take 2 columns, others 1, creating a rhythmic, "swimming" visual flow.

---

## 6. Do's and Don'ts

### Do:
- **Do** use large amounts of whitespace (Scale `12` to `20`) between major sections to let the design breathe.
- **Do** use high-quality, macro photography of aquatic life as the primary visual driver.
- **Do** align typography to a strict baseline, but allow images to "break" the container edges slightly to create depth.

### Don't:
- **Don't** use 100% black text. Always use `on_surface` (#191c1e) for a softer, more premium contrast.
- **Don't** use 1px solid borders to separate the header or footer. Use a background shift or a subtle backdrop blur.
- **Don't** use aggressive, fast animations. All transitions should be "Fluid" (ease-in-out, 300ms-500ms) to match the oceanic theme.
- **Don't** clutter the UI. If a piece of information isn't vital, hide it behind a hover state or progressive disclosure.