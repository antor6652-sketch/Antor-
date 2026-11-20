ANTOR — PERSONAL PORTFOLIO
==========================

FILES
- index.html: website structure/content
- style.css: premium black, white and gold styling
- app.js: guestbook behavior
- config.js: Supabase connection settings
- supabase-setup.sql: database table and security policies
- assets/Antor-CV.pdf: replace with your real CV PDF

STEP 1 — PERSONALISE THE WEBSITE
1. Open index.html in a text editor (TextEdit in plain-text mode, or preferably VS Code).
2. Replace YOUR_EMAIL@example.com with your real professional email.
3. Replace the LinkedIn link with your real profile URL.
4. Edit the About Me and Experience copy to match your exact work history.
5. Put your CV PDF in the assets folder and name it exactly Antor-CV.pdf.
6. Optional: add a professional portrait later; the current design uses an A monogram placeholder.

STEP 2 — CREATE SUPABASE DATABASE (FREE TIER)
1. Go to https://supabase.com and create/sign in to your account.
2. Create a project. Choose a project name and database password; save the password privately.
3. Wait for the project to finish provisioning.
4. Open SQL Editor > New query.
5. Open supabase-setup.sql from this folder, copy all its contents, paste into SQL Editor and click Run.
6. Go to Project Settings > API (or API Keys).
7. Copy the Project URL and the anon/public/publishable key. Do NOT copy service_role or secret keys.
8. Open config.js and paste the values between the quotes:
   window.SUPABASE_URL = "https://YOURPROJECT.supabase.co";
   window.SUPABASE_ANON_KEY = "YOUR_PUBLIC_ANON_OR_PUBLISHABLE_KEY";

STEP 3 — TEST LOCALLY
1. Double-click index.html to open it in your browser.
2. The portfolio should display. Once config.js is set, the guestbook should connect.
3. Submit a test message.
4. In Supabase Dashboard > Table Editor > guestbook_messages, find the test row.
5. Change approved from false to true.
6. Refresh your portfolio. The approved message should appear.
7. Try a second message and confirm it does NOT appear until you approve it.

STEP 4 — PUBLISH FREE WITH GITHUB PAGES
1. Create/sign in to https://github.com.
2. Create a NEW PUBLIC repository named exactly: YOUR-GITHUB-USERNAME.github.io
   Example: if your username is antor123, the repository must be antor123.github.io.
3. Upload the website files and folders from this package to the repository root:
   index.html, style.css, app.js, config.js, supabase-setup.sql, README-START-HERE.txt, assets/
   Do not upload private passwords or a Supabase service_role key.
4. In the repository, open Settings > Pages.
5. Under Build and deployment, choose Deploy from a branch.
6. Select branch main and folder /(root), then Save.
7. Wait a few minutes. Your website should be at:
   https://YOUR-GITHUB-USERNAME.github.io

STEP 5 — APPROVE VISITOR MESSAGES
1. Open Supabase Dashboard > Table Editor > guestbook_messages.
2. Review each new row.
3. Set approved = true to publish it.
4. Delete unwanted/spam rows from the table.
5. Visitors can only submit messages and read approved messages; the website does not give visitors moderation access.

IMPORTANT SECURITY
- The Supabase anon/publishable key is expected to be visible in a browser website. Database security comes from Row Level Security policies in supabase-setup.sql.
- NEVER place a Supabase service_role key or database password in config.js or any website file.
- Keep your GitHub repository free of private CV details you do not want public.
- The GitHub repository is public, so all uploaded files (including your CV) can be viewed by anyone.
- The Supabase Free plan may pause projects after a week of low activity. You may need to restore it from the Supabase dashboard. See https://supabase.com/docs/guides/platform/free-project-pausing

EDITING AFTER PUBLISHING
Edit the files and upload/commit the changed files to the same GitHub repository. GitHub Pages republishes them automatically.
