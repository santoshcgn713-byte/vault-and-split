# Orbit — HTML, CSS, and JavaScript edition

A browser-local personal workspace. No framework, build step, paid services, accounts, Firebase, Supabase, or Google Drive connection is required by this edition.

## Open it

1. Extract the ZIP.
2. Open `dist/index.html` in a desktop browser to try the interface. Storage behavior on file URLs varies by browser.
3. For reliable storage and the offline app, serve the `dist` folder over localhost or HTTPS. If Python is installed, open a terminal in this folder and run `python -m http.server 8080 --directory dist`, then visit http://localhost:8080.
4. For Vercel, choose Framework Preset **Other**, Root Directory `local`, no install/build commands, Output Directory `dist`. Do not deploy the old root Next.js app as this edition.
5. On iPhone, open the HTTPS site in Safari, tap Share, then Add to Home Screen. Actual iPhone installation and Safari sign-in have not been tested. There is no sign-in in this edition.

## Included

- Personalized dashboard, four tool cards, two visibly marked Coming Soon.
- Responsive light/dark interface, keyboard focus, labelled forms.
- Vault uploads, local original files, collections, favorites, search, filters, file removal, image/text previews, original download fallback for PDF and other formats.
- Groups with local member names; one currency and one payer per expense.
- Equal, exact, percentage, and integer share splits; expense details/edit/delete.
- Full and partial repayment recording with net outstanding amount validation.
- Ledger-derived balances and simplified suggested transfers.
- Spending period filters, payer doughnut visualization and selectable legend, expense table, repayment history.
- Full backup download and validated, atomic restore.
- PWA manifest and existing app icons. Service worker caches only a fixed public interface allowlist, never document blobs or expense records.

## Storage and privacy

All application records and document blobs are in IndexedDB in this browser profile and origin. There is no authentication, encryption, member authorization, invitation system, server database, cross-device sync, Drive storage, payment processing, or automatic backup. Group members are bookkeeping names, not verified people. Anyone using this browser profile can read and edit all local records. Do not treat this as a locked document vault.

The interface does not send document contents or financial records to a server. HTTPS hosting providers still receive ordinary page requests. No remote scripts, fonts, analytics, or APIs are used. The page CSP blocks outside connections and active embedded documents. HTML from names and imported records is escaped. Images are previewed only for a small raster allowlist; plain text uses textContent; other files download to your device.

Limit: 20 MB per file, 20 files per upload, 80 MB total file contents, 2,000 documents. Browser quota may be lower. Group member limit: 30. Restore input limit: 150 MB. Amount input maximum: 99,999,999.99. All available currencies use two decimal places in this edition.

Clearing browser data, private browsing, eviction, a device loss, or changing the hosted origin can remove or separate data. Export backups regularly through **Overview → Settings & backups → Download full backup**. Backups are unencrypted JSON containing personal file contents. Keep them in a safe location. Restore through the same settings menu; restoration replaces existing records only after confirmation. A requested persistence grant does not protect against manual deletion or device loss.

## Money and ledger rules

`dist/money.js` contains the standalone calculation engine. Amounts use integer cents. Weighted calculations use BigInt intermediates and the largest-remainder method. Equal-share ties use member order. Thus 10.00 split among three members becomes 3.34, 3.33, 3.33. Percentage inputs allow two decimals and must total 100. Share weights must be positive whole numbers. Exact amounts must match the total; each selected participant currently needs a positive exact amount.

Payers receive credit and participants receive debits for their allocations. A repayment increases the sender's balance and decreases the receiver's balance. Suggested transfers simplify net balances, so they can differ from original payer/participant pairs. Spending filters never change outstanding balances. Repayments record external transfers, never move money.

Financial changes are one IndexedDB transaction, with existing state reread inside the transaction. Each expense submission has one UUID to suppress duplicate addition. This is local reliability, not server access control. Deleting or editing an old expense recalculates balances even if repayments already exist. Repayments exceeding current net debt/credit are rejected when entered.

## Backup format and migration

Top level: `format: "orbit-local"`, `version: 1`, `exported`, `state`, `documents`.

State: version, name, theme, collections, groups. Groups: id, name, currency, me, members, expenses, repayments. Expense: id, description, integer amount, ISO calendar date, payer ID, participant allocation map, mode, created timestamp. Repayment: id, sender `from`, receiver `to`, integer amount, date. Document: metadata and base64 original file contents in `data`.

Never upload backups to a source repository. Before future cloud migration, validate this format on the server, map local member identities to verified accounts, add ownership checks and audited sessions, and obtain a decision on shared-history deletion. Do not reuse local names as security identities.

## Test and status

Run `node --test tests/money.test.cjs tests/validation.test.cjs`. Run `node --check dist/app.js` and `node --check dist/sw.js` for syntax.

Calculation and backup/input validation tests run in Node. Browser interaction, IndexedDB persistence/restore, service worker behavior, accessibility with assistive technology, and real iPhone layouts are implemented but not browser-tested in this session.

Recovery: both existing GitHub branches (`main` and `orbit-implementation`) pointed to commit 92a56a9b08f572dbac48e821cf1acb0aa676fce6. Vault and Expense pages were placeholders; no calculation engine was present. Original source remains unchanged outside `local/`. The repository was public at inspection time. Do not commit credentials or personal data.

Vercel project was found, but detailed access returned 403 for its team scope. No deployment is claimed. Current Hobby docs checked 2026-10-19: personal non-commercial use, 100 GB Fast Data Transfer and 1,000,000 CDN requests included; over-limit features may pause. No paid plan or billing was enabled. See https://vercel.com/docs/plans/hobby. This local edition needs no cloud database, server functions, or Drive API usage. Provider terms may change.
