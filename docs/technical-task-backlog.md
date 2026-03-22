# Technical Task Backlog

## Purpose

This backlog converts the product development plan into an execution-ready technical worklist for the MVP.

The backlog is organized by epics, with each task including scope, dependencies, and acceptance criteria so development can proceed in a controlled order.

## Delivery Rules

- Keep the product scoped to German mobile telecom contracts only.
- Keep the app as a single Next.js TypeScript codebase.
- Use NextAuth credentials auth only in MVP.
- Use MongoDB for persistence.
- Use Zod for request, form, and service validation.
- Use shadcn/ui for fast, simple UI work.
- Keep contract risk evaluation deterministic.
- Use AI only for explanation and summary generation.

## Status Legend

| Status      | Meaning                                |
| ----------- | -------------------------------------- |
| Todo        | Not started                            |
| In Progress | Currently being built                  |
| Blocked     | Waiting on dependency or clarification |
| Done        | Completed and verified                 |

## Epic 1: Project Foundation

### Goal

Establish the baseline project structure, dependencies, conventions, and shared infrastructure required by all later work.

| ID    | Task                                                                                                                                       | Priority | Status | Dependencies |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------ | -------- | ------ | ------------ |
| E1-T1 | Create the target folder structure under `src/app`, `src/components`, and `src/lib`                                                        | P0       | Todo   | None         |
| E1-T2 | Install and configure required dependencies: NextAuth, MongoDB, Mongoose, Zod, bcryptjs, shadcn/ui, react-hook-form, and parsing libraries | P0       | Todo   | E1-T1        |
| E1-T3 | Add environment variable contract and `.env.example` for auth, database, and AI integration                                                | P0       | Todo   | E1-T2        |
| E1-T4 | Add shared API response helpers and typed error utilities                                                                                  | P1       | Todo   | E1-T2        |
| E1-T5 | Configure shadcn/ui base components for simple product UI                                                                                  | P1       | Todo   | E1-T2        |
| E1-T6 | Update root app metadata, naming, and product disclaimer copy                                                                              | P1       | Todo   | E1-T1        |

### Acceptance criteria

- Core dependency set installs without peer dependency conflicts.
- Project folders reflect the agreed architecture.
- Environment variables are documented and validated at startup.
- Shared utilities exist for consistent success and error responses.
- shadcn/ui primitives are available for forms and dashboard views.

## Epic 2: Authentication and Access Control

### Goal

Implement secure email/password registration and login with protected pages and protected APIs.

| ID    | Task                                                                               | Priority | Status | Dependencies |
| ----- | ---------------------------------------------------------------------------------- | -------- | ------ | ------------ |
| E2-T1 | Define Zod schemas for registration and login payloads                             | P0       | Todo   | E1-T2        |
| E2-T2 | Create `POST /api/auth/register` route with validation and password hashing        | P0       | Todo   | E2-T1        |
| E2-T3 | Configure NextAuth credentials provider and session callbacks                      | P0       | Todo   | E2-T2        |
| E2-T4 | Create auth helpers to get the current user in server routes and server components | P0       | Todo   | E2-T3        |
| E2-T5 | Protect dashboard routes and redirect unauthenticated users                        | P0       | Todo   | E2-T4        |
| E2-T6 | Enforce ownership checks on contract and file APIs                                 | P0       | Todo   | E2-T4        |
| E2-T7 | Build login and register pages with shadcn/ui and form validation feedback         | P1       | Todo   | E2-T1, E1-T5 |
| E2-T8 | Add logout control and session display in navigation                               | P2       | Todo   | E2-T3        |

### Acceptance criteria

- Users can register with valid email and password.
- Passwords are stored only as hashes.
- Users can sign in and access protected dashboard routes.
- Unauthenticated access to protected pages and APIs is blocked.
- One user cannot read or delete another user’s contract data.

## Epic 3: Database and Domain Models

