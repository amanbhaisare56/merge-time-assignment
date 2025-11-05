/**
 * Merges discontinuous time ranges within a given threshold.
 * 
 * @param {Array<[number, number]>} ranges - Array of [start, end) ranges (unsorted, may overlap)
 * @param {number} threshold - Max gap (in ms) allowed between ranges to still be merged
 * @returns {Array<[number, number]>} - Sorted, non-overlapping merged ranges
 */

const mergeTimeRanges = (ranges, threshold) => {
  if (!Array.isArray(ranges) || ranges.length === 0) return [];

  // Step 1: Sort ranges by their start time
  const sortedRanges = [...ranges].sort((a, b) => a[0] - b[0]);

  const merged = [];
  let currentRange = sortedRanges[0];

  for (let i = 1; i < sortedRanges.length; i++) {
    const [currStart, currEnd] = currentRange;
    const [nextStart, nextEnd] = sortedRanges[i];

    // If next range starts before or within the threshold gap
    if (nextStart <= currEnd + threshold) {
      // Merge by extending the current range's end if needed
      currentRange[1] = Math.max(currEnd, nextEnd);
    } else {
      // Push the current merged range and move to next
      merged.push(currentRange);
      currentRange = sortedRanges[i];
    }
  }

  // Push the last merged range
  merged.push(currentRange);

  return merged;
};

module.exports = {
  mergeTimeRanges
};
