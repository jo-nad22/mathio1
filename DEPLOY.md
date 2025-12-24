# دليل نشر اللعبة على GitHub Pages

## الخطوات:

### 1️⃣ إنشاء Repository على GitHub

1. اذهب إلى [GitHub](https://github.com)
2. اضغط على **New Repository** (زر أخضر)
3. اكتب اسم للـ Repository (مثلاً: `lineage-game`)
4. اختر **Public** (عام)
5. **لا** تضف README أو .gitignore
6. اضغط **Create Repository**

### 2️⃣ ربط المشروع بـ GitHub

افتح Terminal في نفس مجلد اللعبة وشغل الأوامر دي:

```bash
# Initialize git (لو أول مرة)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Lineage Code Game"

# Add remote (استبدل YOUR_USERNAME باسمك على GitHub)
git remote add origin https://github.com/YOUR_USERNAME/lineage-game.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 3️⃣ بناء المشروع (Build)

```bash
npm run build
```

هيعمل مجلد `dist` فيه الملفات الجاهزة للنشر.

### 4️⃣ النشر على GitHub Pages

#### طريقة 1: يدوياً (Manual)

1. بعد ما تعمل `build`، ادخل على Repository على GitHub
2. اذهب إلى **Settings** → **Pages**
3. تحت **Source**:
   - اختر **GitHub Actions** (الأفضل)
   - أو اختر **Deploy from a branch** واختار `gh-pages`

4. لو اخترت **Deploy from branch**، استخدم الأوامر دي:

```bash
# Install gh-pages package
npm install --save-dev gh-pages

# Add deploy script to package.json
# (شوف package.json تحت)

# Deploy
npm run deploy
```

#### طريقة 2: GitHub Actions (تلقائي - الأفضل)

سأقوم بإنشاء ملف GitHub Actions workflow تلقائي.

### 5️⃣ الوصول للعبة

بعد النشر، اللعبة هتكون على:
```
https://YOUR_USERNAME.github.io/lineage-game/
```

---

## ملاحظات مهمة:

✅ **تأكد من تحديث `YOUR_USERNAME` باسمك الحقيقي على GitHub**
✅ **الـ `base` في `vite.config.js` تم ضبطه على `'./'` عشان يشتغل على GitHub Pages**
✅ **كل تحديث جديد، شغل `npm run deploy` مرة تانية**

---

## التحديثات المستقبلية:

لما تعدل حاجة في الكود وعايز تنشرها:

```bash
git add .
git commit -m "وصف التعديل"
git push
npm run deploy
```
