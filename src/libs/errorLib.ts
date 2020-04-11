const isLocal = process.env.NODE_ENV === "development";

export function logError(error: any, errorInfo?:any) {
  if (isLocal) {
    return;
  }

  console.error(error);
}

export function onError(error:any) {
  let errorInfo:any = {};
  let message = error.toString();

  // Auth errors
  if (!(error instanceof Error) && error.message) {
    errorInfo = error;
    message = error.message;
    error = new Error(message);
    // API errors
  } else if (error.config && error.config.url) {
    errorInfo.url = error.config.url;
  }

  logError(error, errorInfo);

  alert(message);
}
