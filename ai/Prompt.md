## 🎯 OBJECTIVE
Introduce a reusable `SplitText` animation component powered by GSAP (`gsap`, `@gsap/react`, `ScrollTrigger`, `SplitText`) and integrate it into the system WITHOUT breaking architectural constraints.

---

## ⚠️ HARD CONSTRAINTS (NON-NEGOTIABLE)

1. NEVER hardcode content inside components.
2. ALL text must come from `siteConfig.ts` (Data Layer).
3. DO NOT mix logic inside sections — logic must remain inside hooks or encapsulated primitives.
4. ALL animations must be encapsulated in reusable components inside:
   `src/components/core/`
5. DO NOT directly use GSAP inside `sections/`.

---

## 🧩 IMPLEMENTATION PLAN

### 1. Dependency Installation
Use:
```

bun add gsap @gsap/react

```

---

### 2. Core Component Creation

Create:
```

src/components/core/SplitText.tsx

```

This component:
- Encapsulates ALL GSAP logic
- Uses:
  - `gsap`
  - `ScrollTrigger`
  - `SplitText` plugin
  - `useGSAP`
- Handles:
  - font loading sync
  - animation lifecycle cleanup
  - scroll-triggered animation
- Returns ONLY JSX (no external side effects)

It MUST:
- Be GPU-optimized (`will-change`, `force3D`)
- Avoid memory leaks (kill ScrollTriggers on unmount)
- Support polymorphic props

---

### 3. API DESIGN (STRICT)

The component must expose:

```

SplitTextProps {
text: string;
className?: string;
delay?: number;
duration?: number;
ease?: string;
splitType?: 'chars' | 'words' | 'lines' | 'words, chars';
from?: gsap.TweenVars;
to?: gsap.TweenVars;
threshold?: number;
rootMargin?: string;
tag?: semantic HTML tag;
textAlign?: CSS textAlign;
onLetterAnimationComplete?: () => void;
}

```

---

### 4. Architectural Positioning

This component is classified as:

→ `core primitive (visual abstraction)`

Therefore:
- It MAY contain animation logic
- It MUST NOT fetch or own content
- It MUST be reusable across all sections

---

### 5. Usage Rules (CRITICAL)

Inside `sections/`:

✅ Allowed:
```

<SplitText text={config.title} />
```

❌ Forbidden:

```
<SplitText text="Hardcoded text" />
```

---

### 6. Motion System Integration

Define this as a NEW animation primitive alongside:

* `RevealBlock` → entrance animation (opacity + translate)
* `ParallaxLayer` → depth
* `SplitText` → **typography animation**

---

### 7. Performance Requirements

* Use `requestAnimationFrame` internally via GSAP
* Use `ScrollTrigger` with:

  * `once: true`
  * `fastScrollEnd: true`
* Prevent re-animation via ref flags
* Ensure cleanup:

  * `ScrollTrigger.kill()`
  * `SplitText.revert()`

---

### 8. Example Usage

```
<SplitText
  text={hero.title}
  className="text-4xl md:text-6xl font-bold"
  delay={50}
  duration={1.25}
  ease="power3.out"
  splitType="chars"
  from={{ opacity: 0, y: 40 }}
  to={{ opacity: 1, y: 0 }}
/>
```

---

### 9. META-DOCUMENTATION UPDATE (MANDATORY)

Update `BASE-CONTEXT.md`:

#### Add to Tech Stack:

* GSAP
* @gsap/react

#### Add to Structure Layer (`core/`):

* `SplitText`: GSAP-powered typography animation primitive

#### Add to Workflows → Motion:

* Use `SplitText` for animated headings instead of manual text animation

---

### 10. VALIDATION CHECKLIST

Before finishing:

* [ ] No GSAP usage outside `core/`
* [ ] No hardcoded text
* [ ] Cleanup functions implemented
* [ ] Component fully typed (strict TS)
* [ ] Matches Ravius motion system
* [ ] Documentation updated

---

## 🧠 EXPECTED OUTPUT

* Full `SplitText.tsx` implementation
* Updated `BASE-CONTEXT.md`
* Example integration inside a section
* No architectural violations