### Goal

Create the MongoDB connection layer, models, and repository utilities for the contract analysis domain.

| ID    | Task                                                                             | Priority | Status | Dependencies                      |
| ----- | -------------------------------------------------------------------------------- | -------- | ------ | --------------------------------- |
| E3-T1 | Create MongoDB connection singleton for Next.js server runtime                   | P0       | Todo   | E1-T2                             |
| E3-T2 | Implement user model with unique email index and timestamps                      | P0       | Todo   | E3-T1                             |
| E3-T3 | Implement contract model for source records and processing status                | P0       | Todo   | E3-T1                             |
| E3-T4 | Implement extraction model for normalized contract fields and evidence           | P0       | Todo   | E3-T1                             |
| E3-T5 | Implement risk flag model for deterministic rule outputs                         | P0       | Todo   | E3-T1                             |
| E3-T6 | Implement analysis result model for recommendation, score, and summaries         | P0       | Todo   | E3-T1                             |
| E3-T7 | Create repository helpers for users, contracts, extractions, flags, and analyses | P1       | Todo   | E3-T2, E3-T3, E3-T4, E3-T5, E3-T6 |
| E3-T8 | Define shared TypeScript domain types for contract and analysis flows            | P1       | Todo   | E3-T2, E3-T3, E3-T4, E3-T5, E3-T6 |

### Acceptance criteria

- MongoDB uses a shared connection strategy safe for development and production.
- All MVP collections have defined models and timestamps.
- Repository helpers cover the main CRUD paths needed by the APIs.
- Domain types are reusable across API routes and UI components.

## Epic 4: Contract Intake APIs

### Goal

Allow authenticated users to create, list, fetch, and delete contract records before full analysis is attached.

| ID    | Task                                                                                       | Priority | Status | Dependencies        |
| ----- | ------------------------------------------------------------------------------------------ | -------- | ------ | ------------------- |
| E4-T1 | Define Zod schemas for text input, URL input, and base contract creation payloads          | P0       | Todo   | E1-T2               |
| E4-T2 | Implement `POST /api/contracts` for text and URL submissions                               | P0       | Todo   | E4-T1, E2-T6, E3-T3 |
| E4-T3 | Implement `GET /api/contracts` to list current user submissions                            | P0       | Todo   | E2-T6, E3-T7        |
| E4-T4 | Implement `GET /api/contracts/[id]` to return contract plus latest extraction and analysis | P0       | Todo   | E2-T6, E3-T7        |
| E4-T5 | Implement `DELETE /api/contracts/[id]` with ownership validation                           | P1       | Todo   | E2-T6, E3-T7        |
| E4-T6 | Add consistent API error handling and response envelopes for contract routes               | P1       | Todo   | E4-T2, E4-T3, E4-T4 |

### Acceptance criteria

- Authenticated users can create contract records from text or URL.
- Users can list and fetch only their own records.
- Deletion removes or safely soft-deletes owned data.
- Validation errors return clear, typed messages.

## Epic 5: File Upload Pipeline

### Goal

Support PDF uploads and connect uploaded files to contract records.

| ID    | Task                                                                                | Priority | Status | Dependencies        |
| ----- | ----------------------------------------------------------------------------------- | -------- | ------ | ------------------- |
| E5-T1 | Define upload constraints for MIME type, size limit, and contract association rules | P0       | Todo   | E1-T2               |
| E5-T2 | Implement `POST /api/files/upload` for authenticated PDF uploads                    | P0       | Todo   | E5-T1, E2-T6, E3-T3 |
| E5-T3 | Decide initial storage mode: local temp or durable object storage abstraction       | P1       | Todo   | E5-T2               |
| E5-T4 | Attach upload metadata to the related contract record                               | P0       | Todo   | E5-T2, E3-T3        |
| E5-T5 | Add upload error states for invalid type, size limit, and parse-precheck failure    | P1       | Todo   | E5-T2               |

