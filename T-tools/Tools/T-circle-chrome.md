# Tool: Circle — Chrome Automation

## מה זה עושה

מאפשר לזיוה לגשת ל-`ymd-club.circle.so` דרך Chrome שכבר מחובר,
ללא API ולא תשלום נוסף.

---

## דרישות

- Chrome פתוח ומחובר לסירקל (מחוברת כמנהלת)
- תוסף Claude in Chrome פעיל

---

## פקודות זמינות

### שלב 0 — פתיחת טאב

```
navigate → https://ymd-club.circle.so/feed
```

---

### משימה 1: שליפת פוסטים עם הכי הרבה אינגייג'מנט

```
navigate → https://ymd-club.circle.so/feed
get_page_text → חלצי את כל הפוסטים הגלויים (כותרת, מספר לייקים, מספר תגובות)
scroll down → המשיכי לטעון עוד פוסטים
חזרי 3 פעמים עד שיש לך לפחות 20 פוסטים
```

**פלט רצוי:**
```markdown
| כותרת | לייקים | תגובות | Space |
|--------|--------|---------|-------|
| ...    | ...    | ...     | ...   |
```

---

### משימה 2: קריאת פוסט ספציפי + תגובות

```
navigate → URL של הפוסט הספציפי
get_page_text → קראי את כל התוכן כולל תגובות
```

---

### משימה 3: נתוני חברים (מלוח האדמין)

```
navigate → https://ymd-club.circle.so/manage/members
get_page_text → חלצי: שם, תאריך הצטרפות, פעילות אחרונה
```

> טיפ: לחצי על "Sort by activity" לפני השליפה

---

### משימה 4: ניתוח Space ספציפי ("בוס ליידי")

Spaces של "בוס ליידי" (slugs מאומתים):

| Space | URL |
|-------|-----|
| ספוטלייט | https://ymd-club.circle.so/c/475ec0/ |
| כלים וטיפים ליצירת תוכן | https://ymd-club.circle.so/c/037471/ |
| שיעור שבועי | https://ymd-club.circle.so/c/f966e4/ |
| שיתופים והתייעצויות | https://ymd-club.circle.so/c/db60b4/ |

```
navigate → https://ymd-club.circle.so/c/f966e4/
get_page_text → כל השיעורים השבועיים
```

---

### משימה 5: פרסום פוסט (דורש אישור ידני)

```
STOP — לפני הרצה, הצגי את הטקסט לרעות לאישור
```

אחרי אישור:
```
navigate → https://ymd-club.circle.so/feed
find → כפתור "New Post" / "פוסט חדש"
fill → כותרת + גוף הפוסט
STOP → "אני עומדת ללחוץ פרסם. את מאשרת?"
click → פרסם
```

---

## זרימת עבודה — דוח אינגייג'מנט שבועי

```
1. navigate → /feed (מיון: Latest)
2. get_page_text → שלוף 20 פוסטים אחרונים
3. navigate → /feed (מיון: Top / Most Liked)
4. get_page_text → שלוף 10 פוסטים מובילים
5. נתח: מה הדפוס בין הפוסטים שעובדים?
6. navigate → /manage/members → מי הכי פעיל השבוע?
7. כתוב דוח לפי הפורמט ב-T-circle-api.md
8. שמור ב-O-output/circle-weekly-[תאריך].md
```

---

## כללים קריטיים לזיוה

- **קריאה** — חופשית, בכל עת
- **פרסום** — אסור בלי אישור מפורש של רעות בצ'אט
- **נתוני חברים** — לניתוח פנימי בלבד, לא לשיתוף
- **NO LONG DASHES (—)** — גם בתוכן שנפרסם לסירקל
