interface PrimarySecondaryColor {
  300: string;
  500: string;
  700: string;
}

export type ReadonlyPrimarySecondaryColor = Readonly<PrimarySecondaryColor>;

export const linearGradient = (color: ReadonlyPrimarySecondaryColor): string =>
  `linear-gradient(276.34deg, ${color["700"]} 0%, ${color["300"]} 100%)`;
