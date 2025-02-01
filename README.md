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

# Notes

- The table is created with CSS grid, rather than HTML tables. Tables are old-school and it's easier to do things like animations with css grid layouts.
- Bank holidays aren't considered in this solution
- I planned for some nice input validation and error reporting, but for now, it only checks that generated Date objects are valid dates. This is enough as an MVC, but ideally, we should be validating all fields.
- GMT dates are converted to Europe/London. This was unspecified in the brief.
