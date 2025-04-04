# Decorations Server

## 簡介 (Introduction)

這是一個簡單的 API 服務器，用於管理用戶的裝飾偏好。服務器允許用戶保存和檢索他們選擇的裝飾項目。

This is a simple API server for managing user decoration preferences. The server allows users to save and retrieve their chosen decoration items.

## 安裝 (Installation)

1. 安裝依賴項：
   ```
   npm install
   ```

2. 創建 `.env` 文件（可以從 `.env.example` 複製）：
   ```
   PORT=9000
   DATA_FILE=./data/decorations.json
   ```

3. 啟動服務器：
   ```
   node index.js
   ```

服務器將在 http://localhost:9000 上運行（或在 .env 文件中指定的端口）。

## API 端點 (API Endpoints)

### 獲取用戶的裝飾狀態 (Get User's Decoration State)

- **URL**: `/decorations/state`
- **方法**: `GET`
- **URL 參數**: `userId=[string]` (必需)
- **成功響應**: 
  - 狀態碼: 200
  - 內容: `{ "decorationId": "string", "timestamp": "string" }`
- **錯誤響應**:
  - 狀態碼: 400 - `{ "error": "Missing userId" }`
  - 狀態碼: 404 - `{ "error": "Decoration not found" }`

#### 示例請求 (Example Request)
```
GET http://localhost:9000/decorations/state?userId=123456789
```

### 保存用戶的裝飾狀態 (Save User's Decoration State)

- **URL**: `/decorations/state`
- **方法**: `POST`
- **數據參數**: 
  ```json
  {
    "userId": "string",
    "decorationId": "string",
    "timestamp": "string"
  }
  ```
- **成功響應**:
  - 狀態碼: 200
  - 內容: `{ "success": true, "message": "Decoration preference saved", "data": { "decorationId": "string", "timestamp": "string" } }`
- **錯誤響應**:
  - 狀態碼: 400 - `{ "error": "Missing required fields" }`

#### 示例請求 (Example Request)
```
POST http://localhost:9000/decorations/state
Content-Type: application/json

{
  "userId": "123456789",
  "decorationId": "pink__Avatar_Decoration.png",
  "timestamp": "2023-04-04T18:04:38.754Z"
}
```

## 數據存儲 (Data Storage)

裝飾偏好存儲在 JSON 文件中（默認為 `./data/decorations.json`）。格式如下：

Decoration preferences are stored in a JSON file (default is `./data/decorations.json`). The format is as follows:

```json
{
  "userId1": {
    "decorationId": "decoration1.png",
    "timestamp": "2023-04-04T18:04:38.754Z"
  },
  "userId2": {
    "decorationId": "decoration2.png",
    "timestamp": "2023-04-05T10:15:22.123Z"
  }
}
```
