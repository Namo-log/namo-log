import {
  gray,
  grayDark,
  blue,
  blueDark,
  red,
  redDark,
  green,
  greenDark,
  indigo,
  indigoDark,
  orange,
  orangeDark
} from "@radix-ui/colors"

export type Colors = typeof colors.light & typeof colors.dark

export const colors = {
  light: {
    ...indigo,
    ...gray,
    ...blue,
    ...red,
    ...green,
    ...orange,
  },
  dark: {
    ...indigoDark,
    ...grayDark,
    ...blueDark,
    ...redDark,
    ...greenDark,
    ...orangeDark,
  },
}
