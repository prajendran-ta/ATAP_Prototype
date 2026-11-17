ATAP demo
=========

A standalone, front-end-only build of the ATAP / MediaHub prototype.
No backend, no login, no install step. Everything runs on demo data.

Run it
------
Needs Node.js 14 or newer (https://nodejs.org). Nothing else.

  macOS:    double-click start.command   (or: ./start.command)
  Windows:  double-click start.bat
  Any OS:   node serve.js

Then open http://localhost:8080 (the launchers open it for you).
To use another port:  PORT=3000 node serve.js

The folder is self-contained: you can move it anywhere, or delete it, without
affecting the rest of the project.

What's inside
-------------
  app/        the built front end (static files)
  serve.js    tiny dependency-free web server (also handles client-side routes)
  start.*     launchers

Good to know
------------
- You are signed in automatically as a demo administrator. The backend is off:
  advertisers, OBA plans, audiences and campaign setup show built-in demo data
  (The Londoner Hotel and 10 other demo advertisers).
- Not available offline: Media Planner data, creating OBA plans, notifications
  and module cards on Home, and the Max Copilot chat.
- The Londoner HTML5 banners load Google's Enabler and GSAP from the internet,
  so they only animate when you are online. Everything else works offline.
- Your demo state (follows, edits) is kept in the browser's localStorage.
- To show the real login page again, open  /login?login=on  (and ?login=off to
  skip it again). Note that signing in for real needs the backend, which is not
  part of this package.
- The news images on the ad preview page (/all-campaigns/preview) are press
  photos; check you may share them before sending this folder outside the team.

Rebuilding
----------
This folder is a build output. To refresh it from the source repo:
  NODE_ENV=production npx webpack --config webpack.demo.config.ts
