---
title: TradeZero Frontend Guidelines
---

This application follows a set of style guidelines for clarity. Evem
though this is a small demo project, it is desired to follow common
accepted standards to help understand and maintain the code.

# General

To maximize the readability and correctness of our code, we require that new submissions follow the
[JavaScript Standard Style](https://standardjs.com/).

Before committing, please run:

```bash
npm run style
```

In order to apply the coding style (where it can be done automatically). If an error is shown, please figure out what's
wrong, fix it and run standard again.

A few (but not all) of the things to keep in mind:

- Use camelCase with the leading character as lowercase for identifier names (variables and functions).
- Names start with a letter.
- Follow code indentation: Always use 2 spaces for code-block indentation.
- Avoid using global variables and avoid `==`.
- Please use `let` over `var`.
- Please refrain from using `console.log` or any other console methods.
- **Absolutely** don't use `alert`.
- We strongly recommend the use of ECMAScript 6.
- Avoid importing external libraries for basic algorithms. Only use those libraries for complicated algorithms.
- Most importantly:
  - **Be consistent in the use of these guidelines when submitting.**
  - Happy coding!


# Creating Unit Tests

For every new feature, unit tests should be created that both test and
(implicitly) document the usage of said feature. If submitting a patch
for a bug that had no unit test, a new passing unit test should be
added. If a submitted bug fix does have a unit test, be sure to add a
new one that fails without the patch and passes with the patch.


# Commit Messages

Follow [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) guidelines

Use one of the following prefixes (there might be other miscellaneous prefixes, though).
  * bugfix: A bug fix in an algorithm, workflow, configuration/settings, etc..
  * feat: New feature, such as new algorithms, new workflows, etc..
  * docs: Documentation changes or fixes, like improving the contributing guidelines, fixing a typo, etc..
  * test: Correct existing tests or add new ones.


Using a common format for commit messages will help keep our git history
readable.

The first line of the commit message should provide an accurate
description of the change and must be under 50 chars. It must be
followed by a blank line.

Following your brief summary, provide a more detailed description of the
patch, manually wrapping the text at 72 characters. This description
should provide enough detail that one does not have to refer to external
resources to determine its high-level functionality.
