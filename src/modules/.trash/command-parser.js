import tokenize from "yargs-parser/lib/tokenize-arg-string";

export const parse = (input, opt) => {
  if (typeof input !== "string") return;
  const tokens = tokenize(input).map(token => {
    const [key, ...values] = token.split(":");
    if (values.length > 0) {
      return [key, values.join(":")];
    } else {
      return [key];
    }
  });

  return tokens.reduce(
    (current, token) => {
      if (token.length > 1 && opt[token[0]]) {
        switch (opt[token[0]]) {
          case String:
            current.data[token[0]] = String(token[1]);
            break;
          case Number:
            current.data[token[0]] = isNaN(token[1]) ? 0 : Number(token[1]);
            break;
          case Boolean:
            current.data[token[0]] = Boolean(Number(token[1]));
            break;
        }
      } else {
        current.args.push(token.join(":"));
      }
      return current;
    },
    { args: [], data: {} }
  );
};
