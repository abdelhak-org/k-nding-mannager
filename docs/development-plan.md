# Telecom Contract App Development Plan

## Purpose

This document is the reference plan for building the MVP as a single Next.js application focused on helping users in Germany understand and evaluate mobile telecom contracts before signing them.

The product is a decision-support tool, not a legal advisor.

Related execution backlog: [docs/technical-task-backlog.md](docs/technical-task-backlog.md)

## Product Scope

### In scope

- German mobile / telecom consumer contracts
- SIM-only offers
- Device bundle offers
- Public offer pages
- Uploaded contract documents and summaries
- Plain-language explanations
- Deterministic risk flags
- Recommendation output: good, acceptable, risky, unclear

### Out of scope

- Other contract categories
- Legal automation
- Court workflows
- Full compliance platform
- Social login
- OCR-heavy document processing in MVP unless proven necessary

## Core Stack

| Layer            | Choice                                   | Notes                                        |
| ---------------- | ---------------------------------------- | -------------------------------------------- |
| App framework    | Next.js 16 + App Router                  | Single app for frontend and backend          |
| Language         | TypeScript                               | Shared types across UI, API, and services    |
| Authentication   | NextAuth with email/password credentials | Registration plus login                      |
| Database         | MongoDB                                  | Flexible storage for extracted analysis data |
| Validation       | Zod                                      | Form and API validation                      |
| UI               | shadcn/ui                                | Fast, simple, consistent components          |
| Styling          | Tailwind CSS                             | Already present in project                   |
| Password hashing | bcryptjs                                 | Credentials auth                             |
| AI               | Optional LLM API                         | Only for summary and explanation             |

## Architecture

The app should stay inside one Next.js codebase and keep separation of concerns through folders.

### Architectural model

| Responsibility | Location                                                                  |
| -------------- | ------------------------------------------------------------------------- |
| Views          | App Router pages and reusable components                                  |
| Controllers    | Route Handlers under `src/app/api`                                        |
| Models         | MongoDB models and repositories under `src/lib/db`                        |
| Services       | Parsing, extraction, rules, scoring, AI under `src/lib/contract-analysis` |
| Validation     | Zod schemas under `src/lib/validation`                                    |
| Auth           | NextAuth config and helpers under `src/lib/auth`                          |

## Recommended Folder Structure

```text
src/
  app/
    api/
      auth/
        [...nextauth]/route.ts
        register/route.ts
      contracts/
        route.ts
        [id]/
          route.ts
          analyze/route.ts
      files/
        upload/route.ts
    auth/
      login/page.tsx
      register/page.tsx
    dashboard/
      layout.tsx
      page.tsx
      contracts/
        page.tsx
        [id]/page.tsx
    globals.css
    layout.tsx
    page.tsx
  components/
    ui/
    forms/
    contract/
    Navbar.tsx
    Footer.tsx
    ThemeToggle.tsx
  lib/
    auth/
    db/
    validation/
    contract-analysis/
    types/
    utils/
```

## Main User Flow

1. User lands on the public homepage.
2. User registers or logs in with email and password.
3. User opens the dashboard.
4. User submits telecom contract content via:
   - pasted text
   - uploaded PDF
   - public URL
5. Backend stores the source and normalizes content.
6. Extraction pipeline identifies key telecom fields.
7. Rule engine evaluates risks.
8. AI generates a simple explanation from structured facts.
9. User sees recommendation, risk flags, key terms, and suggested next steps.
10. User can revisit saved analyses later.

## Authentication Plan

### MVP auth requirements

- Email and password registration
- Email and password login
- Protected dashboard routes
- Protected API routes
- Session persistence via NextAuth
- Ownership checks for all contract records

### Recommended auth flow

1. User submits registration form.
2. Request is validated with Zod.
3. Password is hashed with bcryptjs.
4. User is stored in MongoDB.
5. User logs in through NextAuth credentials provider.
6. Session is created and used for protected pages and APIs.

### Auth-related implementation notes

- Start with credentials provider only.
- Keep registration separate from NextAuth signin route.
- Use server-side session checks for protected pages.
- Filter all contract queries by authenticated `userId`.

## Data Model

### Collection: users

| Field            | Type     | Notes                      |
| ---------------- | -------- | -------------------------- |
| `_id`            | ObjectId | Primary key                |
| `email`          | string   | Unique, indexed            |
| `hashedPassword` | string   | Never store plain password |
| `displayName`    | string   | Optional for MVP           |
| `role`           | string   | Default `user`             |
| `createdAt`      | date     | Timestamp                  |
| `updatedAt`      | date     | Timestamp                  |

### Collection: contracts

