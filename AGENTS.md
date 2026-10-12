# Digital Garden Project

## Project Overview
A personal digital garden built from the ground up to cultivate thoughts, essays, notes, resources, and interconnected ideas over time.

## Core Technical Constraints
- **Strictly Vanilla**: HTML5 and vanilla CSS only.
- **Zero Dependencies**: No third-party packages, JavaScript frameworks, CSS libraries, build tools, or bundlers.
- **Longevity & Simplicity**: Semantic, clean markup and resilient, maintainable CSS designed to last without maintenance overhead.

---

## Design, Aesthetics & Feel (Referencing ashleyxiang.com)
- **Typographic System**:
  - **Primary Display & Headings**: `Haas Grot Disp Trial` (Neue Haas Grotesk Display Trial: 65 Medium, 55 Roman, 75 Bold), falling back to `Inter`, `-apple-system`, `sans-serif`.
    - Hero / Large Headings: `34px` / `32px` / `30px`, weight `500` (Medium), letter-spacing `-0.01em`, line-height `1.2em`.
    - Section Headings: `24px`, weight `500`, letter-spacing `0em`, line-height `1.5em`.
    - Card & Item Titles: `20px` / `18px`, weight `500`, letter-spacing `-0.01em`.
    - Body Text: `16px`, weight `400` ("Haas Grot Disp Trial 55 Roman" / `Inter`), letter-spacing `0.01em`, line-height `1.6em`.
  - **Monospace, Navigation & Badges**: `Geist Mono` (weights `400` and `500`, letter-spacing `0.03em`, line-height `1.3em`).
    - Navigation Items: `14px`, uppercase, `Geist Mono`.
    - Category / Status Pills: `11px` - `12px`, uppercase, `Geist Mono`, pill-shaped radius.
  - **Cursive Display Accent**: `Corinthia` (Google Fonts, weight `700`) for delicate signatures/flourishes.
- **Color Palette & Themes**:
  - *Base / Paper Canvas*: Dedicated off-white paper canvas (`#fafafa`).
  - *Inks*: Deep architectural slate ink (`#18181b`), crisp dark zinc, muted secondary gray (`#71717b`, `#57575e`).
  - *Dividers & Hairlines*: Single thin solid hairlines (`1px solid #e4e4e7`).
  - *Discipline Color System (Alphabetical)*:
    - `All`: `#0167ec` (Electric Blue)
    - `AI/Prototyping`: `#00aacd` (Bright Aqua)
    - `Communication Design`: `#8ed3f8` (Sky Blue)
    - `Fine Art`: `#72e682` (Spring Green)
    - `Interaction Design`: `#d6e46a` (Chartreuse Lime)
    - `Physical Computing`: `#f4da7c` (Warm Yellow)
    - `Product Design`: `#ff9830` (Vivid Peach Tangerine)
    - `Spatial Design`: `#f4603f` (Coral Vermilion)
    - `3D`: `#faa5dd` (Orchid Pink)
- **Atmosphere**: Modern, high-end Swiss product design paired with archival tactility. Clean lines, generous air, precise metadata, and intentional interactive feedback.
## Structure & Core Views

### 1. Project Purpose & Character
- **Role**: A modular **Design Archive & Digital Garden** component built to live seamlessly on Ashley's main website (`ashleyxiang.com`).
- **Design Philosophy**: Stripped-down, quiet, image-first, and distraction-free. No heavy headers, banners, or redundant badge soup—just pure visual work, simple title, and caption.

### 2. Header & Main Title
- **Archive Title**: Positioned cleanly above everything.
  - Text: `Design Archive`
  - Typography: `Haas Grot Disp Trial` (weight 500, size `40px`, color `#162B55`, letter-spacing `-0.02em`).

