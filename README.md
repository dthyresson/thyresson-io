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
```

You can push your local schema changes to your remote database via the CLI using the `astro db push --remote` command:

```bash
pnpm astro db push --remote
```

Seed the *remote* database (Caution!)

```bash
pnpm astro db execute db/seed.ts --remote
```


## Blog Image Generation
You can run the script using one of these commands:

```bash
# Basic run
pnpm tsx scripts/process-blog-images.ts

# With options
pnpm tsx scripts/process-blog-images.ts --style "watercolor" --period "renaissance"
```
