# Canva Graphics Skill — @emergencypetvet

**מי משתמש בזה:** פלישיה
**מתי:** לכל פוסט, כל יום, ללא יוצא מן הכלל

---

## RULE #1 — CAROUSEL. ALWAYS.

Every post is a **carousel** — multiple slides, not one image.
A single image is never acceptable as a finished post.

**Minimum slides per post:**
| Post Type | Slides | Structure |
|-----------|--------|-----------|
| Clinical Pearl | 4 slides | Cover + 3 content slides |
| Culture/Mindset | 4 slides | Cover + 3 content slides |
| Myth or Fact | **ALWAYS 2 pages** | Page 1: Cover with question + Myth/Fact buttons + image. Page 2: The Fact + The Pro-Tip |
| Data & Stats | 4 slides | Cover stat + Context + Why it matters + Takeaway |
| Pharmacology | 5 slides | Cover + Mechanism + Dosing + Clinical tip + Takeaway |
| Diagnostics | 4 slides | Cover + Finding + Interpretation + Action |

---

## RULE #2 — CLEAR ALL PLACEHOLDER TEXT FIRST

Before writing a single word of new content:

1. Use `get-design-content` on the design to see ALL text elements.
2. Read every text field on every page.
3. Replace EVERY piece of placeholder/example text — even if it looks like part of the design.
4. If a text box says anything like "Add your text here", "Example", "Title", "Description", or has any dummy content — it must be replaced.
5. After replacing: use `get-design-content` again to verify no placeholder text remains.

**Never assume a text field is decorative. If it has text — replace it.**

---

## RULE #3 — RELEVANT IMAGES ON EVERY SLIDE

Every slide that has a visual area (image placeholder, background, illustration spot) must have a relevant image.

**What counts as relevant:**
- Procedure being discussed: intubation, FAST exam, catheter placement, IO access, CPR
- Animal relevant to the case: dog, cat, specific breed if relevant
- Clinical setting: ER table, monitoring equipment, ICU
- Anatomical area being discussed

**How to add images:**
- Use `get-assets` to search Canva's library for relevant images
- Search terms: `"veterinary"`, `"emergency vet"`, `"dog intubation"`, `"cat ER"`, `"IV catheter"`, `"POCUS ultrasound"`, `"animal hospital"`, etc.
- If Canva library doesn't have the right image: use `upload-asset-from-url` with a royalty-free source (Unsplash, Pexels)
- Place image in every slide that has a visual area

**Never leave an image placeholder empty or filled with the template's stock example.**

---

## CANVA WORKFLOW — STEP BY STEP

### For Clinical Pearl, Culture, Data & Stats, Pharmacology, Diagnostics:

```
Step 1: start-editing-transaction on the correct template ID
Step 2: get-design-content — read ALL text and image elements on ALL pages
Step 3: perform-editing-operations:
   a. Replace ALL text placeholders with actual content
   b. Add relevant image to every visual slot on every page
   c. Ensure number of pages matches minimum slide count
   d. If more slides needed: duplicate a content page and edit
Step 4: get-design-content again — verify no placeholder text remains
Step 5: commit-editing-transaction
```

### For Myth or Fact (ALWAYS 2 pages, use existing template):

```
Step 1: start-editing-transaction on DAHAMVKiw9o
        → This is the permanent Myth or Fact template. Always use this exact design.
Step 2: get-design-content — read ALL text and image elements on BOTH pages
Step 3: perform-editing-operations:
   a. Page 1: Replace myth question text. Replace image with relevant cat/dog/procedure photo.
   b. Page 2: Replace The Fact body text. Replace The Pro-Tip body text.
   c. Never change the labels "The Fact:" and "The Pro-Tip:" — only the body text below them.
   d. Never change "myth or fact", "Myth", "Fact", "@emergencypetvet" — these stay always.
Step 4: get-design-content — verify all placeholder text is replaced
Step 5: commit-editing-transaction
```

---

## Template IDs

| Post Type | Template ID | Notes |
|-----------|------------|-------|
| Clinical Pearl | DAHFkctk5ic | Edit directly |
| Culture/Mindset | DAHFkTXf698 | Edit directly |
| Myth or Fact | DAHAMVKiw9o | DUPLICATE FIRST, never edit original |
| Data & Stats | DAHFkR5-XAo | Edit directly |

---

## QUALITY CHECK BEFORE COMMIT

Run through this list before every `commit-editing-transaction`:

- [ ] Is it a carousel? (more than 1 slide?)
- [ ] Does it meet the minimum slide count for this post type?
- [ ] Is ALL placeholder text replaced?
- [ ] Does every slide with a visual area have a relevant image?
- [ ] Does the cover slide have a strong hook text?
- [ ] Is the last slide a clear takeaway or CTA?

If any checkbox is unchecked — do not commit. Fix first.

---

## Common Mistakes — Never Do These

- Committing after editing only slide 1 and leaving other slides with placeholder content
- Using the Myth or Fact template without duplicating first
- Leaving any text that was in the original template unchanged
- Submitting a single-image post as the final output
- Using generic stock photos (people smiling at camera) instead of clinical/veterinary images
- Leaving image placeholders empty

---

*Brianna's audience is ER vets and vet techs. They will immediately notice a stock photo of a golden retriever when the post is about jugular catheter placement. Every image must earn its place.*
