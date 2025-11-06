# LoTUS-BF - Location-or-Term Unified Search for Brain Functions

> 一個現代化的腦功能搜尋與視覺化工具

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://ntu-info.github.io/lotus-bf-frontend-BurningBright7214/)
[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-blue)](https://ntu-info.github.io/lotus-bf-frontend-BurningBright7214/)

## 📖 關於 LoTUS-BF

LoTUS-BF（Location-or-Term Unified Search for Brain Functions）是一個專為神經科學研究設計的互動式搜尋與視覺化平台。你可以透過**位置座標**或**功能術語**來查詢腦科學文獻，並即時檢視腦部影像重疊圖。

## ✨ 主要功能

### 🔍 統一搜尋介面
- **術語搜尋**：瀏覽並選擇常見的腦功能術語（如 "emotion"、"memory" 等）
- **位置搜尋**：直接輸入 MNI 座標（例如：`[-22,-4,18]`）
- **進階查詢**：支援邏輯運算符（AND、OR、NOT）和括號組合

### 📊 研究結果展示
- **文獻列表**：顯示符合查詢條件的研究論文
- **排序功能**：依年份、期刊、標題、作者排序
- **分頁瀏覽**：輕鬆瀏覽大量搜尋結果

### 🧠 腦影像視覺化
- **3D 檢視**：同時顯示冠狀切面（Coronal）、矢狀切面（Sagittal）、軸狀切面（Axial）
- **互動式導覽**：點擊影像切面調整座標位置
- **參數調整**：自訂閾值、透明度、平滑度等參數
- **座標定位**：直接輸入 MNI 座標快速導航

## 🚀 快速開始

### 線上使用（推薦）

直接訪問線上版本：**[https://ntu-info.github.io/lotus-bf-frontend-BurningBright7214/](https://ntu-info.github.io/lotus-bf-frontend-BurningBright7214/)**

無需安裝任何軟體，開啟瀏覽器即可使用！

### 本機安裝（開發者）

如果你想要在本機運行或修改專案：

```bash
# 1. 安裝相依套件
npm install

# 2. 啟動開發伺服器
npm run dev

# 瀏覽器會自動開啟 http://localhost:5173
```

## 💡 使用指南

### 基本搜尋

1. **使用術語搜尋**：
   - 在左側「Terms」面板中搜尋或點擊術語
   - 選取的術語會自動加入查詢欄位

2. **使用座標搜尋**：
   - 在查詢建立器中直接輸入座標格式：`[-22,-4,18]`
   - 可以使用邏輯運算符組合多個條件

3. **檢視結果**：
   - 中間面板會顯示符合的研究文獻
   - 右側會顯示對應的腦影像視覺化

### 進階功能

- **組合查詢**：例如 `emotion AND memory` 或 `[-22,-4,18] NOT emotion`
- **調整影像參數**：在右側影像檢視器中調整閾值、透明度等
- **下載影像**：點擊「下載影像」按鈕儲存當前視覺化結果

## 🔧 技術架構

- **前端框架**：React 19 + Vite
- **影像處理**：NIfTI 格式支援，Canvas 渲染
- **API 端點**：`https://mil.psy.ntu.edu.tw:5000`
- **部署平台**：GitHub Pages

## 📝 開發說明

本專案使用現代化的設計系統，包含：
- 🎨 統一的色彩與間距系統
- 📱 響應式設計（支援桌面與移動裝置）
- ⚡ 流暢的動畫與互動效果
- ♿ 無障礙設計考量

開發過程中的設計決策與技術討論記錄在 Cursor AI 對話中，可供後續開發參考。

## 🤝 授權

本專案為課程作業專案，僅供學習與研究使用。

## 📧 問題回報

如有任何問題或建議，請在 [GitHub Issues](https://github.com/ntu-info/lotus-bf-frontend-BurningBright7214/issues) 中提出。

---

**享受探索大腦的奧秘！** 🧠✨
