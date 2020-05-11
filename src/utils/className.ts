export const cxs = (...cxs: (string | undefined)[]) =>
  cxs
    .filter((x): x is string => x !== undefined)
    .reduce<string[]>((accum, item) => {
      return accum.concat(item);
    }, [])
    .join(" ");