### Acceptance criteria

- Authenticated users can upload a supported PDF file.
- Invalid file types and oversize files are rejected cleanly.
- Uploaded file metadata is linked to the correct contract record.
- The system is ready to pass the file into text extraction.

## Epic 6: Extraction Schema and Parsing Services

### Goal

Normalize raw contract content into structured telecom fields with confidence and evidence tracking.

| ID    | Task                                                                          | Priority | Status | Dependencies        |
| ----- | ----------------------------------------------------------------------------- | -------- | ------ | ------------------- |
| E6-T1 | Define Zod schema for normalized extracted telecom fields                     | P0       | Todo   | E1-T2               |
| E6-T2 | Build text normalization utility for pasted contract content                  | P0       | Todo   | E6-T1               |
| E6-T3 | Build URL parsing service for public telecom offer pages                      | P0       | Todo   | E6-T1               |
| E6-T4 | Build PDF text extraction service for text-based PDFs                         | P0       | Todo   | E6-T1, E5-T2        |
| E6-T5 | Implement field extractor for pricing, term, renewal, notice, and device data | P0       | Todo   | E6-T2, E6-T3, E6-T4 |
| E6-T6 | Implement evidence capture for extracted fields                               | P1       | Todo   | E6-T5               |
| E6-T7 | Compute extraction confidence and missing-field indicators                    | P1       | Todo   | E6-T5               |
| E6-T8 | Persist extraction records to MongoDB                                         | P0       | Todo   | E3-T4, E6-T5        |

### Acceptance criteria

- The system can parse text, public URL content, and text-based PDFs.
- Core telecom fields are normalized into one extraction shape.
- Evidence snippets are stored for important extracted values.
- Low-confidence or incomplete extractions are explicit and queryable.

## Epic 7: Deterministic Rule Engine and Scoring

### Goal

Transform extracted fields into explainable risk flags and a recommendation label.

| ID    | Task                                                                             | Priority | Status | Dependencies               |
| ----- | -------------------------------------------------------------------------------- | -------- | ------ | -------------------------- |
| E7-T1 | Define rule contract for condition, severity, message, and evidence requirements | P0       | Todo   | E6-T1                      |
| E7-T2 | Implement duration and renewal rules                                             | P0       | Todo   | E7-T1, E6-T8               |
| E7-T3 | Implement pricing and discount rules                                             | P0       | Todo   | E7-T1, E6-T8               |
| E7-T4 | Implement device cost transparency rules                                         | P0       | Todo   | E7-T1, E6-T8               |
| E7-T5 | Implement transparency and missing-information rules                             | P0       | Todo   | E7-T1, E6-T8               |
| E7-T6 | Implement scoring weights and recommendation mapping                             | P0       | Todo   | E7-T2, E7-T3, E7-T4, E7-T5 |
| E7-T7 | Persist generated risk flags and analysis status updates                         | P0       | Todo   | E3-T5, E7-T6               |
| E7-T8 | Add unit tests for each rule and recommendation threshold                        | P0       | Todo   | E7-T6                      |

### Acceptance criteria

- Every flag is produced by deterministic code, not AI.
- Recommendation labels are reproducible from the same input.
- Incomplete contracts can be downgraded to `unclear`.
- Rules are covered by automated tests.

## Epic 8: AI Explanation Layer

### Goal

Generate understandable summaries without allowing the model to decide legal or risk outcomes.

| ID    | Task                                                                          | Priority | Status | Dependencies |
| ----- | ----------------------------------------------------------------------------- | -------- | ------ | ------------ |
| E8-T1 | Define prompt contract using extracted fields, flags, and evidence only       | P1       | Todo   | E7-T6        |
| E8-T2 | Implement AI summary service wrapper with retries and error handling          | P1       | Todo   | E8-T1        |
| E8-T3 | Add output validation so the AI response matches expected summary structure   | P1       | Todo   | E8-T2        |
| E8-T4 | Block unsupported legal-advice phrasing and invented facts in final summaries | P1       | Todo   | E8-T3        |
| E8-T5 | Persist summary output into analysis results                                  | P1       | Todo   | E3-T6, E8-T3 |
| E8-T6 | Add fallback behavior when AI fails or is disabled                            | P1       | Todo   | E8-T2        |

