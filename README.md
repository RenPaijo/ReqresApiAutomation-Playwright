# Reqres API Test Automation

API integration tests for [Reqres](https://reqres.in/) using Cucumber, TypeScript, Chai, and Faker. The suite covers list, detail, create, update, and delete user requests and generates JSON and HTML reports.

## Test Coverage

| Method | Endpoint | Scenarios | Validation |
| --- | --- | ---: | --- |
| GET | `/users?page=1` | 2 | Status, pagination fields, response type, and user array |
| GET | `/users/:id` | 2 | Existing user structure and missing-user response |
| POST | `/users` | 2 | Creation status and returned fields |
| PUT | `/users/:id` | 2 | Update status and timestamp |
| DELETE | `/users/:id` | 2 | Deletion status for existing and unknown IDs |

The suite currently contains 5 feature files, 10 scenarios, and 64 Cucumber steps including hooks.

## Requirements

- Node.js 22, 24, or 26 and newer
- npm
- Network access to `https://reqres.in`

The API is external and rate-limited. Set `REQRES_API_KEY` when you have a Reqres API key, especially for repeated local or CI runs.

## Installation

```bash
git clone https://github.com/RenPaijo/ReqresApiAutomation-Playwright.git
cd ReqresApiAutomation-Playwright
npm ci
```

Use `npm install` instead of `npm ci` only when intentionally updating dependencies.

## Commands

| Command | Purpose |
| --- | --- |
| `npm test` | Run all Cucumber scenarios, then generate JSON and HTML reports |
| `npm run test:cucumber` | Run all scenarios and generate the Cucumber JSON result |
| `npm run test:specific` | Run `tests/features/get_users.feature` only |
| `npm run typecheck` | Validate TypeScript without emitting build output |
| `npm run report:generate` | Rebuild HTML from an existing Cucumber JSON result |
| `npm run report:html` | Serve the generated HTML report at `http://localhost:4000` |
| `npm run clean` | Remove generated JSON and HTML reports |
| `npm run setup` | Install dependencies with `npm install` |

Run one feature directly:

```bash
npx @cucumber/cucumber tests/features/get_single_user.feature --require "tests/support/*.ts" --format progress
```

Run one scenario by name:

```bash
npx @cucumber/cucumber tests/features/get_users.feature --require "tests/support/*.ts" --name "Verify GET users list response structure" --format progress
```

## Configuration

The helper reads configuration directly from process environment variables. A `.env` file is not loaded automatically.

| Variable | Required | Default | Purpose |
| --- | --- | --- | --- |
| `API_BASE_URL` | No | `https://reqres.in/api` | Override the API base URL |
| `REQRES_API_KEY` | No | None | Add an `x-api-key` header to Reqres requests |

PowerShell example:

```powershell
$env:REQRES_API_KEY = "your-key"
npm test
```

Bash example:

```bash
REQRES_API_KEY="your-key" npm test
```

Do not commit API keys or local environment files. Files matching `*.env` are ignored by Git.

## Reports

`npm test` writes:

- `tests/report/cucumber-report.json`: machine-readable Cucumber results
- `tests/report/html-report/index.html`: generated execution summary

To view the HTML report through a local server:

```bash
npm run report:html
```

The report directories are generated artifacts and are ignored by Git. `tests/report/.gitkeep` only preserves the directory in the repository.

## Project Structure

```text
.
|-- .github/workflows/
|   |-- ci.yml                 # Push and pull-request checks
|   `-- nightly.yml            # Daily and manually triggered checks
|-- scripts/
|   `-- generate-reports.js    # Converts Cucumber JSON into HTML
|-- tests/
|   |-- features/              # Gherkin scenarios
|   |-- report/                # Generated reports
|   |-- steps/                 # TypeScript step definitions and API helper
|   `-- support/               # Step loader and Cucumber hooks
|-- cucumber.json              # Cucumber defaults
|-- package.json               # Commands and dependencies
`-- tsconfig.json              # TypeScript configuration
```

The API response and request payload are stored on Cucumber's scenario World. This keeps scenario state isolated instead of sharing mutable module-level state.

## Continuous Integration

The CI workflow runs on pushes and pull requests targeting `main` or `master` with Node.js 22 and 24. Each job performs:

1. `npm ci`
2. `npm run typecheck`
3. `npm test`
4. Upload of JSON and HTML reports with 30-day retention

The nightly workflow runs daily at `02:00 UTC`, can also be started manually, uses Node.js 24, and retains reports for 14 days.

Because these are live integration tests, CI can fail when Reqres is unavailable or returns HTTP `429 Too Many Requests`. Configure `REQRES_API_KEY` as a repository secret and expose it to the test step if higher limits are required.

## Adding Tests

1. Add or update a `.feature` file under `tests/features/`.
2. Add TypeScript step definitions under `tests/steps/`.
3. Import new step files from `tests/support/index.ts`.
4. Run `npm run typecheck` and the relevant Cucumber test.

## License

ISC
