export const getUniqueStatusAndPopulation = (
  statusObjects: { all_access_status: string; first_language_pop: number }[]
): { statusValue: string; count: number; population: number }[] => {
  const counts: Record<string, number> = {};
  const populations: Record<string, number> = {};
  statusObjects?.forEach((statusObject) => {
    const { all_access_status, first_language_pop } = statusObject;
    counts[all_access_status] = (counts[all_access_status] || 0) + 1;

    if (!populations[all_access_status]) {
      populations[all_access_status] = 0;
    }
    populations[all_access_status] += first_language_pop;
  });

  const uniqueStatusValues = Object.keys(counts);

  const result = uniqueStatusValues.map((status) => ({
    statusValue: status,
    count: counts[status],
    population: populations[status],
  }));

  return result;
};

export const getNotStartedCountnPop = (
  statusArray: { statusValue: string; count: number; population: number }[]
) => {
  const translationNotStartedStatus = statusArray.find(
    (status) => status.statusValue === "Translation Not Started"
  );
  return {
    count: translationNotStartedStatus
      ? translationNotStartedStatus.count.toString()
      : "NA",
    population: translationNotStartedStatus?.population.toString() || "NA",
  };
};

export const getInProgressCountnPop = (
  statusArray: { statusValue: string; count: number; population: number }[]
) => {
  const translationInProgressStatus = statusArray.find(
    (status) => status.statusValue === "Translation in Progress"
  );
  return {
    count: translationInProgressStatus
      ? translationInProgressStatus.count.toString()
      : "NA",
    population: translationInProgressStatus?.population.toString() || "NA",
  };
};

export const getGoalMetSecondLang = (
  statusArray: { statusValue: string; count: number; population: number }[]
) => {
  const translationNotStartedStatus = statusArray.find(
    (status) =>
      status.statusValue === "Goal Met - Scripture accessed via second language"
  );
  return {
    count: translationNotStartedStatus
      ? translationNotStartedStatus.count.toString()
      : "NA",
    population: translationNotStartedStatus?.population.toString() || "NA",
  };
};

export const getGoalMet = (
  statusArray: { statusValue: string; count: number; population: number }[]
) => {
  const translationInProgressStatus = statusArray.find(
    (status) => status.statusValue === "Goal Met in the language"
  );
  return {
    count: translationInProgressStatus
      ? translationInProgressStatus.count.toString()
      : "NA",
    population: translationInProgressStatus?.population.toString() || "NA",
  };
};

export const getNotShown = (
  statusArray: { statusValue: string; count: number; population: number }[]
) => {
  const translationInProgressStatus = statusArray.find(
    (status) => status.statusValue === "Not Shown"
  );
  return {
    count: translationInProgressStatus
      ? translationInProgressStatus.count.toString()
      : "NA",
    population: translationInProgressStatus?.population.toString() || "NA",
  };
};