### Acceptance criteria

- AI only receives structured grounded data.
- AI cannot override the deterministic recommendation.
- Summary output is safe to omit when the AI call fails.
- Stored summaries follow a predictable schema.

## Epic 9: Analysis Pipeline Orchestration

### Goal

Create the end-to-end orchestration path from contract input to final result.

| ID    | Task                                                                                 | Priority | Status | Dependencies        |
| ----- | ------------------------------------------------------------------------------------ | -------- | ------ | ------------------- |
| E9-T1 | Implement pipeline orchestrator service for parse, extract, rule, score, and summary | P0       | Todo   | E6-T8, E7-T7, E8-T6 |
| E9-T2 | Implement `POST /api/contracts/[id]/analyze` route                                   | P0       | Todo   | E9-T1, E2-T6        |
| E9-T3 | Prevent duplicate concurrent analysis runs on the same contract                      | P1       | Todo   | E9-T2               |
| E9-T4 | Track processing state transitions on the contract record                            | P1       | Todo   | E9-T2               |
| E9-T5 | Return a stable response shape for polling or refresh flows                          | P1       | Todo   | E9-T2               |

### Acceptance criteria

- A contract can move from raw submission to analyzed result through one route.
- Analysis status is visible and stable.
- Repeated clicks do not create conflicting analysis runs.
- The route returns enough information for the UI to render progress and results.

## Epic 10: Public and Authenticated UI

### Goal

Build a simple, usable interface that supports authentication, intake, results, and history.

| ID     | Task                                                                                 | Priority | Status | Dependencies        |
| ------ | ------------------------------------------------------------------------------------ | -------- | ------ | ------------------- |
| E10-T1 | Redesign landing page for the telecom contract product with clear CTA and disclaimer | P1       | Todo   | E1-T5, E1-T6        |
| E10-T2 | Build login form with Zod-driven validation messages                                 | P0       | Todo   | E2-T7               |
| E10-T3 | Build registration form with validation and error states                             | P0       | Todo   | E2-T7               |
| E10-T4 | Build protected dashboard shell and navigation state                                 | P0       | Todo   | E2-T5               |
| E10-T5 | Build contract submission UI with tabs for text, URL, and PDF                        | P0       | Todo   | E4-T2, E5-T2, E1-T5 |
| E10-T6 | Build contract history list for authenticated users                                  | P1       | Todo   | E4-T3               |
| E10-T7 | Build contract detail result page with recommendation, key terms, and flags          | P0       | Todo   | E4-T4, E9-T2        |
| E10-T8 | Build loading, empty, failure, and low-confidence states                             | P1       | Todo   | E10-T5, E10-T7      |
| E10-T9 | Add delete contract action in the dashboard                                          | P2       | Todo   | E4-T5               |

### Acceptance criteria

- Users can authenticate and reach a protected dashboard.
- Users can submit contracts from all MVP input modes.
- Results page clearly shows explanation, extracted facts, risk flags, recommendation, and next actions.
- Empty and failed states are understandable and actionable.

## Epic 11: Security, Privacy, and Product Guardrails

### Goal

Reduce avoidable risk before launch and ensure the app remains positioned as decision support, not legal advice.

