import { VictoryThemeDefinition } from 'victory';

const colors = [
  '#252525',
  '#525252',
  '#737373',
  '#969696',
  '#bdbdbd',
  '#d9d9d9',
  '#f0f0f0',
];
const charcoal = '#252525';
const grey = '#969696';
const sansSerif =
  "'Gill Sans', 'Gill Sans MT', 'Ser­avek', 'Trebuchet MS', sans-serif";
const letterSpacing = 'normal';
const fontSize = 14;

const baseProps = {
  width: 600,
  height: 300,
  padding: 50,
  colorScale: colors,
};

const baseLabelStyles = {
  fontFamily: sansSerif,
  fontSize,
  letterSpacing,
  padding: 10,
  fill: grey,
  stroke: 'transparent',
};

const centeredLabelStyles = Object.assign(
  { textAnchor: 'middle' },
  baseLabelStyles,
);

// Strokes
const strokeLinecap = 'round';
const strokeLinejoin = 'round';

// Put it all together...
const theme: VictoryThemeDefinition = {
  axis: Object.assign(
    {
      axis: {
        fill: 'transparent',
        stroke: charcoal,
        strokeWidth: 1,
        strokeLinecap,
        strokeLinejoin,
      },
      axisLabel: Object.assign({}, centeredLabelStyles, {
        padding: 25,
      }),
      grid: {
        fill: 'none',
        stroke: 'none',
        pointerEvents: 'painted',
      },
      ticks: {
        fill: 'transparent',
        size: 1,
        stroke: 'transparent',
      },
      tickLabels: baseLabelStyles,
    },
    baseProps,
  ),
  line: Object.assign(
    {
      data: {
        fill: 'transparent',
        stroke: charcoal,
        strokeWidth: 2,
      },
      labels: centeredLabelStyles,
    },
    baseProps,
  ),
};

export default theme;
