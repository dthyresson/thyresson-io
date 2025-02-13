# David Thyresson

Personal website and blog built with Astro, Cursor, Netlify, fal, and Tailwind CSS.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                    | Action                                           |
| :------------------------- | :----------------------------------------------- |
| `pnpm install`             | Installs dependencies                            |
| `pnpm run dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm run build`           | Build your production site to `./dist/`          |
| `pnpm run preview`         | Preview your build locally, before deploying     |
| `pnpm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm run format`          | Format your code with Prettier                   |
| `pnpm run astro -- --help` | Get help using the Astro CLI                     |

## Astro DB / Turso

Show the database URL

```bash
turso db show <database-name> --url
```

Generate a new token

```bash
turso db tokens create <database-name>
```

### Set envars

```
ASTRO_DB_REMOTE_URL=
ASTRO_DB_APP_TOKEN=
BSKY_USERNAME=
BSKY_PASSWORD=
```

You can push your local schema changes to your remote database via the CLI using the `astro db push --remote` command:

```bash
pnpm astro db push --remote
```

Seed the _remote_ database (Caution!)

```bash
pnpm astro db execute db/seed.ts --remote
```

## Blog Image Generation

I have a script that generates images for the blog posts using Langbase and FAL AI and saves them to the images folder.

You can run the script using one of these commands:

```bash
# Basic run
pnpm generate-images
```

You'll have to provide your own API keys for Langbase and FAL AI in the `.env` file.

```
LANGBASE_API_KEY=
FAL_API_KEY=
```