| ID     | Task                                                                 | Priority | Status | Dependencies   |
| ------ | -------------------------------------------------------------------- | -------- | ------ | -------------- |
| E11-T1 | Add privacy notice and upload consent messaging in the UI            | P0       | Todo   | E10-T5         |
| E11-T2 | Add product disclaimer across landing, dashboard, and result views   | P0       | Todo   | E10-T1, E10-T7 |
| E11-T3 | Add basic request throttling for auth and analysis endpoints         | P1       | Todo   | E2-T3, E9-T2   |
| E11-T4 | Add file size and request body guards                                | P1       | Todo   | E5-T2          |
| E11-T5 | Add delete flow and retention policy enforcement hooks               | P1       | Todo   | E4-T5          |
| E11-T6 | Minimize stored personal data from uploaded documents where feasible | P1       | Todo   | E5-T2, E6-T8   |

### Acceptance criteria

- The app clearly states it is not a legal advisor.
- Upload flows include privacy messaging before submission.
- Expensive and sensitive routes have baseline protections.
- Users can remove their stored contract data.

## Epic 12: Quality Assurance and Release Readiness

### Goal

Verify the MVP against realistic German telecom samples and stabilize the product for pilot use.

| ID     | Task                                                                                  | Priority | Status | Dependencies                           |
| ------ | ------------------------------------------------------------------------------------- | -------- | ------ | -------------------------------------- |
| E12-T1 | Create a representative test sample set of German telecom offers and contracts        | P0       | Todo   | E6-T8                                  |
| E12-T2 | Verify extraction accuracy against manually labeled expectations                      | P0       | Todo   | E12-T1, E6-T8                          |
| E12-T3 | Verify rule engine outputs against expected flags and scores                          | P0       | Todo   | E12-T1, E7-T8                          |
| E12-T4 | Run auth and authorization test scenarios                                             | P0       | Todo   | E2-T8                                  |
| E12-T5 | Review AI summaries for unsupported claims and grounding issues                       | P1       | Todo   | E8-T6                                  |
| E12-T6 | Test malformed PDFs, inaccessible URLs, short inputs, and duplicate analysis requests | P1       | Todo   | E9-T5                                  |
| E12-T7 | Write launch checklist and pilot-release notes                                        | P2       | Todo   | E12-T2, E12-T3, E12-T4, E12-T5, E12-T6 |

### Acceptance criteria

- Sample-based QA covers text, URL, and PDF flows.
- Rule outputs match expected behavior on representative contracts.
- Auth boundaries hold under normal and negative test cases.
- Known limitations are documented before pilot release.

## Recommended Implementation Order

1. Epic 1: Project Foundation
2. Epic 2: Authentication and Access Control
3. Epic 3: Database and Domain Models
4. Epic 4: Contract Intake APIs
5. Epic 5: File Upload Pipeline
6. Epic 6: Extraction Schema and Parsing Services
7. Epic 7: Deterministic Rule Engine and Scoring
8. Epic 8: AI Explanation Layer
9. Epic 9: Analysis Pipeline Orchestration
10. Epic 10: Public and Authenticated UI
11. Epic 11: Security, Privacy, and Product Guardrails
12. Epic 12: Quality Assurance and Release Readiness

## Suggested Sprint Breakdown

| Sprint   | Primary backlog focus                                         |
| -------- | ------------------------------------------------------------- |
| Sprint 1 | Epic 1, Epic 2, and the start of Epic 3                       |
| Sprint 2 | Finish Epic 3, Epic 4, and Epic 10 auth/dashboard shell tasks |
| Sprint 3 | Epic 5 and Epic 6                                             |
| Sprint 4 | Epic 7 and Epic 9                                             |
| Sprint 5 | Epic 8 and Epic 10 result UI                                  |
| Sprint 6 | Epic 11 and Epic 12                                           |

## Definition of Done

A task is only considered done when all of the following are true:

- The implementation is committed in the intended folder structure.
- Validation and error handling are present.
- Access control requirements are covered where relevant.
- Manual verification has been performed for the user-visible flow.
- Tests are added for logic-heavy tasks when appropriate.
- Documentation is updated when the change affects system behavior.
