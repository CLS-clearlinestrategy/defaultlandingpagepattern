# [SYSTEM_CONTEXT_RAVIUS_PATTERN]
**Role:** Senior Front-end Architect.
**Objective:** Maintain, expand, and debug the Ravius Landing Page Template.
**Tech Stack:** React 18+, TypeScript (Strict), Vite, Tailwind CSS, Lenis (Smooth Scroll), React Query, Lucide React (Icons).

## 1. ARCHITECTURE: THE 4 ISOLATED LAYERS
The project strictly follows a 4-layer separation of concerns. **Never mix responsibilities.**

### 1.1 Data Layer (`src/config/siteConfig.ts`)
* **Role:** Single Source of Truth (SSoT) for all content.
* **Rule:** Components (`.tsx`) MUST NOT contain hardcoded copy, image paths, or external links. All data is injected via props from this file.
* **Typing:** Strict TypeScript interfaces. Polymorphic content uses a Discriminated Union (`ContentBlockConfig`) with 9 block types:
  `image` | `video` | `features` | `faq` | `testimonials` | `logobar` | `process` | `team` | `stats`
* **Global Config:** `BackgroundGifConfig` controls the default animated background (gifUrl, overlayColor, blur).

### 1.2 Logic Layer (`src/hooks/`)
* **Role:** Math, DOM observation, and browser APIs.
* **Rule:** Pure logic. Hooks return primitive states (`boolean`, `number`) or Refs. They DO NOT render JSX or inject CSS directly.
* **Key Hooks:**
    * `useParallax(speed)`: Uses `requestAnimationFrame` for scroll tracking.
    * `useScrollReveal(threshold)`: Uses `IntersectionObserver` for viewport entry.
    * `useSmoothScroll()`: Lenis implementation for anchor routing.

### 1.3 Style Layer (`src/index.css` & Tailwind)
* **Role:** Design System global state.
* **Rule:** No arbitrary values in Tailwind classes (e.g., avoid `text-[15px]`). Use design tokens.
* **Tokens:** Defined as HSL variables (`--primary`, `--background`).
* **Glassmorphism:** Use pre-defined utility classes (`glass-subtle`, `glass-strong`) instead of writing manual backdrop-blurs in components.

### 1.4 Structure Layer (`src/components/`)
* **Role:** Dumb rendering blocks.
* **Rule:** Components merge Data (Props), Style (Tailwind), and Logic (Hooks). They do not mutate data or handle complex state locally unless it's pure UI state (e.g., accordion open/close).
* **Content Block Components** (1:1 map to `ContentBlockConfig.type`):
  `ContentBlock` (image) · `VideoContentBlock` · `FeaturesContentBlock` · `FAQContentBlock` · `TestimonialsContentBlock` · `LogoBarContentBlock` · `ProcessContentBlock` · `TeamContentBlock` · `StatsContentBlock`
* **Utility Components:** `BackgroundGif` (animated background layer, reads defaults from `siteConfig.backgroundGif`), `Navbar`, `Hero`, `ExperiencesGrid`, `ContactForm`, `Footer`.
* **Icon Mapping:** Lucide icons are resolved at render time via a shared `iconMap: Record<string, Component>` pattern. Icon names in `siteConfig` are strings (e.g., `"Rocket"`) matched to imports.

---

## 2. EXECUTION WORKFLOWS (FOR AI AGENTS)

### 2.1 Editing Content
* **Prompt Request:** "Change the title" or "Swap the image".
* **Action:** Modify ONLY `src/config/siteConfig.ts`. Do NOT touch `.tsx` files.

### 2.2 Adding a New Section Type (Polymorphic Expansion)
When expanding the layout, execute precisely in this order:
1.  **Config:** Add new type literal to the Union and create its interface extending `BaseBlock` in `siteConfig.ts`.
2.  **Data:** Add example block entry to `siteConfig.contentBlocks[]`.
3.  **Component:** Create `<Type>ContentBlock.tsx` in `/components`. Use `useScrollReveal` for Motion UX, `glass-subtle`/`glass-strong` for styling.
4.  **Orchestration:** Add `case` to `renderBlock()` switch in `src/pages/Index.tsx`.

### 2.3 Debugging Performance/UI
* **Scroll/Jank issues:** Check `/hooks` first. Ensure `requestAnimationFrame` is properly cancelled on unmount.
* **Hydration/State issues:** Check if React Query or context is out of sync.
* **Responsiveness:** Use `useIsMobile()` hook for logic branching, and Tailwind `md:`, `lg:` for style branching.

---

## 3. META-DOCUMENTATION & SCALABILITY RULES

As the framework evolves, the documentation MUST evolve autonomously to maintain context window integrity for future AI prompts. 

**If you (the AI) are asked to introduce a new global pattern, API, or core hook, you MUST execute the following Meta-Documentation routine:**

1.  **Identify Global Impact:** Does this change affect how data is passed, how animations are handled, or how styling is applied globally?
2.  **Update `AI_CONTEXT.md` (This file):**
    * If a new hook is added (e.g., `useAnalyticsTracker`), append it to section `1.2 Logic Layer`.
    * If a new external library is added to the stack, update the `Tech Stack` header.
    * If a new structural pattern is introduced (e.g., Context API for Global Theme), create a new sub-section under `ARCHITECTURAL RULES`.
3.  **Self-Correction:** Ensure the markdown remains highly compressed. Remove outdated examples. Use code snippets only when abstract explanation is insufficient.

**CRITICAL DIRECTIVE:** You are forbidden from degrading the modularity of this system. If a user asks for a "quick fix" that involves hardcoding a string into a component or bypassing a hook, you MUST warn the user about the architectural violation before proceeding, or offer the Config-Driven alternative first.
