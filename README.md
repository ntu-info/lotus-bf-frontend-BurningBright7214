# LoTUS-BF Frontend

這是 LoTUS-BF 的前端（Vite + React）。你可以選擇在本機開發，或建置後上傳 `./dist` 到 GitHub Pages（個人頁面 `username.github.io`）。

## 1) 先接受作業（GitHub Classroom）
- 開啟作業連結並接受邀請：`https://classroom.github.com/a/DZepDCgF`
- 在 GitHub 上建立你自己的作業 repo，然後把它 clone 到本機。

## 2) 環境需求
- Node.js LTS（推建 v18 或 v20 以上）
- npm（隨 Node 一起安裝）
- Windows 使用者可安裝 nvm-windows（選用）：`https://github.com/coreybutler/nvm-windows`

> 若你已安裝 nvm-windows，可用：
```
nvm install lts
nvm use lts
```

## 3) 安裝與本機開發
在專案根目錄執行：

```
# 安裝相依
npm ci || npm install

# 啟動開發伺服器（http://localhost:5173）
npm run dev
```

## 4) 建置（產出 ./dist）
```
npm run build
```
- 會在專案根目錄生成 `./dist`，內含可直接部署的靜態檔案。

## 5) 部署到 GitHub Pages（個人頁面 username.github.io）
最簡單方式：將 `./dist` 的「內容物」上傳到你個人的 GitHub Pages repo（名稱必須是：`<你的 GitHub 使用者名稱>.github.io`）。

步驟：
1. 在 GitHub 建立（或打開）`<username>.github.io` 這個 repo（這是個人頁面的專用 repo）。
2. 本機 clone 該 repo 到另一個資料夾，例如：`~/Sites/<username>.github.io`。
3. 回到本專案，執行 `npm run build` 產生 `dist`。
4. 複製 `dist` 裡的所有檔案到 `<username>.github.io` repo 根目錄（覆蓋舊檔）。
5. 在 `<username>.github.io` repo：
   ```
   git add .
   git commit -m "Deploy LoTUS-BF frontend"
   git push
   ```
6. 稍等數十秒，打開 `https://<username>.github.io/` 檢查。

> 本專案 `vite.config.js` 的 `base` 已設為 `'/'`，可直接用於個人頁面根路徑。若你改用「專案頁面」（URL 形如 `https://<username>.github.io/<repo>/`），請把 `base` 改成 `'/<repo>/'` 後再 build。

## 6) API 與注意事項
- API 端點在 `src/api.js` 的 `API_BASE`，目前預設：`https://mil.psy.ntu.edu.tw:5000`
- 若瀏覽器主機與 API 網域不同，需要後端允許 CORS；若出現 CORS 錯誤，請確認後端設定。
- 靜態背景影像 `public/static/mni_2mm.nii.gz` 會被自動複製到 `dist/static/`。

## 7) 常見問題
- Windows 下刪除 `node_modules` 可改用檔案總管或 PowerShell：
  ```powershell
  Remove-Item -Recurse -Force node_modules, package-lock.json
  npm install
  ```
- 建置後畫面 404：
  - 確認 `vite.config.js` 的 `base` 與你實際的部署路徑一致（個人頁面用 `'/'`；專案頁面用 `'/<repo>/'`）。

---

快速指令摘要：
```
# 本機開發
npm run dev

# 建置（產出 ./dist）
npm run build
```
