# Sold Stock Decision Tool

Sold Stock Decision Tool helps a dealership review old vehicle URLs one by one. Record the stock state, remaining useful content and any genuinely relevant destination before choosing what should happen next.

It produces a review log rather than changing a live website. Search outcomes depend on more than this decision, and a reviewer must approve every action. Maintained by [SEO for Car Dealerships](https://seoforcardealerships.co.uk/), operated by JW Digital Services Ltd.

![Complete example](docs/preview.png)

## Live demo

[Try Sold Stock Decision Tool](https://seo-for-car-dealerships.github.io/sold-stock-decision-tool/). The demo runs in your browser; entered data is not uploaded by the tool. GitHub provides the hosting and handles request logs.

## Start locally

Requires Node.js 22 or later. No runtime dependencies or account required.

```sh
npm ci
npm test
npm run build
npm run serve
```

Open http://127.0.0.1:4173/ for the complete local demonstration. Browser examples do not upload or persist entered data. The optional development server binds to loopback only.

## Input and output

Supply dealer and records: stock_id, url, stock_status, sold_on, remaining_content, proposed_destination, destination_relevance (relevant/irrelevant/unknown), evidence_note, reviewer and decision (gather/keep/replace/retire). No live edits or generated redirect configuration.

Use [examples/input.json](examples/input.json) as the complete input contract. Compare the generated [JSON result](examples/output.json), [Markdown report](examples/output.md) and [complete HTML](examples/output.html). The demo is in [demo/index.html](demo/index.html). It needs the local server for JavaScript modules. HTML reports can be opened as standalone files.

```sh
node cli.mjs examples/input.json --format json
node cli.mjs examples/input.json --format html --output report.html
node cli.mjs examples/input.json --format md --output report.md
```

Flat collections can also be imported with `--csv data.csv --context context.json --key items` (replace `items` with the documented collection). Nested structures use JSON. See `node cli.mjs --help`.

## Worked example

Use five synthetic stock records: a sold page with useful original content, a possible genuinely related successor needing review, a thin retired listing, contradictory stock status and a missing evidence record. Use abstract stock IDs, without real registrations, VINs or copied dealer listings.

All supplied example records are synthetic. No clients, outcomes, current professional advice or real service availability are represented by them. Keep real records private and review output before sharing it.

## Checks

- Missing information and conflicting stock status generate review tasks, never automatic redirects.
- An unrelated proposed destination is not labelled equivalent. A supplied URL and its rationale remain separately reviewable.
- Reviewer decisions, timestamps and changes are recorded without overwriting the original evidence.
- No blanket redirect configuration or claims of retained rankings appear in outputs.
- Test data stays local, exports escape input safely and no real dealership account is accessed.

The automated results and browser checks performed for this release are recorded in [verification.md](docs/verification.md). Manual screen-reader testing has not been performed. A passing automated check is not accessibility certification.

## Contribute and maintain

Use [Issues](https://github.com/SEO-For-Car-Dealerships/sold-stock-decision-tool/issues) for a reproducible bug and [Discussions](https://github.com/SEO-For-Car-Dealerships/sold-stock-decision-tool/discussions) for questions and improvements. Follow [CONTRIBUTING.md](CONTRIBUTING.md); report vulnerabilities privately using [SECURITY.md](SECURITY.md). See [CHANGELOG.md](CHANGELOG.md) for releases. Maintenance is best effort.

Code, original illustrations and synthetic fixtures are MIT licensed. There is no required website backlink when reusing the resource. Commercial brand assets and third-party material are not included.

## CSV example

```sh
node cli.mjs --csv examples/input.csv --context examples/context.json --key records --format html --output csv-report.html
```

The context holds the root settings; the CSV holds the flat collection. Explicit booleans use `true` or `false`. Nested data uses JSON.