### 3. View Switcher & Filtering (Alphabetical Swatches + Segmented Icon Toggle)
- **Floating Inline Toolbar**: Positioned directly below the title and above the archive items. Disconnected border line removed completely so the toolbar breathes naturally.
- **Controls**: Category selectors sorted in alphabetical order (`All`, `AI/Prototyping`, `Communication Design`, `Fine Art`, `Interaction Design`, `Physical Computing`, `Product Design`, `Spatial Design`, `3D`).
  - Spacing: Generous spacing between categories (`gap: 1.35rem`).
  - Category Swatches: `11px × 11px` micro-rounded square swatches (`border-radius: 2px`).
- **Interactive States**:
  - **Hover**: The rounded colored square turns into an outlined square (`background-color: transparent !important`, retaining the 1.5px colored border).
  - **Clicked / Active**: The square remains an outlined square, plus an underline matching the exact color and thickness of the list view divider lines (`border-bottom: 0.5px solid rgba(228, 228, 231, 0.85)` / `1px solid rgba(228, 228, 231, 0.65)`) underlines both the square and title text.
- **Zero Dependencies**: Powered purely with semantic CSS (`:checked` / `:has()` and sibling selectors).

### 4. View 1: The "Lines" View (Minimal Editorial Index)
- **Reference**: Clean full-width staved rows (inspired by Portfr & Laboratorio Futuro references).
- **Row Columns & Spacing**:
  - `[Name]` (left, e.g. `Whatisyourwhy`)
  - `[Category / Tag]` (near middle, e.g. `AI/PROTOTYPING`)
  - `[Date]` (right side, right-aligned, e.g. `9/26`)
  - Generous vertical row padding: `1.15rem 0.6rem`.
  - Razor-thin hairline divider: `0.5px solid rgba(228, 228, 231, 0.85)` with fallback `1px solid rgba(228, 228, 231, 0.65)`.
- **Dynamic Tag-to-Dot Transformation**:
  - In unfiltered `All` view, the category text (`AI/PROTOTYPING`, `FINE ART`, etc.) is displayed.
  - When a user clicks a category at the top to filter, the text in the lines transforms into the solid chair-color dot/swatch for that category, eliminating redundant text.
- **Cursor-Follow Hover Preview**:
  - Floating preview card appears right at the cursor position and tracks cursor movement smoothly.
  - **Dynamic Aspect Ratio (Horizontal vs. Vertical)**: Automatically switches between landscape (`280px × 185px`) and portrait (`200px × 275px`) depending on the image's orientation to showcase more of the asset without horizontal cropping.
  - Corner radius: `4px`. Elevation shadow: `0 16px 42px rgba(0, 0, 0, 0.15)`.

### 4. View 2: The "Image-First Gallery" (Catalog View)
- **Reference**: Curated gallery reference (`WAS`, `media_1789400777859.jpg`) and Are.na board (`p.u.i. project 1`).
- **Dense Archival Multi-Column Grid**: 
  - Desktop: 8 columns across (`grid-template-columns: repeat(auto-fill, minmax(135px, 1fr))`, `gap: 1.15rem 1.15rem`).
  - Tablet: 4–6 columns (`minmax(120px, 1fr)`).
  - Mobile: 3–4 columns (`minmax(100px, 1fr)`).
  - Pinned Top Item: `Whatisyourwhy` pinned at index 0.
  - Chronological Order: Sorted descending with newest/latest projects at the top.
- **Thumbnail Dimensions & Aspect Ratio**: 
  - Square `1:1` media frames with `border-radius: 4px` (satisfying corner radius 4 requirement), subtle `1px solid #ebebeb` hairlines, and `margin-bottom: 0.35rem`. Grid view stays square.
  - **Video Performance (Hover Playback)**: Videos cue at first frame (`#t=0.001`, `preload="metadata"`) without autoplaying in the background. On hover, videos play smoothly; on mouse leave, they pause immediately, preventing GPU/CPU lag.
