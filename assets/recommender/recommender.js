document.addEventListener("DOMContentLoaded", () => {
  const dimensionWeights = [0.14921, 0.16139, 0.10864, 0.09752, 0.09448, 0.08142, 0.07865, 0.07282];
  const clusterMeans = {
    0: [0.249053, -0.080032, -0.017682, -0.069967,  0.038991,  0.061582,  0.005178,  0.000579],
    1: [0.262984,  0.189522, -0.085679,  0.116146, -0.155535,  0.174491, -0.148607,  0.021532],
    2: [0.379506, -0.149562,  0.128452,  0.065387, -0.018421,  0.000803,  0.000122, -0.005868],
    3: [0.292106,  0.269329,  0.050015,  0.011941,  0.072518, -0.003838,  0.010615, -0.002157],
    4: [0.263478, -0.082743, -0.103096,  0.029240,  0.074446, -0.061853, -0.069044, -0.006481],
    5: [0.286028,  0.037230, -0.024730, -0.064091, -0.082715, -0.047946,  0.007292,  0.005726],
    6: [0.162790, -0.032305,  0.010795,  0.005012,  0.005087,  0.005957,  0.000144,  0.014120],
    7: [0.227468, -0.026946, -0.146283,  0.101795, -0.000715,  0.010981,  0.133357,  0.003663],
    8: [0.237599, -0.054014, -0.056930, -0.032819,  0.018249,  0.008775, -0.022155,  0.006228]
};
  const clusters = Object.keys(clusterMeans).map(Number);
  const meanVectors = Object.values(clusterMeans);

  // Compute means and stds
  const pcMean = meanVectors[0].map((_, colIndex) =>
    meanVectors.reduce((sum, row) => sum + row[colIndex], 0) / meanVectors.length
  );

  const pcStd = meanVectors[0].map((_, colIndex) => {
    const variance = meanVectors.reduce((sum, row) =>
      sum + Math.pow(row[colIndex] - pcMean[colIndex], 2), 0) / (meanVectors.length - 1);
    return Math.sqrt(variance) || 1.0;
  });

  // Update slider values
  const sliders = Array.from(document.querySelectorAll("input[type='range']"));
  sliders.forEach(slider => {
    slider.addEventListener("input", () => {
      document.getElementById(`${slider.id}-value`).textContent = slider.value;
    });
  });

  // Calculate and display result
  document.getElementById("submit-button").addEventListener("click", () => {
    const userVector = sliders.map(slider => parseFloat(slider.value));
    const standardizedMeanVectors = meanVectors.map(row => row.map((value, index) =>
      (value - pcMean[index]) / pcStd[index]
    ));
    const weightedMeanVectors = standardizedMeanVectors.map(row =>
      row.map((value, index) => value * dimensionWeights[index])
    );
    const weightedUserVector = userVector.map((value, index) =>
      value * dimensionWeights[index]
    );
    const dists = weightedMeanVectors.map(row =>
      Math.sqrt(row.reduce((sum, value, index) =>
        sum + Math.pow(value - weightedUserVector[index], 2), 0))
    );
    const closestCluster = clusters[dists.indexOf(Math.min(...dists))];
    document.getElementById("result").textContent = `The user is closest to cluster: ${closestCluster}`;
  });
});
