# 部署指南 - GitHub Pages

本指南將教你如何將 LoTUS-BF 前端應用部署到 GitHub Pages。

## 方法一：部署到個人 GitHub Pages（推薦）

如果你的 GitHub 用戶名是 `yourusername`，這個方法會將網站部署到 `https://yourusername.github.io`

### 步驟 1：建立個人 GitHub Pages Repo

1. 前往 GitHub 網站
2. 點擊右上角的 `+` → `New repository`
3. Repository 名稱必須是：`yourusername.github.io`（把 `yourusername` 換成你的 GitHub 用戶名）
4. 選擇 Public
5. **不要**勾選「Initialize this repository with a README」
6. 點擊「Create repository」

### 步驟 2：建置專案

在你的專案目錄執行：

```bash
npm run build
```

這會產生一個 `dist` 資料夾，裡面包含所有需要部署的檔案。

### 步驟 3：複製檔案到個人 Pages Repo

```bash
# 1. Clone 你的個人 GitHub Pages repo（如果是第一次）
git clone https://github.com/yourusername/yourusername.github.io.git
cd yourusername.github.io

# 2. 回到專案目錄，複製 dist 裡的所有檔案
# （在 PowerShell 中）
cd ../lotus-bf-frontend-BurningBright7214
Copy-Item -Path dist\* -Destination ..\yourusername.github.io\ -Recurse -Force

# 或者在 Git Bash/Cmd 中
cd ../lotus-bf-frontend-BurningBright7214
xcopy /E /I /Y dist\* ..\yourusername.github.io\

# 3. 回到個人 Pages repo 目錄
cd ../yourusername.github.io

# 4. 提交並推送
git add .
git commit -m "Deploy LoTUS-BF frontend"
git push origin main
```

### 步驟 4：啟用 GitHub Pages

1. 前往你的 `yourusername.github.io` repo 頁面
2. 點擊 `Settings` → `Pages`
3. Source 選擇 `Deploy from a branch`
4. Branch 選擇 `main`，資料夾選擇 `/ (root)`
5. 點擊 `Save`

等待數分鐘，你的網站就會在 `https://yourusername.github.io` 上線了！

---

## 方法二：部署到專案頁面

這個方法會將網站部署到 `https://yourusername.github.io/lotus-bf-frontend-BurningBright7214`

### 步驟 1：修改 vite.config.js

將 `base` 從 `'/'` 改為 `'/lotus-bf-frontend-BurningBright7214/'`：

```javascript
export default defineConfig({
  base: '/lotus-bf-frontend-BurningBright7214/',  // 改成你的 repo 名稱
  // ... 其他設定
})
```

### 步驟 2：建置專案

```bash
npm run build
```

### 步驟 3：設定 GitHub Actions 自動部署（推薦）

1. 在專案根目錄建立 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

2. 提交並推送：

```bash
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Actions deployment"
git push origin main
```

### 步驟 4：啟用 GitHub Pages

1. 前往專案 repo 頁面
2. 點擊 `Settings` → `Pages`
3. Source 選擇 `GitHub Actions`

GitHub Actions 會在每次推送後自動部署你的網站！

---

## 方法三：手動部署到專案頁面

如果不使用 GitHub Actions，可以手動部署：

```bash
# 1. 建置專案
npm run build

# 2. 切換到 gh-pages 分支（如果不存在會自動建立）
git checkout -b gh-pages

# 3. 複製 dist 內容到根目錄
# （在 PowerShell）
Remove-Item * -Recurse -Force -Exclude .git
Copy-Item -Path dist\* -Destination . -Recurse

# 4. 提交並推送
git add .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages --force

# 5. 切回 main 分支
git checkout main
```

然後在 Settings → Pages 中選擇 `gh-pages` 分支。

---

## 注意事項

1. **API 端點**：確認 `src/api.js` 中的 `API_BASE` 允許從你的域名存取（CORS 設定）
2. **路徑問題**：如果使用專案頁面部署，確保 `vite.config.js` 的 `base` 設定正確
3. **快取**：部署後如果看不到更新，嘗試強制重新整理（Ctrl+F5）

---

## 快速檢查清單

- [ ] 執行 `npm run build` 成功
- [ ] `dist` 資料夾內有 `index.html` 和其他檔案
- [ ] 根據部署方法修改了 `vite.config.js`（如果使用方法二）
- [ ] 在 GitHub Settings → Pages 中啟用了 Pages
- [ ] 等待數分鐘讓部署完成
- [ ] 訪問網站確認功能正常

