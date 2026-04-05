# API Keys Registry

Track which external services are connected to your system.

## Connected Services

| Service | Purpose | Connected | Status |
|---------|---------|-----------|--------|
| Circle | קריאת פוסטים, תגובות, חברים, ופרסום בקהילה "בוס ליידי" | 2026-03-29 | Active |

---

## Service Details

### Circle

**Connected:** 2026-03-29
**Purpose:** גישה לקהילת "בוס ליידי" לצורך ניתוח אינגייג'מנט ובניית Case Studies לקורס
**Used by:** זיוה

**Capabilities:**
- קריאת פוסטים ותגובות
- נתוני חברים (פעילות, מעורבות)
- פרסום פוסטים (עם אישור ידני בלבד)

**Limitations:**
- 100 בקשות לדקה (rate limit)
- פרסום דורש אישור רעות לפני ביצוע

**Setup Notes:**
- API key שמור ב-Claude Code Environment Variables תחת `CIRCLE_API_KEY`
- ה-Community ID מתועד ב-`T-tools/Tools/T-circle-api.md`

---

### [Service Name]

**Connected:** [Date]
**Purpose:** [What you use it for]
**Used by:** [Which agents/workflows use it]

**Capabilities:**
- [What it can do]

**Limitations:**
- [What it can't do]

**Setup Notes:**
- [Any special configuration]

---

## CRITICAL: Security

**NEVER store actual API keys in this file.**

This file only tracks WHICH services are connected and their capabilities.

Keep your actual keys in:
- Claude Code settings
- Environment variables
- Your system's secure storage

---

### Example Entry

| Service | Purpose | Connected | Status |
|---------|---------|-----------|--------|
| Google Gemini | Image generation, visual content | 2026-01-15 | Active |

### Google Gemini

**Connected:** 2026-01-15
**Purpose:** Generate images and visual content for social posts, newsletters, and presentations
**Used by:** Copywriter Agent (when visual content is requested)

**Capabilities:**
- Generate images from text prompts
- Multiple styles (photorealistic, illustration, abstract)
- Multiple sizes and aspect ratios

**Limitations:**
- No text in images (usually)
- May need multiple attempts for specific styles
- Rate limits apply

**Setup Notes:**
- API key set in Claude Code MCP settings
- Use Gemini 2.0 Flash for best results
- Keep prompts specific for better outputs

---

## How to Add a New Service

1. Use `T-tools/02-prompts/BONUS/08-connect-api-keys.md`
2. Follow the setup instructions for your service
3. Update this table with the new service

---

> **© Tom Even**
> Workshops & future dates: [www.getagents.today](https://www.getagents.today)
> Newsletter: [www.agentsandme.com](https://www.agentsandme.com)
