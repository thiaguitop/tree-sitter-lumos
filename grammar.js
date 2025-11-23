module.exports = grammar({
  name: 'lumos',

  rules: {
    source_file: $ => repeat($._definition),

    _definition: $ => choice(
      $.struct_definition,
      $.enum_definition,
      $.comment,
    ),

    struct_definition: $ => seq(
      repeat($.attribute),
      'struct',
      field('name', $.identifier),
      field('body', $.struct_body),
    ),

    struct_body: $ => seq(
      '{',
      repeat($.field),
      '}',
    ),

    field: $ => seq(
      field('name', $.identifier),
      ':',
      field('type', $._type),
      optional(','),
    ),

    enum_definition: $ => seq(
      repeat($.attribute),
      'enum',
      field('name', $.identifier),
      field('body', $.enum_body),
    ),

    enum_body: $ => seq(
      '{',
      repeat(seq($.enum_variant, optional(','))),
      '}',
    ),

    enum_variant: $ => choice(
      $.identifier,
      seq($.identifier, '(', commaSep($._type), ')'),
      seq($.identifier, $.struct_body),
    ),

    attribute: $ => seq(
      '#[',
      $.identifier,
      optional(seq('=', $.string_literal)),
      ']',
    ),

    _type: $ => choice(
      $.primitive_type,
      $.solana_type,
      $.array_type,
      $.option_type,
      $.vec_type,
      $.identifier,
    ),

    primitive_type: $ => choice(
      'u8', 'u16', 'u32', 'u64', 'u128',
      'i8', 'i16', 'i32', 'i64', 'i128',
      'bool', 'String',
    ),

    solana_type: $ => choice(
      'PublicKey',
      'Signature',
    ),

    vec_type: $ => seq(
      'Vec',
      '<',
      field('element', $._type),
      '>',
    ),

    option_type: $ => seq(
      'Option',
      '<',
      field('inner', $._type),
      '>',
    ),

    array_type: $ => seq(
      '[',
      field('element', $._type),
      ']',
    ),

    identifier: $ => /[a-zA-Z_][a-zA-Z0-9_]*/,

    string_literal: $ => /"[^"]*"/,

    comment: $ => choice(
      $.line_comment,
      $.block_comment,
    ),

    line_comment: $ => /\/\/[^\n]*/,
    block_comment: $ => /\/\*[\s\S]*?\*\//,
  }
});

function commaSep(rule) {
  return optional(commaSep1(rule));
}

function commaSep1(rule) {
  return seq(rule, repeat(seq(',', rule)));
}
