# Valentine's Day Special Website

A fun and interactive Valentine's Day website where you can ask someone to be your Valentine! The website includes:

## Features
- Interactive Yes/No buttons
- Name collection
- Fun GIF responses
- Moving "No" button that tries to escape
- Response tracking
- Beautiful dashboard to view all responses

## Files
- `demo.html` - Main Valentine's request page
- `dashboard.html` - Admin dashboard to view all responses
- `server.js` - Backend server for tracking responses
- `assets/` - Directory containing GIFs and other assets

## Setup
1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
node server.js
```

3. Open `demo.html` in your browser to see the Valentine's request page
4. Open `dashboard.html` to view all responses

## Tech Stack
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- Storage: JSON file-based storage
- Hosting: Render.com (backend), GitHub Pages (frontend)

## Note
Make sure to add your GIFs in the `assets/gif` directory:
- asked.gif - Initial asking GIF
- yes.gif - Response when someone says yes
- 1st.gif, 2nd.gif, 3rd.gif - Response GIFs for "No" clicks
