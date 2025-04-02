class Path {
  constructor(position, parent = null) {
    this.position = position;
    this.parent = parent;
  }
}

const graph = {
  limit: 7,
  visited: new Set(),
};

function traverse(path) {
  let [xPos, yPos] = JSON.parse(path.position);

  let temp = [];

  // Horizontal
  for (let i = -2; i <= 2; i += 4) {
    let xTempPos, yTempPos;
    xTempPos = xPos + i;
    if (xTempPos < 0 || xTempPos > graph.limit) continue;

    for (let j = -1; j <= 1; j += 2) {
      yTempPos = yPos + j;

      if (yTempPos < 0 || yTempPos > graph.limit) continue;

      temp.push(JSON.stringify([xTempPos, yTempPos]));
    }
  }
  // Vertical
  for (let i = -1; i <= 1; i += 2) {
    let xTempPos, yTempPos;
    xTempPos = xPos + i;
    if (xTempPos < 0 || xTempPos > graph.limit) continue;

    for (let j = -2; j <= 2; j += 4) {
      yTempPos = yPos + j;
      if (yTempPos < 0 || yTempPos > graph.limit) continue;
      temp.push(JSON.stringify([xTempPos, yTempPos]));
    }
  }

  temp = temp.filter((element) => (graph.visited.has(element) ? false : true));

  return temp;
}

function checkEnd(paths) {
  if (paths.includes(graph.end)) return true;
  return false;
}

function backTrack(path) {
  const shortestPath = [graph.end];

  while (path !== null) {
    shortestPath.unshift(path.position);
    path = path.parent;
  }

  return shortestPath;
}

function knightMoves(start, end) {
  let path = new Path(JSON.stringify(start));

  graph.end = JSON.stringify(end);
  graph.visited.add(path.position);

  const queue = [path];

  while (queue.length !== 0) {
    const paths = traverse(path);

    if (checkEnd(paths)) {
      graph.shortestPath = backTrack(path);
      break;
    }

    paths.forEach((pos) => {
      const temp = new Path(pos, path);
      graph.visited.add(temp.position);
      queue.push(temp);
    });

    queue.shift();
    path = queue[0];
  }

  return graph.shortestPath;
}

console.log(knightMoves([0, 0], [1, 3]));