# Changelog                                                                                                                           All significant changes to this project are documented in this file.                                                                                                                                     The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),                                                      and the project is compliant with [Semantic Versioning](https://semver.org/spec/v2.0.0.html).                                      

## [1.0.0] - 2026-07-31

### Added
- Add .gitignore and README.md
- Update company name to I.N.T. Software Development
- Tiramisu recipe added to public/recipes.json
- Language context and support for multi-language content added
- EmailJS integration added to contact form
- i18n support for contact form messages added
- Firmware update endpoint for MINT device added
- Signed firmware v1.0.0 binary uploaded
- Mission section and updated timeline added
- Meta tags, JSON-LD, robots.txt, sitemap.xml added for SEO
- Static prerendering for all routes implemented
- MintPrivacyPage component added and navigation links updated

### Changed
- Project sections and images updated
- Footer component and translations updated for better localization
- README with project details and structure improvements updated
- Contact address updated to Kędzierzyn-Koźle/Gliwice
- Profile photo added to about section instead of ui-avatars
- MINT section updated to focus on nRF52 instead of STM32
- Form validation and status messages in contact form updated
- Assets converted to WebP, dead link/deps dropped
- About experience reframed as B2B selected work
- CV download removed from the site
- Legal pages added, Gmail contact dropped, registry data included
- Index.html and src/i18n/translations.js updated with contact and company information
- Displayed email reverted back to Gmail for now
- MINT changelog page added from ../mint sources
- README reframed as company site, stale sections trimmed
- License switched to All Rights Reserved
- Deploy scripts consolidated and documentation updated
- OTA files removed
- Release script and deployment instructions added

### Fixed
- Deploy scripts fixed to use rsync over SSH
- Service and template IDs in contact.jsx updated
- Prerendering changes included from previous commit
- Email address in legal section updated to use company domain
- Script added to ensure `src/data/mint-changelog.json` is always present
- OTA directory protection added in deploy.sh

---

