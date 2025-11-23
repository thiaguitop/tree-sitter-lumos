# tree-sitter-lumos

Tree-sitter grammar for [LUMOS](https://lumos-lang.org) - a type-safe schema language for Solana development.

## Features

- **Fast parsing**: Incremental, error-tolerant parsing
- **Syntax highlighting**: Accurate highlighting for all LUMOS syntax
- **Editor integration**: Works with Neovim, Emacs, and other Tree-sitter-enabled editors
- **Complete coverage**: Supports structs, enums, attributes, all types, and comments

## Installation

### Neovim (with nvim-treesitter)

```lua
{
  "nvim-treesitter/nvim-treesitter",
  opts = {
    ensure_installed = { "lumos" },
  },
}
```

### Manual Installation

```bash
git clone https://github.com/getlumos/tree-sitter-lumos
cd tree-sitter-lumos
npm install
npm run build
```

## Development

### Prerequisites

- Node.js (v16+)
- npm
- tree-sitter-cli

### Setup

```bash
# Install dependencies
npm install

# Generate parser
npm run build

# Run tests
npm test

# Parse a file
npm run parse examples/player.lumos
```

### Project Structure

```
tree-sitter-lumos/
├── grammar.js           # Grammar definition
├── queries/
│   └── highlights.scm   # Syntax highlighting queries
├── test/
│   └── corpus/          # Test cases
│       ├── struct.txt   # Struct tests
│       └── enum.txt     # Enum tests
├── src/                 # Generated parser (C code)
└── bindings/            # Language bindings
```

## Grammar Coverage

### Supported Syntax

- **Structs**: With fields and attributes
  ```lumos
  #[solana]
  #[account]
  struct Player {
      wallet: PublicKey,
      score: u64,
  }
  ```

- **Enums**: Unit, tuple, and struct variants
  ```lumos
  enum GameState {
      Active,
      Paused,
      Finished(u64),
      Custom { reason: String },
  }
  ```

- **Types**:
  - Primitives: `u8`, `u16`, `u32`, `u64`, `u128`, `i8`-`i128`, `bool`, `String`
  - Solana types: `PublicKey`, `Signature`
  - Complex: `Vec<T>`, `Option<T>`, `[T]`

- **Attributes**: `#[solana]`, `#[account]`, custom attributes with values

- **Comments**: Line (`//`) and block (`/* */`)

## Testing

Run the test suite:

```bash
npm test
```

Add new test cases in `test/corpus/`:

```
================
Test name
================

<LUMOS code>

---

<Expected parse tree>
```

## Integration

### Neovim

Use with [nvim-treesitter](https://github.com/nvim-treesitter/nvim-treesitter):

```lua
require('nvim-treesitter.configs').setup({
  ensure_installed = { "lumos" },
  highlight = { enable = true },
})
```

### Emacs

Use with [tree-sitter-mode](https://github.com/emacs-tree-sitter/tree-sitter-mode)

### Helix

Add to `languages.toml`:

```toml
[[language]]
name = "lumos"
scope = "source.lumos"
file-types = ["lumos"]
roots = []
comment-token = "//"
grammar = "lumos"
```

## Contributing

Contributions welcome! Please:

1. Add test cases for new syntax
2. Run `npm test` before submitting
3. Update README if adding features

## Resources

- [LUMOS Documentation](https://docs.lumos-lang.org)
- [Tree-sitter Documentation](https://tree-sitter.github.io/tree-sitter/)
- [Neovim Plugin](https://github.com/getlumos/nvim-lumos)

## License

Dual-licensed under MIT OR Apache-2.0

---

**Part of the [LUMOS](https://lumos-lang.org) ecosystem** 🚀
