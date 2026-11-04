# São Paulo in Layers

A personal, interactive portrait of São Paulo, Brazil — told through food, street art, green spaces, architecture, and everyday encounters.

Built for the **Cloudinary November Mini-Hack: Celebrate Where You're From**.

**[Live demo on Vercel](https://sp-layers.vercel.app/)** · **[Photo credits](dist/images/CREDITS.md)** · **[Cloudinary integration](CLOUDINARY.md)**

## Explore the city

- Discover **20 photo stories** across Flavors, Street Art, Breathing Spaces, and City & Memory.
- Switch between **Português (Brasil), English, and Español**, with light and dark themes.
- Pick three places, reorder them, and open an outing in Google Maps for walking, driving, or cycling.
- Find São Paulo on an optional Google Maps embed and search for individual locations.
- Reveal Cloudinary's crop and color treatment in the before-and-after comparison.
- Inspect the real transformation recipes, file formats, and prepared file sizes for every photo.
- Answer one observation question per story; feedback and retries encourage discovery.
- Complete the discovery passport to unlock a special postcard featuring all 20 photos.
- Export a personalized three-photo PNG or use supported native file sharing.

## How Cloudinary powers the experience

The 20 photographs were uploaded to Cloudinary and processed through its URL-based image transformation APIs. The app uses three prepared versions of every photograph, plus a cover image: **61 delivered files** in total.

| Version | Purpose | Typical transformation |
| --- | --- | --- |
| Optimized reference | Comparison baseline | `q_auto,w_1200` |
| Gallery crop | Cards and postcards | `q_auto,c_fill,g_auto,w_720,h_518` |
| Treated portrait | Before-and-after comparison | `q_auto,c_fill,g_auto,w_720,h_960/e_saturation:25/e_tint:12:df9a65` |

Earlier assets use `f_auto`; newer assets use `f_jpg` to pin the preparation format. Exact per-file transformations, URLs, MIME types, byte counts, and SHA-256 hashes are recorded in [the provenance manifest](dist/media/provenance.json).

Preparation is deliberate and separate from visits. The processed results are bundled with the app, so browsing, comparison, quizzes, and postcard composition make **no Cloudinary requests**. New media preparation consumes Cloudinary quota. The site host and Google Maps have their own service limits; old Cloudinary URLs and other projects in the same account are outside this isolation.

The **Behind the scenes with Cloudinary** section exposes the real recipes without making additional transformations during visits. Postcards are composed locally with Canvas.

## Run locally

Requires **Node.js 18 or later** for the local server and checks. There are no package dependencies or build step.

```sh
node scripts/serve.mjs
```

Open [http://127.0.0.1:4173](http://127.0.0.1:4173). If that port is in use:

```sh
node scripts/serve.mjs 4174
```

Any static HTTP server can serve the `dist/` directory. The production artifact is that directory, not the full source repository.

## Verify

```sh
node tests/security.cjs
node tests/journey.cjs
node tests/discoveries.cjs
node tests/spanish.cjs
```

The checks cover input validation, the content security policy, local media integrity, ordered map stops, quiz data, passport unlocking, Spanish coverage, and shared selection links.

## Privacy and security

- No account or login is required to explore the app.
- Theme, language, selection, discovered stories, and quiz answers stay in browser storage.
- Personal postcard messages are not persisted or included in shared selection links.
- The app does not request geolocation. Google Maps calculates routes after the visitor opens its links.
- The city map loads only after an explicit click; loading it sends a request to Google.
- No API secret or private credential is included in the client.
- The CSP limits images and connections to the app's own origin and permits only the specific Google Maps embed path for frames.

Some stories describe a neighborhood or a regional scene rather than a precise address. The generic street-market story cannot be used in an outing until replaced by a defined location. Visitors should review the resolved stops and current access conditions in Google Maps.

See [SECURITY.md](SECURITY.md) for scope and limitations.

## Repository layout

```text
dist/                  Static app, translations, favicon, and prepared media
  images/              Authors, sources, and photo licenses
  media/provenance.json Exact Cloudinary preparation records
scripts/serve.mjs       Dependency-free local preview server
scripts/prepare-media.mjs Explicit maintenance-only Cloudinary downloader
tests/                 Security and behavior checks
CLOUDINARY.md          Transformation evidence and preparation details
SECURITY.md            Privacy and security notes
```

## Branches

This repository uses exactly two branches:

- **Master** — published, stable source; the default branch.
- **Develop** — continued development.

The names are case-sensitive. The initial versions of both branches contain the same reviewed release. The hosting service maintains its own deployment source; that internal repository is separate from this public GitHub repository.

## Media attribution

Photographs belong to their credited authors. Each photograph retains its original license; crops, resizing, and color treatments are adaptations. Both postcard types include attribution. Full sources and licenses are available in [CREDITS.md](dist/images/CREDITS.md), in the app, and in the provenance records. The photographs do not represent personal statements by the project creator.

Google Maps is provided by Google. The favicon is a project-specific illustration of the city's layers and skyline.

## Production on Vercel

Primary URL: https://sp-layers.vercel.app/

The Vercel project `sp-layers` imports this GitHub repository, publishes the `Master` branch, and serves the `dist/` root directory with the Other preset. No build step or runtime secrets are required. Shared selection links use the active deployment origin. `Develop` remains the development branch.

## Performance and accessibility

The opening WebP image is 246,498 bytes (49% smaller than the previous image). Comparison images load lazily, scripts are deferred, and image dimensions reserve layout space. Mobile controls have larger touch targets; keyboard users can skip to the main content and retain focus when selecting places. Reduced-motion preferences are respected. All prepared photo assets remain local to the app, so visits make no Cloudinary requests.

