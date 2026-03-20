const forwardGraph = {}; 
const reverseGraph = {}; 

export const addDependencies = (cellId, dependencies) => {
  reverseGraph[cellId] = dependencies;

  dependencies.forEach((dep) => {
    if (!forwardGraph[dep]) {
      forwardGraph[dep] = [];
    }

    if (!forwardGraph[dep].includes(cellId)) {
      forwardGraph[dep].push(cellId);
    }
  });
};

export const getDependents = (cellId) => {
  return forwardGraph[cellId] || [];
};

export const getDependencies = (cellId) => {
  return reverseGraph[cellId] || [];
};

export const getAllDependents = (cellId) => {
  const visited = new Set();
  const result = [];

  const dfs = (node) => {
    const dependents = forwardGraph[node] || [];

    for (let dep of dependents) {
      if (!visited.has(dep)) {
        visited.add(dep);
        dfs(dep);
        result.push(dep);
      }
    }
  };

  dfs(cellId);
  return result;
};

// 🔥 Detect cycle using DFS
export const hasCycle = (start, target) => {
  const visited = new Set();

  const dfs = (node) => {
    if (node === target) return true;

    if (visited.has(node)) return false;
    visited.add(node);

    const neighbors = forwardGraph[node] || [];

    for (let next of neighbors) {
      if (dfs(next)) return true;
    }

    return false;
  };

  return dfs(start);
};