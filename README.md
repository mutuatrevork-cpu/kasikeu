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
- [Teacher.co.ke senior school profile and grade range](https://teacher.co.ke/kasikeu-girls-senior-school-cv7s/)
- [NURU’s Kasikeu Girls gallery](https://nuru.org.uk/gallery/kasikeu-girls-high-school/) and [partner-school listing](https://nuru.org.uk/gallery/)
- [Kilome constituency project archive](https://info.mzalendo.com/projects/in/kilome/) and [2018–2019 NG-CDF project list](https://kilome.ngcdf.go.ke/wp-content/uploads/2021/09/KILOME-1819.pdf)
- [Published historical KCSE results](https://shulezote.co.ke/school/kasikeu-girls-sec-sch/kcse/)
- [2019 national secondary school drama festival programme](https://teacher.co.ke/amp/2019-national-drama-festivals-program-for-secondary-schools/) and [March 2026 Makueni sports programme](https://www.scribd.com/document/1009717700/Final-Programe)
- [School location and coordinates](https://www.shulezote.co.ke/school/kasikeu-girls-sec-sch/#location). The embedded map uses OpenStreetMap.

The two images included with the public site are generated illustrations. The site labels them and links to NURU’s school gallery for documentary photos. Replace the imagery with approved school photos when available.

The public defaults omit school fees, reporting dates, staff details, and direct contact details pending confirmation from the school. Update the pathway cards in `index.html` if official combinations change.
