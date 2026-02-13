import { isString } from './isString.js';

const CHANNEL = String.raw`\d{1,3}`;
const ALPHA = String.raw`(0|1|0?\.\d+)`;

/** Matches rgb(...) and rgba(...) color strings. */
function isRgbColor(value: string): boolean {
  const pattern = new RegExp(
    String.raw`^rgba?\(\s*${CHANNEL}\s*,\s*${CHANNEL}\s*,\s*${CHANNEL}\s*(,\s*${ALPHA})?\s*\)$`,
  );
  return pattern.test(value);
}

/** Matches hsl(...) and hsla(...) color strings. */
function isHslColor(value: string): boolean {
  const pattern = new RegExp(
    String.raw`^hsla?\(\s*${CHANNEL}\s*,\s*${CHANNEL}%\s*,\s*${CHANNEL}%\s*(,\s*${ALPHA})?\s*\)$`,
  );
  return pattern.test(value);
}

/**
 * Checks if a value is a valid data URI string.
 * @param value - The value to check
 * @returns `true` if the value is a valid data URI
 * @example isDataURI('data:text/plain;base64,SGVsbG8=') // true
 */
export function isDataURI(value: unknown): value is string {
  if (!isString(value)) {
    return false;
  }
  return /^data:[a-z]+\/[\w+.-]+(?:;[\w=]+)*(?:;base64)?,[\w+/=]*$/i.test(value);
}

/**
 * Checks if a value is a valid CSS color string.
 * Supports hex (#fff, #ffffff, #ffffffff), rgb(), rgba(), hsl(), hsla(), and named colors.
 * @param value - The value to check
 * @returns `true` if the value is a valid CSS color string
 * @example isCSSColor('#ff0000') // true
 * @example isCSSColor('rgb(255, 0, 0)') // true
 * @example isCSSColor('red') // true
 */
export function isCSSColor(value: unknown): value is string {
  if (!isString(value)) {
    return false;
  }

  const trimmed = value.trim().toLowerCase();

  // Hex colors
  if (/^#([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(trimmed)) {
    return true;
  }

  // rgb/rgba
  if (isRgbColor(trimmed)) {
    return true;
  }

  // hsl/hsla
  if (isHslColor(trimmed)) {
    return true;
  }

  // Named colors (common subset)
  const namedColors = new Set([
    'aliceblue', 'antiquewhite', 'aqua', 'aquamarine', 'azure', 'beige', 'bisque',
    'black', 'blanchedalmond', 'blue', 'blueviolet', 'brown', 'burlywood', 'cadetblue',
    'chartreuse', 'chocolate', 'coral', 'cornflowerblue', 'cornsilk', 'crimson', 'cyan',
    'darkblue', 'darkcyan', 'darkgoldenrod', 'darkgray', 'darkgreen', 'darkgrey',
    'darkkhaki', 'darkmagenta', 'darkolivegreen', 'darkorange', 'darkorchid', 'darkred',
    'darksalmon', 'darkseagreen', 'darkslateblue', 'darkslategray', 'darkslategrey',
    'darkturquoise', 'darkviolet', 'deeppink', 'deepskyblue', 'dimgray', 'dimgrey',
    'dodgerblue', 'firebrick', 'floralwhite', 'forestgreen', 'fuchsia', 'gainsboro',
    'ghostwhite', 'gold', 'goldenrod', 'gray', 'green', 'greenyellow', 'grey', 'honeydew',
    'hotpink', 'indianred', 'indigo', 'ivory', 'khaki', 'lavender', 'lavenderblush',
    'lawngreen', 'lemonchiffon', 'lightblue', 'lightcoral', 'lightcyan',
    'lightgoldenrodyellow', 'lightgray', 'lightgreen', 'lightgrey', 'lightpink',
    'lightsalmon', 'lightseagreen', 'lightskyblue', 'lightslategray', 'lightslategrey',
    'lightsteelblue', 'lightyellow', 'lime', 'limegreen', 'linen', 'magenta', 'maroon',
    'mediumaquamarine', 'mediumblue', 'mediumorchid', 'mediumpurple', 'mediumseagreen',
    'mediumslateblue', 'mediumspringgreen', 'mediumturquoise', 'mediumvioletred',
    'midnightblue', 'mintcream', 'mistyrose', 'moccasin', 'navajowhite', 'navy',
    'oldlace', 'olive', 'olivedrab', 'orange', 'orangered', 'orchid', 'palegoldenrod',
    'palegreen', 'paleturquoise', 'palevioletred', 'papayawhip', 'peachpuff', 'peru',
    'pink', 'plum', 'powderblue', 'purple', 'rebeccapurple', 'red', 'rosybrown',
    'royalblue', 'saddlebrown', 'salmon', 'sandybrown', 'seagreen', 'seashell', 'sienna',
    'silver', 'skyblue', 'slateblue', 'slategray', 'slategrey', 'snow', 'springgreen',
    'steelblue', 'tan', 'teal', 'thistle', 'tomato', 'transparent', 'turquoise', 'violet',
    'wheat', 'white', 'whitesmoke', 'yellow', 'yellowgreen',
  ]);

  return namedColors.has(trimmed);
}
