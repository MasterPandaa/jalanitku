---
name: retro-neobrutalism
description: "[Retro Neo-Brutalism & Anti-Monotony UI System] Enforces high-craft, non-conformist retro UI design inspired by 90s OS, brutalist web posters, bold physical stamps, tactile micro-interactions, and heavy-stroke Lucide vectors. Strictly eliminates boring SaaS monotony and AI slop."
allowed-tools: read_file, edit_file, write_file
tags: [frontend, design-system, neo-brutalism, retro-ui, anti-slop, lucide-icons]
---

# Retro Neo-Brutalism & Anti-Monotony Design System

> "Not Every Website Has To Look The Same!"
> Inspired by physical tactile machines, 90s desktop operating systems, street poster art, and brutalist web architecture.

---

## 1. Core Visual Tenets

### A. The Anti-Monotony Doctrine
- **No Sterile SaaS Templates**: Ban soft blur shadows (`box-shadow: 0 4px 6px rgba(...)`), faint 1px gray borders, washed-out pastel pills, and generic card grids.
- **Physicality & Tactile Depth**: Every interactive element must feel like an object made of thick cardstock, plastic chassis, or mechanical tactile keys that can be physically pressed.
- **Deliberate Playful Imperfections**: Subtle rotations (`-rotate-1`, `rotate-2`, `-rotate-3`) on stickers, stamps, and alert ribbons that spring back on hover (`hover:rotate-0 hover:scale-105`).

---

## 2. Iconography Standards: Zero Emojis, 100% Vector Stamps

### A. Strict Prohibition of Raw Platform Emojis
Raw platform emojis (`⚠️`, `💡`, `🎉`, `📦`, `💼`, `📊`, `🎯`, `➔`, `☰`, `✕`) are **strictly prohibited** in UI components:
- They render unpredictably across OSs (glossy Apple 3D, Segoe UI Windows gradients, flat Android Noto).
- They break the 2D flat ink outline aesthetic of Neo-Brutalism.

### B. The 3 Canonical Neo-Brutalist Icon Rules
1. **Heavy Stroke Invariant**: Every Lucide icon must use `strokeWidth={2.5}` or `strokeWidth={3}` with `stroke="currentColor"` or `stroke="#0A0A0A"`.
2. **Stamp Badge Enclosure (Feature Anchors & Badges)**:
   ```tsx
   <div className="w-10 h-10 border-2 border-ink bg-accent-yellow shadow-[2px_2px_0_#0A0A0A] flex items-center justify-center text-ink flex-none transition-transform duration-150 group-hover:-rotate-3 group-hover:scale-105">
     <Lightbulb className="w-5 h-5 stroke-[2.5]" />
   </div>
   ```
3. **Inline Micro-Actions (Buttons & Drawer Toggles)**:
   ```tsx
   <Button variant="primary">
     <span>Mulai Tes</span>
     <ArrowRight className="w-4 h-4 stroke-[2.5]" />
   </Button>
   ```

---

## 3. Kinetic & Tactile Hierarchy

### A. Mechanical Button Physics
- **Default**: `border-3 md:border-4 border-ink shadow-nb-md` (`6px 6px 0 #0A0A0A`).
- **Hover**: `hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-nb-hover` (`8px 8px 0 #0A0A0A`).
- **Active / Pressed**: `active:translate-x-1 active:translate-y-1 active:shadow-none` (gives the authentic sensation of a mechanical key being clicked down).

### B. Card Elevations & Containers
- `shadow-nb-sm` (`3px 3px 0 #0A0A0A`): Sub-items, tags, segmented switchers.
- `shadow-nb-md` (`6px 6px 0 #0A0A0A`): Standard interactive cards.
- `shadow-nb-lg` (`10px 10px 0 #0A0A0A`): Hero features, modal dialogs, identity cards.
