# **MVP Project Scaffold**

**Stack:** React \+ TypeScript \+ Vite \+ Tailwind \+ Firebase (or Express)

## **⚡ Quickstart (Cross-Platform)**

1. **Prerequisites**:
   * **Node.js LTS**: Download and install from [nodejs.org](https://nodejs.org/).
   * **Git**: Download and install from [git-scm.com](https://git-scm.com/).
2. Setup:
   Clone the repo and install dependencies. Run this single command in the root folder:
   npm install

   *Note: This command automatically installs dependencies for both the frontend and the backend workspaces.*
3. **Run Locally**:
   npm run dev

   * **Frontend:** http://localhost:5173
   * **Backend API:** http://localhost:3001 (if using Express)
   * **Note:** This command runs both servers simultaneously.

## **🔧 Troubleshooting for Windows Users**

* **Execution Policy Errors:** If you see an error about scripts being disabled in PowerShell, right-click PowerShell, run as **Administrator**, and type:
  Set-ExecutionPolicy RemoteSigned

* **Line Endings (CRLF vs LF):** If Git shows every file as "modified" immediately after cloning, run this command:
  git config \--global core.autocrlf true

## **👥 Team Roles (48-Hour Hackathon)**

### **1\. The Frontend Architect (UI/UX)**

* **Focus:** frontend/src/components, frontend/src/pages, Tailwind.
* **Tasks:**
  * \[ \] Style the Login page (make it look pro).
  * \[ \] Build the Dashboard layout (Sidebar \+ Grid).
  * \[ \] Create 3 reusable components (Button, Card, Modal).

### **2\. The Logic/Backend Lead (Data)**

* **Focus:** frontend/src/hooks, services/firebase.ts OR backend/.
* **Tasks:**
  * \[ \] Set up the actual Firebase Console project.
  * \[ \] Paste API keys into .env.local (Git ignored).
  * \[ \] Write the useFirestore custom hooks for complex queries.

### **3\. The Integrator (DevOps/QA)**

* **Focus:** Testing, Deployment, Routing, CI.
* **Tasks:**
  * \[ \] Connect repository to GitHub.
  * \[ \] Set up Firebase Hosting (firebase init hosting).
  * \[ \] Ensure npm run test passes in CI.
  * \[ \] Manual QA of the login flow.

## **✅ Acceptance Criteria & QA Checklist**

* \[ \] **Auth:** User can sign up, sign in, and sign out.
* \[ \] **Protection:** Accessing / without login redirects to /login.
* \[ \] **Create:** User can add a new item to the dashboard list.
* \[ \] **Read:** The list persists after refreshing the page.
* \[ \] **Delete:** User can remove an item.
* \[ \] **Responsiveness:** Layout works on mobile view (Chrome DevTools).

## **🛠 Neovim Setup Snippet**

Add this to your init.lua for TypeScript support:
\-- Prereq: npm install \-g typescript-language-server
require'lspconfig'.tsserver.setup{}
require'lspconfig'.eslint.setup{}

## **🚀 Deployment (Firebase)**

1. Install tools: npm install \-g firebase-tools
2. Login: firebase login
3. Init: cd frontend && firebase init
   * Select **Hosting**.
   * Public directory: dist
   * Configure as single-page app: **Yes**
4. Deploy: npm run build && firebase deploy