Code base
``` typescript
import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText as GSAPSplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP);

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string | ((t: number) => number);
  splitType?: 'chars' | 'words' | 'lines' | 'words, chars';
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  textAlign?: React.CSSProperties['textAlign'];
  onLetterAnimationComplete?: () => void;
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  delay = 50,
  duration = 1.25,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  tag = 'p',
  textAlign = 'center',
  onLetterAnimationComplete
}) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const animationCompletedRef = useRef(false);
  const onCompleteRef = useRef(onLetterAnimationComplete);
  const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);

  // Keep callback ref updated
  useEffect(() => {
    onCompleteRef.current = onLetterAnimationComplete;
  }, [onLetterAnimationComplete]);

  useEffect(() => {
    if (document.fonts.status === 'loaded') {
      setFontsLoaded(true);
    } else {
      document.fonts.ready.then(() => {
        setFontsLoaded(true);
      });
    }
  }, []);

  useGSAP(
    () => {
      if (!ref.current || !text || !fontsLoaded) return;
      // Prevent re-animation if already completed
      if (animationCompletedRef.current) return;
      const el = ref.current as HTMLElement & {
        _rbsplitInstance?: GSAPSplitText;
      };

      if (el._rbsplitInstance) {
        try {
          el._rbsplitInstance.revert();
        } catch (_) {}
        el._rbsplitInstance = undefined;
      }

      const startPct = (1 - threshold) * 100;
      const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
      const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
      const marginUnit = marginMatch ? marginMatch[2] || 'px' : 'px';
      const sign =
        marginValue === 0
          ? ''
          : marginValue < 0
            ? `-=${Math.abs(marginValue)}${marginUnit}`
            : `+=${marginValue}${marginUnit}`;
      const start = `top ${startPct}%${sign}`;
      let targets: Element[] = [];
      const assignTargets = (self: GSAPSplitText) => {
        if (splitType.includes('chars') && (self as GSAPSplitText).chars?.length)
          targets = (self as GSAPSplitText).chars;
        if (!targets.length && splitType.includes('words') && self.words.length) targets = self.words;
        if (!targets.length && splitType.includes('lines') && self.lines.length) targets = self.lines;
        if (!targets.length) targets = self.chars || self.words || self.lines;
      };
      const splitInstance = new GSAPSplitText(el, {
        type: splitType,
        smartWrap: true,
        autoSplit: splitType === 'lines',
        linesClass: 'split-line',
        wordsClass: 'split-word',
        charsClass: 'split-char',
        reduceWhiteSpace: false,
        onSplit: (self: GSAPSplitText) => {
          assignTargets(self);
          return gsap.fromTo(
            targets,
            { ...from },
            {
              ...to,
              duration,
              ease,
              stagger: delay / 1000,
              scrollTrigger: {
                trigger: el,
                start,
                once: true,
                fastScrollEnd: true,
                anticipatePin: 0.4
              },
              onComplete: () => {
                animationCompletedRef.current = true;
                onCompleteRef.current?.();
              },
              willChange: 'transform, opacity',
              force3D: true
            }
          );
        }
      });
      el._rbsplitInstance = splitInstance;
      return () => {
        ScrollTrigger.getAll().forEach(st => {
          if (st.trigger === el) st.kill();
        });
        try {
          splitInstance.revert();
        } catch (_) {}
        el._rbsplitInstance = undefined;
      };
    },
    {
      dependencies: [
        text,
        delay,
        duration,
        ease,
        splitType,
        JSON.stringify(from),
        JSON.stringify(to),
        threshold,
        rootMargin,
        fontsLoaded
      ],
      scope: ref
    }
  );

  const renderTag = () => {
    const style: React.CSSProperties = {
      textAlign,
      wordWrap: 'break-word',
      willChange: 'transform, opacity'
    };
    const classes = `split-parent overflow-hidden inline-block whitespace-normal ${className}`;
    const Tag = (tag || 'p') as React.ElementType;

    return (
      <Tag ref={ref} style={style} className={classes}>
        {text}
      </Tag>
    );
  };

  return renderTag();
};

export default SplitText;

```

