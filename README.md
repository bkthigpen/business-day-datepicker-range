# Business Day Datepicker Range

A datepicker component made using Vite, React and TypeScript

## Project setup explanation: 

The project uses the following technologies

1. Vite
2. React
3. TypeScript

This project uses no date libraries or datepickers.

In addition, I've added eslint and prettier for linting and styling rules. I've also used the Airbnb eslint styleguide rules with a few modifications of my own (fixing EOL bug for Windows, etc.). 

### Completed Column ✓
- [x] The component should enable users to select a date range, defined by a start date and
an end date.
- [x] The selected date range should highlight only business days, and non-business days
should not be highlighted.
- [x] The user should be able to change the year displayed in the date picker.
- [x] The user should be able to change the month displayed in the date picker.
- [x] The component should include a value change handler that returns the selected date
range and any weekend dates within that range. As an example, if the range selected is
December 1st, 2022 to December 15th, 2022, the returned values should be an array
containing the date range as the first element (e.g. [2022-12-01, 2022-12-15]) and an
array of weekend dates within that range as the second element (e.g. [2022-12-03,
2022-12-04, 2022-12-10, 2022-12-11]).
- [x] The component should include a prop that allows the user to input predefined ranges,
such as the last 7 days or last 30 days. These predefined ranges should be displayed
below the calendars (Please see the below example).

### TODO Items
- [ ] Update the styles
- [ ] Componentize select dropdowns and other itemsd
- [ ] Break useEffect into a hook
- [ ] General cleanup