| Field            | Type     | Notes                                       |
| ---------------- | -------- | ------------------------------------------- |
| `_id`            | ObjectId | Primary key                                 |
| `userId`         | ObjectId | Owner reference                             |
| `sourceType`     | string   | `text`, `pdf`, `url`                        |
| `sourceUrl`      | string   | Optional                                    |
| `fileName`       | string   | Optional                                    |
| `mimeType`       | string   | Optional                                    |
| `rawText`        | string   | Canonical extracted input text              |
| `providerName`   | string   | Optional top-level convenience field        |
| `offerName`      | string   | Optional                                    |
| `contractType`   | string   | `sim_only`, `device_bundle`, `unclear`      |
| `ingestStatus`   | string   | `pending`, `parsed`, `failed`               |
| `analysisStatus` | string   | `pending`, `completed`, `failed`, `unclear` |
| `createdAt`      | date     | Timestamp                                   |
| `updatedAt`      | date     | Timestamp                                   |

### Collection: extractions

| Field                       | Type     | Notes                                           |
| --------------------------- | -------- | ----------------------------------------------- |
| `_id`                       | ObjectId | Primary key                                     |
| `contractId`                | ObjectId | Contract reference                              |
| `providerName`              | string   | Normalized value                                |
| `tariffName`                | string   | Normalized value                                |
| `monthlyPriceInitial`       | number   | Initial monthly fee                             |
| `monthlyPriceAfterDiscount` | number   | Post-promo fee                                  |
| `setupFee`                  | number   | One-time setup fee                              |
| `discountDurationMonths`    | number   | Promo duration                                  |
| `minimumTermMonths`         | number   | Usually 1, 12, or 24                            |
| `renewalType`               | string   | `none`, `monthly`, `fixed_extension`, `unclear` |
| `renewalTermMonths`         | number   | Optional                                        |
| `noticePeriodDays`          | number   | Optional normalized field                       |
| `contractSummaryPresent`    | boolean  | Vertragszusammenfassung signal                  |
| `productInfoSheetPresent`   | boolean  | Product info sheet signal                       |
| `deviceIncluded`            | boolean  | Device bundle indicator                         |
| `deviceName`                | string   | Optional                                        |
| `deviceUpfrontCost`         | number   | Optional                                        |
| `deviceMonthlyCost`         | number   | Optional                                        |
| `deviceTotalCost`           | number   | Optional                                        |
| `dataVolumeGb`              | number   | Optional                                        |
| `unlimitedData`             | boolean  | Optional                                        |
| `roamingEuIncluded`         | boolean  | Optional                                        |
| `voiceFlatrate`             | boolean  | Optional                                        |
| `smsFlatrate`               | boolean  | Optional                                        |
| `extractionConfidence`      | number   | 0 to 100                                        |
| `evidenceMap`               | object   | Field-to-snippet map                            |
| `extractedAt`               | date     | Timestamp                                       |

### Collection: riskFlags

| Field               | Type     | Notes                                 |
| ------------------- | -------- | ------------------------------------- |
| `_id`               | ObjectId | Primary key                           |
| `contractId`        | ObjectId | Contract reference                    |
| `analysisId`        | ObjectId | Analysis reference                    |
| `ruleCode`          | string   | Stable rule identifier                |
| `title`             | string   | Short flag title                      |
| `description`       | string   | User-facing explanation               |
| `severity`          | string   | `low`, `medium`, `high`, `critical`   |
| `category`          | string   | Pricing, duration, transparency, etc. |
| `evidenceSnippet`   | string   | Text evidence                         |
| `recommendedAction` | string   | User follow-up                        |
| `createdAt`         | date     | Timestamp                             |

### Collection: analysisResults

| Field                  | Type     | Notes                                    |
| ---------------------- | -------- | ---------------------------------------- |
| `_id`                  | ObjectId | Primary key                              |
| `contractId`           | ObjectId | Contract reference                       |
| `extractionId`         | ObjectId | Extraction reference                     |
| `recommendation`       | string   | `good`, `acceptable`, `risky`, `unclear` |
| `decisionScore`        | number   | 0 to 100                                 |
| `confidenceScore`      | number   | 0 to 100                                 |
| `summaryShort`         | string   | Concise explanation                      |
| `summaryDetailed`      | string   | Expanded explanation                     |
| `topBenefits`          | string[] | Key positives                            |
| `topConcerns`          | string[] | Key concerns                             |
| `suggestedNextActions` | string[] | Recommended follow-up                    |
| `missingInformation`   | string[] | Missing fields or uncertainty            |
| `completedAt`          | date     | Timestamp                                |
| `createdAt`            | date     | Timestamp                                |

## Validation Strategy

Use Zod at every external boundary.

### Required validation layers

- Registration form schema
- Login form schema
- Contract submission schema
- URL submission schema
- File upload metadata schema
- Extracted field schema
- Risk flag schema
- API response envelope schema

### Principle

Zod validates all request payloads and service outputs. MongoDB models enforce persistence shape. Do not rely on database validation alone.

## API Plan

### Auth endpoints

| Method | Endpoint                  | Purpose                               |
| ------ | ------------------------- | ------------------------------------- |
| POST   | `/api/auth/register`      | Register user with email and password |
| POST   | `/api/auth/[...nextauth]` | Login via NextAuth credentials        |
| GET    | `/api/auth/session`       | Read current session                  |

### Contract endpoints

