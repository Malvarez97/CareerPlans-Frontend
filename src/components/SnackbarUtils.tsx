export const sendSnackBarMessage = (snackData) => {
  const customEvent = new CustomEvent("snackMessage", {
    detail: { snackData },
  });
  document.dispatchEvent(customEvent);
};
