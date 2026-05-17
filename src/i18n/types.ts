export type Language = "pt" | "en";

export type WidenLiterals<T> =
  T extends (...args: infer Args) => infer Return ? (...args: Args) => Return :
  T extends string ? string :
  T extends number ? number :
  T extends boolean ? boolean :
  T extends readonly (infer U)[] ? readonly WidenLiterals<U>[] :
  T extends object ? { [K in keyof T]: WidenLiterals<T[K]> } :
  T;
