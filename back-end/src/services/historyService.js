import History from '../database/models/history';

const ONE_HOUR_IN_MS = 60 * 60 * 1000;
const MIN_PROFIT_PERCENT_DIFF_TO_DELETE = 0.2;

// Determine if the current history should be deleted based on
// time difference and profit percentage difference
const shouldDeleteHistory = (current, previous) => {
  const { date: currentDate, lastModified: currentLastModified } = current;
  const { date: previousDate, lastModified: previousLastModified } = previous;

  const timeDiffMs = currentDate - previousDate;
  const profitPercentDiff = Math.abs(currentLastModified - previousLastModified);

  return timeDiffMs < ONE_HOUR_IN_MS || profitPercentDiff < MIN_PROFIT_PERCENT_DIFF_TO_DELETE;
};

// Remove duplicate history if it matches the deletion criteria
const removeDuplicateHistory = async (previous, current) => {
  const shouldDelete = previous &&
    current.userId === previous.userId &&
    shouldDeleteHistory(current, previous);
  if (shouldDelete) {
    await previous.destroy();
  }
  return { deleted: shouldDelete, history: current };
};

class HistoryService {
  // Main function to remove duplicate history records
  async removeDuplicateHistory() {
    try {
      // Fetch all history records, ordered by user ID and date
      const historyList = await History.findAll({
        order: [['userId', 'ASC'], ['date', 'ASC']],
      });

      // Initialize deleted flag and previousHistory variable
      let deleted = false;
      let previousHistory = null;

      // Iterate through sorted history records and remove duplicates
      await historyList.reduce(async (promise, history) => {
        await promise;
        const result = await removeDuplicateHistory(previousHistory, history);
        deleted = deleted || result.deleted;
        previousHistory = result.history;
      }, Promise.resolve());

      // Log the result of duplicate removal
      if (deleted) {
        console.log('___removeDuplicateHistoryTask___: Duplicates removed successfully!');
      } else {
        console.log('___removeDuplicateHistoryTask___: No duplicates found!');
      }
    } catch (error) {
      console.log(
        '___removeDuplicateHistoryTask___: Server error while removing duplicates!',
        error.message
      );
    }
  }
}

export default new HistoryService();
