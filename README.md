# Danny Walters - Further tech test

## Prequisites

- Node, Pnpm

## Installation & Setup

This is a vite project with React / TS. To set up, run `pnpm i`

- Launch app on port 5173: `pnpm dev`
- Tests `pnpm test`

## Packages used

- Dates: `date-fns` & `@date-fns/tz`
- Styles: `tailwind` and `clsx`

## Description

React component creates a WebRequest object for each table row, which contains dates and times as strings

On input change, the row is revalidated by:

- setting the correct timezone based on location
- converting dates and times into date objects in the Europe/London timezone
- calculating latest approval time, based on the TOS and request source
- calculating actual refund time based on opening hours

The response returns an isValid boolean, along with either:

- a latestApprovalDate and adjustedRefundRequestDate
- an error string to say what went wrong

# Review notes

The recommended time for this was 2 hours. I solved the problem within the recommended time, but probably spent 3-4 hours total after cleaning up and refactoring to a presentable level.

Here's my own review of what I missed or could have done better:

- In `request-row.tsx`, selection options should be typed.
- The `WebRequest` object should be validated properly with Zod/Superstruct, then generate an inferred type from the validation object.
- Naming: `WebRequest` and `ValidRequest` are ambiguous name choices. Better names would be `InvestmentRefundRequestParams` and `InvestmentRefundRequest`.
- The spec says that phone call requests respect business hours. UK public holidays should be considered out of hours.
- An incorrect timezone assumes 'Europe/London'. An invalid source assumes 'web app'. These should throw a validation error, rather than making assumptions.
- I typed `webapp` not `web app`. Sloppy.
- Input dates and times should be trimmed to avoid unneccesary errors.
- Incomplete testing. Cover all the edge cases.
- `dates.test.ts` tests are testing too many things in each test. Iterating test cases such as in `validate-request.test.ts` is better as it means more granular results.
- I accidentally exposed my preference to not use semicolons. Add a prettier config file to enforce standards. Node version should also be specified in `package.json`.
- Missing useCallback optimisations in React. AFAIK the react v19 compiler automatially adds these optimisations, but this project is using react v18.

# Previous Notes

- The table is created with CSS grid, rather than HTML tables. Tables are old-school and it's easier to do things like animations with css grid layouts.
- Bank holidays aren't considered in this solution
- I planned for some nice input validation and error reporting, but for now, it only checks that generated Date objects are valid dates. This is enough as an MVC, but ideally, we should be validating all fields.
- GMT dates are converted to Europe/London. This was unspecified in the brief.
