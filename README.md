# Kasikeu Girls Secondary School

The public site is plain HTML, CSS and JavaScript. No build command or dependencies are required.

## Preview locally

Run `python -m http.server 8000` in this folder and open `http://localhost:8000/`. Serving the files over HTTP enables the public content file and the admin draft preview.

## Edit and publish content

Open `/admin.html` to edit a browser-local draft. If the public site already has custom content, import the current `school-content.json` before editing in a new browser. Select **Save All**, then **Preview** to review your draft. Existing drafts from the earlier site may contain 2025 dates and sample information. Review those fields before exporting.

Choose **Export Website Content** and replace `school-content.json` in the repository with the downloaded file. Review the changes, then commit and deploy through the existing Vercel project. Everyone sees the published JSON. **Export Backup** downloads a separate backup copy.

Only include material approved for public release. The admin page is a static editor and public visitors can open it, but browser drafts are local and publishing requires repository access.

## Sources for the public defaults

- [Ministry of Education Grade 10 selection and placement](https://selection-and-placement.kemis.go.ke/)
- [Kasikeu Girls school listing and October 2026 subject combinations](https://www.shulezote.co.ke/school/kasikeu-girls-sec-sch/)
- [Senior school register, row 5233](https://educationboard.co.ke/wp-content/uploads/2025/06/senior-schools-in-kenya-1.pdf)

The public defaults omit school fees, reporting dates, staff details, phone numbers, email addresses, and campus photos pending confirmation from the school. Update the pathway cards in `index.html` if official combinations change.
