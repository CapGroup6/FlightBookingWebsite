# FlightBookingWebsite

------------
Solution to `npm error Invalid Version: 18`:
In package.json, find `react` and `react-dom`, change them from `^18` to `^18.3.1`; delete the package-lock.json, and then run:
```bash
npm install next react react-dom
```
```bash
npm run dev
```
