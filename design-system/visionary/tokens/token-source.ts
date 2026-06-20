import { primitive } from "./primitive";

type Palette = keyof typeof primitive;

export type TokenSource<R extends string = string> = {
  ref: R;
  value: string;
};

export type ColorSource<P extends Palette = Palette> = TokenSource<`${P}.${string}`>;

export function color<P extends Palette>(
  palette: P,
  step: keyof (typeof primitive)[P] & (string | number),
): ColorSource<P> {
  return {
    ref: `${palette}.${String(step)}`,
    value: primitive[palette][step as keyof (typeof primitive)[P]] as string,
  };
}

export function literal(value: string): TokenSource {
  return { ref: value, value };
}

export function semanticRef(ref: string, value: string): TokenSource {
  return { ref, value };
}

function isTokenSource(value: unknown): value is TokenSource {
  return (
    typeof value === "object" &&
    value !== null &&
    "ref" in value &&
    "value" in value &&
    typeof (value as TokenSource).ref === "string" &&
    typeof (value as TokenSource).value === "string"
  );
}

type UnwrapValues<T> = T extends TokenSource
  ? string
  : T extends ReadonlyArray<infer U>
    ? ReadonlyArray<UnwrapValues<U>>
    : T extends object
      ? { [K in keyof T]: UnwrapValues<T[K]> }
      : T;

type UnwrapRefs<T> = T extends TokenSource
  ? T["ref"]
  : T extends ReadonlyArray<infer U>
    ? ReadonlyArray<UnwrapRefs<U>>
    : T extends object
      ? { [K in keyof T]: UnwrapRefs<T[K]> }
      : T;

function unwrapTree<T>(tree: T, pick: (source: TokenSource) => string): UnwrapValues<T> {
  if (isTokenSource(tree)) {
    return pick(tree) as UnwrapValues<T>;
  }

  if (tree !== null && typeof tree === "object" && !Array.isArray(tree)) {
    const out: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(tree)) {
      out[key] = unwrapTree(value, pick);
    }
    return out as UnwrapValues<T>;
  }

  return tree as UnwrapValues<T>;
}

export function unwrapValues<T>(tree: T): UnwrapValues<T> {
  return unwrapTree(tree, (source) => source.value);
}

export function unwrapRefs<T>(tree: T): UnwrapRefs<T> {
  return unwrapTree(tree, (source) => source.ref) as UnwrapRefs<T>;
}
