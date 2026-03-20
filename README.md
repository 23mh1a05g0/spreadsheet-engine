# 📊 Backend Spreadsheet Engine

A backend spreadsheet engine built using **Node.js** that supports formula parsing, dependency tracking using a **Directed Acyclic Graph (DAG)**, reactive recalculation, and robust error handling.

---

## 🚀 Objective

This project simulates the core functionality of spreadsheet applications like Excel or Google Sheets. It allows users to:

* Store values in cells
* Define formulas referencing other cells
* Automatically recalculate dependent cells
* Detect and prevent circular dependencies

---

## 🧠 Key Concepts Implemented

* **Expression Parsing**
* **Dependency Graph (DAG)**
* **DFS (Depth First Search)**
* **Cycle Detection**
* **Reactive Computation**
* **Error Propagation**

---

## 🏗️ Tech Stack

* **Node.js**
* **Express.js**
* **Docker & Docker Compose**
* In-memory data storage (No DB)

---

## 📁 Project Structure

```
spreadsheet-engine/
│
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   │   ├── parser.js
│   │   └── graph.js
│   ├── app.js
│   └── server.js
│
├── Dockerfile
├── docker-compose.yml
├── .env.example
├── package.json
└── README.md
```

---

## ⚙️ Setup & Run

### 🔹 1. Clone Repository

```
git clone <your-repo-url>
cd spreadsheet-engine
```

---

### 🔹 2. Setup Environment Variables

Create `.env` file:

```
API_PORT=8080
```

---

### 🔹 3. Run using Docker

```
docker-compose up --build
```

---

### 🔹 4. Verify Health

```
GET http://localhost:8080/health
```

Response:

```json
{
  "status": "healthy"
}
```

---

## 📡 API Endpoints

---

### ✅ Set Cell Value

```
PUT /api/sheets/:sheet_id/cells/:cell_id
```

**Example:**

```
PUT /api/sheets/test_sheet/cells/A1
```

**Request Body:**

```json
{
  "value": 10
}
```

---

### ✅ Set Formula

```json
{
  "value": "=A1 + B1"
}
```

---

### ✅ Get Cell Value

```
GET /api/sheets/:sheet_id/cells/:cell_id
```

**Response:**

```json
{
  "value": 30,
  "formula": "=A1+B1"
}
```

---

## 🔥 Features

### ✔ Formula Support

* Arithmetic: `+`, `-`, `*`, `/`
* Parentheses support
* Cell references (A1, B2, etc.)

---

### ✔ Dependency Graph

* Maintains relationships between cells
* Uses adjacency list representation

---

### ✔ Reactive Updates

* Automatically updates dependent cells when a value changes

---

### ✔ Cycle Detection

* Prevents circular dependencies
* Returns `#CYCLE!` error

---

### ✔ Error Handling

| Error     | Description               |
| --------- | ------------------------- |
| `#DIV/0!` | Division by zero          |
| `#REF!`   | Invalid/missing reference |
| `#CYCLE!` | Circular dependency       |

---

### ✔ Error Propagation

If a dependent cell has an error, it propagates:

```
A1 = 10
B1 = =A1/0 → #DIV/0!
C1 = =B1*2 → #DIV/0!
```

---

## 🧪 Example Workflow

### Step 1:

```json
A1 = 10
B1 = 20
```

### Step 2:

```json
C1 = =A1 + B1 → 30
```

### Step 3:

```json
Update A1 = 50
```

### Result:

```json
C1 = 70 (auto-updated)
```

---

## 🔁 Dependency Graph Example

```
A1 → C1
B1 → C1
```

---

## 🧠 Algorithm Design

### 🔹 Graph Representation

* Forward Graph → Dependents
* Reverse Graph → Dependencies

### 🔹 Cycle Detection

* DFS-based detection before adding dependencies

### 🔹 Recalculation

* DFS traversal for updating dependent cells

---

## ⚠️ Limitations

* No persistent database (in-memory only)
* No support for functions like SUM, AVG
* No UI (backend only)

---

## 🚀 Future Improvements

* Add persistent storage (MongoDB/PostgreSQL)
* Support spreadsheet functions (SUM, AVG)
* Optimize recalculation using topological sort
* Add frontend UI
* Add unit/integration tests

---

## 🧪 Testing (Optional)

You can test using:

* Postman
* Thunder Client
* Curl

---

