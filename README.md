# Example of CircleCI split limitations with test startup time

The basic issue is that CircleCI doesn't account for time in the test suite outside of the test case when splitting, even when the split is above the level of the test suite. In a large codebase using Jest, importing all the code under test often dominates runtime, so this produces extremely poor splits. (This is a structural feature of Jest, as far as I can tell -- it's very slow to import files because it does so in a separate node vm context per test file, among other reasons; see e.g. jestjs/jest#9554 -- so if the test cases are fast almost all of the time is in "setup".)

## This repo

In this repo we have 6 test files; each has a `beforeAll` hook that takes 1000ms (to simulate that it's slow to import a large codebase). One has a single test that takes 10ms; the others all have tests that are no-ops. This means the 5 "fast" test files take 1000ms in total, and the one "slow" test file takes 1010ms. (Actually there's some additional time from Jest; but this if anything exacerbates the issue by making the startup time for each test closer to 1200ms.)

Because CircleCI doesn't see the time in test setup, it tries to put all 5 fast tests on the same worker, and the one slow test on the other worker, even though from the full timings that's obviously much slower than any combination of 3 and 3. You can see an example of this in run #13. (Of course in such a small repo, the ultimate skew is quite small and dwarfed by startup time variation, but you can see from the Jest output that worker #1 takes over 4x as long in the actual test run as worker #2.)
