export const getTheDate = (days) => {
  const date = new Date();
  const expectedTime = date.getTime() + days * 24 * 60 * 60 * 1000;
  const expectedDate = new Date(expectedTime);
  return expectedDate;
};
