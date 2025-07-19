export const buildPatterns = (size: number): Array<Array<number>> => {
  let patterns = [];

  for (let i = 0; i < size; i++) {
    let row = [];
    for (let j = 0; j < size; j++) {
      row.push(i * size + j);
    }
    patterns.push(row);
  }

  for (let i = 0; i < size; i++) {
    let row = [];
    for (let j = 0; j < size; j++) {
      row.push(i + j * size);
    }
    patterns.push(row);
  }

  let row = [];
  for (let i = 0; i < size; i++) {
    row.push(i + i * size);
  }
  patterns.push(row);

  row = [];
  for (let i = size - 1; i >= 0; i--) {
    row.push(i + i * size);
  }
  patterns.push(row);

  return patterns;
};

export const checkForWin = (
  patterns: Array<Array<number>>,
  baordState: Array<string>
): string => {
  for (let row of patterns) {
    let firstItem = row[0];
    let isWin = true;
    for (let col of row) {
      if (baordState[col] !== baordState[firstItem]) {
        isWin = false;
        break;
      }
    }
    if (isWin) {
      return baordState[firstItem];
    }
  }

  return "";
};
