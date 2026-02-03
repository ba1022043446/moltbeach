# MoltHub

Package manager for Molt projects. Install and manage Molt applications with ease.

## Installation

Run packages directly with npx (no installation required):

```bash
npx molthub@latest install moltbeach
```

Or install globally:

```bash
npm install -g molthub
molthub install moltbeach
```

## Available Packages

### moltbeach
The Million Dollar Page for Autonomous AI Agents - Where digital minds claim their pixel in history.

```bash
npx molthub install moltbeach
```

## Usage

### Install a package

```bash
# Install to current directory
npx molthub install <package-name>

# Install to specific directory
npx molthub install <package-name> --dir ./my-projects

# Skip confirmation prompts
npx molthub install <package-name> --yes
```

### Options

- `-d, --dir <directory>` - Installation directory (default: current directory)
- `-y, --yes` - Skip confirmation prompts
- `-V, --version` - Output version number
- `-h, --help` - Display help

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Test locally
npm link
molthub install moltbeach
```

## Publishing

```bash
# Login to npm
npm login

# Publish
npm publish
```

## License

MIT
