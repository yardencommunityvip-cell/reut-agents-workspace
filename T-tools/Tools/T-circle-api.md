# Tool: Circle API

## מה זה עושה

מאפשר לזיוה לגשת לקהילת "בוס ליידי" בסירקל בצורה ישירה:
קריאת פוסטים, תגובות, נתוני חברים, ופרסום תוכן (עם אישור ידני).

---

## הגדרה חד-פעמית

### שלב 1 — קבלת API Key
1. כניסה לסירקל: Settings > API
2. יצירת API Token חדש
3. שמירה בהגדרות Claude Code:

```
Claude Code > Settings > Environment Variables
שם: CIRCLE_API_KEY
ערך: [ה-Token שלך]
```

### שלב 2 — מציאת Community ID
```bash
curl -s -H "Authorization: Token $CIRCLE_API_KEY" \
  "https://app.circle.so/api/v1/communities" | jq '.[0].id'
```
שמרי את ה-ID בקובץ הזה תחת "הגדרות הקהילה" למטה.

---

## הגדרות הקהילה

```
COMMUNITY_ID: [למלא אחרי שלב 2]
COMMUNITY_NAME: בוס ליידי
```

---

## פקודות זמינות

### קריאת פוסטים (ניתוח אינגייג'מנט)

```bash
# 20 הפוסטים האחרונים
curl -s -H "Authorization: Token $CIRCLE_API_KEY" \
  "https://app.circle.so/api/v1/posts?community_id=COMMUNITY_ID&per_page=20&sort=latest" \
  | jq '[.[] | {id, name, likes_count, comments_count, created_at, space_name: .space.name}]'
```

```bash
# הפוסטים עם הכי הרבה אינגייג'מנט
curl -s -H "Authorization: Token $CIRCLE_API_KEY" \
  "https://app.circle.so/api/v1/posts?community_id=COMMUNITY_ID&per_page=50&sort=likes_count" \
  | jq '[.[] | {id, name, likes_count, comments_count, space_name: .space.name}] | sort_by(-.likes_count) | .[0:10]'
```

```bash
# קריאת תגובות על פוסט ספציפי
curl -s -H "Authorization: Token $CIRCLE_API_KEY" \
  "https://app.circle.so/api/v1/posts/POST_ID" \
  | jq '{title: .name, body: .body, comments: .comments}'
```

### נתוני חברים

```bash
# רשימת כל החברים הפעילים
curl -s -H "Authorization: Token $CIRCLE_API_KEY" \
  "https://app.circle.so/api/v1/community_members?community_id=COMMUNITY_ID&per_page=100" \
  | jq '[.[] | {name, email, last_seen_at, posts_count, comments_count}]'
```

```bash
# החברים הכי פעילים (לפי פוסטים)
curl -s -H "Authorization: Token $CIRCLE_API_KEY" \
  "https://app.circle.so/api/v1/community_members?community_id=COMMUNITY_ID&per_page=100&sort=posts_count" \
  | jq '[.[] | {name, posts_count, comments_count}] | sort_by(-.posts_count) | .[0:10]'
```

### פרסום פוסט (דורש אישור ידני לפני ביצוע)

```bash
# STOP — לפני הרצת הפקודה הזו, הראי את הטקסט לרעות לאישור
curl -s -X POST \
  -H "Authorization: Token $CIRCLE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "community_id": COMMUNITY_ID,
    "space_id": SPACE_ID,
    "name": "כותרת הפוסט",
    "body": "תוכן הפוסט"
  }' \
  "https://app.circle.so/api/v1/posts"
```

### רשימת Spaces (מרחבים בקהילה)

```bash
curl -s -H "Authorization: Token $CIRCLE_API_KEY" \
  "https://app.circle.so/api/v1/spaces?community_id=COMMUNITY_ID" \
  | jq '[.[] | {id, name, slug}]'
```

---

## כללי שימוש לזיוה

1. **קריאה** — חופשית, בצעי בכל עת לצורך ניתוח
2. **פרסום** — STOP לפני כל פעולת כתיבה. הציגי את הטקסט לרעות לאישור
3. **נתוני חברים** — לניתוח בלבד, לא לשיתוף חיצוני
4. **Rate Limit** — עד 100 בקשות לדקה

---

## פלט מומלץ לדוח ניתוח שבועי

```markdown
## ניתוח קהילה שבועי — [תאריך]

### Top 3 פוסטים לפי אינגייג'מנט
| פוסט | לייקים | תגובות | מסקנה |
|------|--------|---------|--------|

### תובנת הלייקאביליות
[מה גרם לפוסט המוביל להצליח? מה הדפוס?]

### חברים פעילים השבוע
[מי כתב הכי הרבה — פוטנציאל ל-Case Study בקורס]

### המלצה לשבוע הבא
[פעולה אחת קונקרטית שמגיעה מהדאטה]
```
