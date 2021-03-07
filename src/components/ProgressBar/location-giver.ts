const LOCATIONS = [
  {
    title: 'London',
    distanceFromLastLocation: 0,
    distanceFromStartPoint: 0,
  },
  {
    title: 'Paris',
    distanceFromLastLocation: 342,
    distanceFromStartPoint: 342,
  },
  {
    title: 'Berlin',
    distanceFromLastLocation: 878,
    distanceFromStartPoint: 1220,
  },
  {
    title: 'Warsaw',
    distanceFromLastLocation: 516,
    distanceFromStartPoint: 1736,
  },
  {
    title: 'Kyiv',
    distanceFromLastLocation: 687,
    distanceFromStartPoint: 2423,
  },
  {
    title: 'Moscow',
    distanceFromLastLocation: 756,
    distanceFromStartPoint: 3179,
  },
];

export const calculateLocations = async () => {
  const response = await fetch(
    'https://spreadsheets.google.com/feeds/cells/1oVbQ8TvDtz8PZsUHe3jbr9ggtbEztAtKahSXEgVuD5c/1/public/full?alt=json'
  );
  const data = (await response.json()) as any;

  const grandTotalCell = data.feed.entry.find(
    (cell: { content: { $t: string } }) => cell.content.$t === 'GRAND TOTAL'
  )?.gs$cell;

  if (!grandTotalCell) {
    throw new Error('Could not find cell with content "GRAND TOTAL"');
  }

  const totalKmWalked = data.feed.entry
    .filter(
      (cell: { gs$cell: { row: string; col: string } }) =>
        parseInt(cell.gs$cell.row, 10) > parseInt(grandTotalCell.row, 10) &&
        parseInt(cell.gs$cell.col, 10) === parseInt(grandTotalCell.col, 10)
    )
    .map((cell: { content: { $t: string } }) => parseFloat(cell.content.$t))
    .reduce(
      (accumulator: any, currentValue: any) => accumulator + currentValue
    );

  const locationsReached = LOCATIONS.filter(
    (location) => location.distanceFromStartPoint < totalKmWalked
  );

  return {
    locationsReachedAndNext: LOCATIONS.filter(
      (_, index) => index <= locationsReached.length
    ),
    reached: locationsReached.length - 1,
    next: locationsReached.length,
    totalKmWalked,
  };
};