| Method | Endpoint                      | Purpose                                          |
| ------ | ----------------------------- | ------------------------------------------------ |
| POST   | `/api/contracts`              | Create a contract submission from text or URL    |
| GET    | `/api/contracts`              | List contracts for current user                  |
| GET    | `/api/contracts/[id]`         | Get contract with latest extraction and analysis |
| POST   | `/api/contracts/[id]/analyze` | Run analysis pipeline                            |
| DELETE | `/api/contracts/[id]`         | Delete a user-owned contract                     |

### File endpoint

| Method | Endpoint            | Purpose                             |
| ------ | ------------------- | ----------------------------------- |
| POST   | `/api/files/upload` | Upload PDF and attach to a contract |

## Contract Analysis Pipeline

### Step 1: Ingestion

Normalize the input into a contract record.

Supported sources:

- pasted text
- PDF upload
- public offer URL

### Step 2: Parsing

- Direct text is normalized immediately.
- PDFs are parsed for text content.
- Public URLs are fetched and cleaned to isolate main offer text.

### Step 3: Extraction

Extract and normalize telecom-specific fields such as:

- provider
- tariff name
- monthly price
- setup fee
- discount period
- price after discount
- minimum term
- renewal clause
- cancellation notice
- device cost
- product information references
- contract summary references

### Step 4: Rule evaluation

All decisioning must be deterministic.

### Example MVP rules

| Rule                      | Trigger                                             | Severity |
| ------------------------- | --------------------------------------------------- | -------- |
| Long contract duration    | Minimum term is 24 months                           | Medium   |
| Illegal-looking duration  | Minimum term exceeds 24 months                      | Critical |
| Auto-renewal unclear      | Renewal clause missing or ambiguous                 | High     |
| Cancellation info missing | Notice period not found                             | High     |
| Price jump after discount | Later monthly fee materially exceeds initial fee    | Medium   |
| Hidden device cost        | Device bundle present but hardware cost unclear     | High     |
| Missing contract summary  | Vertragszusammenfassung not detected where expected | High     |
| Core data incomplete      | Too many essential fields missing                   | High     |

### Step 5: Scoring and recommendation

Recommendation labels:

- good
- acceptable
- risky
- unclear

Rules produce penalties against a base score. If key data is missing or confidence is too low, recommendation becomes `unclear`.

### Step 6: AI explanation

AI is allowed only to:

- summarize the extracted facts
- explain the meaning in simple language
- produce practical next actions

AI is not allowed to:

- decide the risk label
- assign the score
- invent missing terms
- give legal advice

## UI Plan

### Public screens

- Landing page
- Login page
- Registration page

### Authenticated screens

- Dashboard overview
- Contract submission form
- Contract history list
- Contract detail result page

### UI principles

- Use shadcn/ui components for speed and consistency.
- Keep layout simple and readable.
- Prioritize information clarity over decorative design.
- Always show the explanation, key terms, risk flags, recommendation, and next actions clearly.

### First shadcn/ui components to add

- button
- card
- input
- label
- textarea
- tabs
- alert
- badge
- separator
- table
- skeleton
- dialog

## Security and Privacy Notes

### Security

- Hash passwords with bcryptjs.
- Protect all non-public routes.
- Enforce per-user ownership on all contract queries.
- Add request size limits for uploads.
- Add basic rate limiting on analysis endpoints.

### Privacy

- Keep retention minimal.
- Provide delete capability for user-owned data.
- Avoid storing unnecessary personal data from uploaded contracts.
- Keep clear consent and privacy messaging before upload.

## Delivery Roadmap

### Week 1

- Set up app architecture
- Install core dependencies
- Configure shadcn/ui
- Define env variables and coding conventions

### Week 2

- Build registration and login
- Add NextAuth credentials flow
- Protect dashboard routes

### Week 3

- Set up MongoDB connection and models
- Add user ownership checks
- Build basic contract create/list APIs

### Week 4

- Implement text and URL input flow
- Build dashboard submission UI
- Persist contract source records

### Week 5

- Add PDF upload flow
- Implement extraction schema and parser foundation
- Save extracted fields with confidence and evidence

### Week 6

- Implement deterministic rule engine
- Add decision score and recommendation mapping
- Add unit tests for rule behavior

### Week 7

- Add AI summary and explanation layer
- Build result view components
- Improve loading and error states

### Week 8

- Add contract history page
- Add delete flow
- Improve access control and edge case handling

### Week 9

- Validate against German telecom samples
- Review privacy and disclaimer coverage
- Tune extraction and scoring

### Week 10

- Buffer for final hardening
- Pilot preparation
- Documentation and QA cleanup

## Implementation Priorities

1. Auth and protected app shell
2. MongoDB connection and models
3. Contract submission endpoints
4. Parsing and extraction schema
5. Rule engine and scoring
6. Result dashboard
7. AI explanation
8. Deletion, privacy, and hardening

## Notes for Future Development

### Likely post-MVP additions

- OCR support for scanned PDFs
- Provider comparison benchmarks
- Saved favorites or comparison mode
- Admin review tooling
- Better observability for extraction failures
- Improved provider-specific URL parsing

### Important guardrail

The product should always communicate that it helps users understand contracts and identify possible concerns, but does not replace legal review.