- **Minimal Metadata**: Strictly project title beneath each thumbnail in compact monospace:
  - **Title**: `11px`, `Geist Mono`, weight `500`, uppercase, letter-spacing `0.02em`.
  - **Hover Reveal Interaction**: By default, title text (`.item-meta`) is hidden (`opacity: 0; visibility: hidden`) while reserving compact negative white space (`min-height: 1.5em`) so there is zero layout shift. On hover, the title smoothly reveals (`opacity: 1; visibility: visible`). Rows sit closely together with just enough breathing room for the hover title.

### 5. Detail View: Reading Overlay / Slide Sheet
- Curatorial layout matching editorial standard:
  - **Top Row**: Project Title (e.g. `Numbers`) and Tag/Date (e.g. `COMMUNICATION DESIGN • 10/23`) inline on the left, and outline-free `✕` close button on the right, all sitting on the exact same horizontal line. On hover, reveals a crisp full square (`32px × 32px`, `#162B55` background with white icon). Keyboard `Escape` and backdrop clicks also close the overlay.
  - **Hero Media**: Framed hero asset directly below the top bar.
  - **Project Metadata**: Follows image in exact order: narrative description (if present), then `[TOOLS]` badge and tools value.
- **Multi-Asset Exhibition (Fitted Gallery)**:
  - Asset naming convention: Base filename ending in `1` designates the primary **hero asset** featured on the gallery grid and floating hover preview.
  - Secondary numbered assets (`2`, `3`, `4`, etc.) display inside the reading overlay's `Additional Project Assets` section.
  - Section header: Clean text `Additional Project Assets` with brackets (`[ ]`) and asset count (`(17)`) removed.
  - **Fitted Multi-Column Gallery**: Uses dynamic 2-column masonry flow (`columns: 2 340px`) where each image and video fits its own natural dimensions and aspect ratio (`height: auto; width: 100%`) without letterboxing, rigid vertical stretching, or iPhone screen cropping. Single assets expand to full width (`column-span: all`). On mobile, collapses smoothly into a single column.

### 6. Categories & Tags (8 Disciplines)
- `AI/Prototyping`
- `Fine Art`
- `3D`
- `Spatial Design`
- `Product Design`
- `Interaction Design`
- `Communication Design`
- `Physical Computing`
- `All`

---

## Inspirations & Reference Links
- **Pinterest Inspo Board**: [`https://www.pinterest.com/asherisoft/inspo/`](https://www.pinterest.com/asherisoft/inspo/)
  - *Key motifs*: Abstract graphic scores, Claude Heath's *Quest (After John Cage)*, process-based drawings, architectural/graphic diagrams, Savee-curated editorial layouts, book typography, poem collage and botanical/organic textures.
- **Are.na Channel**: [`https://www.are.na/ashley-xiang/p-u-i-project-1`](https://www.are.na/ashley-xiang/p-u-i-project-1)
  - *Core Concepts (from Step 1–3 inventories)*:
    - Themes: Nature, negative space, interactive play, green accents, background story/context.
    - Format inspirations: *Cabbages* digital garden, *Barnsworth Burning* (panoramic view of collection at once), *Chia Amisola* (browser ambience & indices), *door.link*, *Portfr®* Framer template.
    - Media & Interaction: High contrast videos/GIFs as core media, generative p5.js/TouchDesigner motion, tactile grids, deliberate microinteractions.
- **Visual References**:
  - Laboratorio Futuro (`media_1789400777159.jpg`): Horizontal staved project index with specs and image sequences.
  - WAS Studio Gallery (`media_1789400777859.jpg`): Pure image-first multi-column grid with bracket filters (`ALL [ ]`, `GRID [ ]`) and clean two-line title/caption.
  - Uyen Nguyen Works: [`https://uyen-nguyen.com/works/`](https://uyen-nguyen.com/works/) — Tactile editorial thumbnails, refined typography, book/print materiality.
  - Fahsai Intharak: [`https://fahsai.in/`](https://fahsai.in/) — Spatial sensitivity, playful catalog numbering, bespoke typographic details.

