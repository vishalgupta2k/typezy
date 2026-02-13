# Contributing to typezy

Thank you for your interest in contributing! 🎉

## How to Contribute

### Reporting Bugs
- Open an issue on GitHub
- Include a minimal reproduction
- Describe expected vs actual behavior

### Suggesting Features
- Open an issue with `[Feature]` prefix
- Explain the use case
- Provide examples if possible

### Submitting Pull Requests

1. **Fork** the repository
2. **Clone** your fork:
   ```bash
   git clone https://github.com/vishalgupta2k/typezy.git
   cd typezy
   npm install
   ```

3. **Create a branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make your changes**:
   - Add your function in `src/is/` or `src/utils/`
   - Export it from the appropriate `index.ts`
   - Add tests in `test/`
   - Update README if needed

5. **Run tests**:
   ```bash
   npm test
   npm run build
   ```

6. **Commit** with a clear message:
   ```bash
   git commit -m "Add isUsername function"
   ```

7. **Push** and create a PR:
   ```bash
   git push origin feature/your-feature-name
   ```
   Then open a Pull Request on GitHub.

## Code Style

- Use TypeScript strict mode
- Add JSDoc comments for all exported functions
- Keep functions pure (no side effects)
- Follow existing naming conventions (`isXxx`, `hasXxx`, `assertXxx`)

## Testing

- Every new function needs tests
- Aim for edge cases (null, undefined, empty values)
- Run `npm test` before submitting

## Questions?

Open an issue or reach out!
