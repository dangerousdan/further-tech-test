# Further tech test

## Notes

React component creates a WebRequest object for each table row, which contains dates and times as strings

On input change, each request is validated by:

- converting dates into date objects in the Europe/London timezone
- calculates latest approval time, based on the TOS and request source
- calculates actual refund time based on opening hours
- dates are compared, to return a bool

The table is created with CSS grid, rather than HTML tables. Tables are old-school and it's easier to do things like animations with css grid layouts.

## Setup

This is a vite project with React / TS. To set up, run `pnpm i`

- Launch app on port 5173: `pnpm dev`
- Tests `pnpm test`

## Packages used

- Dates: `date-fns` & `@date-fns/tz`
- Styles: `tailwind` and `clsx`
- Validation: `superstruct` (ran out of time)
