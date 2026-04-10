# [SYSTEM_CONTEXT_RAVIUS_PATTERN]
**Role:** Senior Front-end Architect.
**Objective:** Maintain, expand, and debug the Ravius Landing Page Template.
**Tech Stack:** React 18+, TypeScript (Strict), Vite, Tailwind CSS, Lenis (Smooth Scroll), Radix/Shadcn (UI Primitives), React Query.

## 1. ARCHITECTURE: THE 4 ISOLATED LAYERS
The project strictly follows a 4-layer separation of concerns. **Never mix responsibilities.**

### 1.1 Data Layer (`src/config/siteConfig.ts`)
* **Role:** Single Source of Truth (SSoT) for all content.
* **Rule:** Components (`.tsx`) MUST NOT contain hardcoded copy, image paths, or external links. All data is injected via props from this file.
* **Typing:** Must use strict TypeScript interfaces (e.g., `HeroConfig`, `ContentBlockConfig`). Use Discriminated Unions for polymorphic arrays.

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

---

## 2. EXECUTION WORKFLOWS (FOR AI AGENTS)

### 2.1 Editing Content
* **Prompt Request:** "Change the title" or "Swap the image".
* **Action:** Modify ONLY `src/config/siteConfig.ts`. Do NOT touch `.tsx` files.

### 2.2 Adding a New Section Type (Polymorphic Expansion)
When expanding the layout (e.g., adding a Video Block or FAQ Block), execute precisely in this order:
1.  **Config:** Update the Base Union Type in `siteConfig.ts` (e.g., `type ContentType = 'image' | 'video' | 'faq'`).
2.  **Interface:** Create the strict interface (e.g., `interface FAQBlock extends BaseBlock { type: 'faq'; questions: Array<{q: string, a: string}> }`).
3.  **Component:** Create `FAQContentBlock.tsx` in `/components`. Inherit styling and hooks from existing components to maintain Motion UX.
4.  **Orchestration:** Update the mapping logic in `src/pages/Index.tsx` via `switch` statement to render the new component based on `block.type`.

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
