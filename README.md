# Kasikeu Girls Secondary School

The public site includes dedicated pages for school history, academics and results, boarding and activities, joining and reporting, learning resources, visiting the campus, and staff. Each page is directly addressable and uses the same stylesheet and content settings.

The public site is plain HTML, CSS and JavaScript. The build needs Node.js and has no package dependencies. Edit `site-header.html` or `site-footer.html` to update those sections across the public site. Individual pages keep their own main content.

## Preview locally

Run `node build.mjs` to assemble the pages and assets in `dist/`. Vercel runs this command for each deployment. Use `vercel dev` in a linked project to preview the clean URLs locally. To inspect the generated HTML with a basic web server, run `python -m http.server 8000 --directory dist` and open a page by its HTML filename.

## Edit and publish content

Open `/admin` to update school content. Use **Pages** for headings, introductions, and extra sections across public pages. In **Staff & Team**, create or edit staff members and select their group. The public **Staff** page groups profiles in leadership and teaching order. Select **Preview** to review the browser-local draft and **Publish website** to send it to GitHub. A fine-grained GitHub token scoped to this repository needs Contents read and write access. Enter the token inside the editor when prompted. It is not saved. Vercel deploys the resulting content commit.

**Export Backup** and **Import Backup** are available for keeping local copies. If the live content changes after you started editing, export a backup before loading the latest published version and applying your edits again. Only publish material approved for public release.

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
- [KICD curriculum designs and approved materials](https://kicd.ac.ke/cbc-materials/)
- [KNEC timetables and instructions](https://www.knec.ac.ke/timetables/)

The homepage banners use two Lake Nakuru trip photos supplied for the site update. Other pages may use the existing labeled illustrations. The site also links to NURU’s school gallery.

The homepage sample notice is intentionally labeled and disappears when school announcements, news, or events are published through the existing editor.

The public defaults omit school fees, reporting dates, staff details, and direct contact details pending confirmation from the school. Update the pathway cards in `academics.html` if official combinations change.
