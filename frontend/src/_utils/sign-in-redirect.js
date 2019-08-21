export const redirectAfterSignIn = history => {
    let signInRedirect = localStorage.getItem("signInRedirect");
    let sourcePath = localStorage.getItem("sourcePath");
  
    if (signInRedirect !== null && signInRedirect !== undefined) {
      localStorage.removeItem("signInRedirect");
      if (signInRedirect === "/signup") {
        history.push({ pathname: "/" });
      } else {
        history.push({ pathname: signInRedirect });
      }
    } else if (sourcePath !== null && sourcePath !== undefined) {
      history.push({ pathname: sourcePath });
    } else {
      history.push({ pathname: "/" });
    }
  };
  
  export const redirectBack = history => {
    let sourcePath = localStorage.getItem("sourcePath");
  
    if (sourcePath !== null && sourcePath !== undefined) {
      localStorage.removeItem("sourcePath");
      history.push({ pathname: sourcePath });
    } else {
      history.push({ pathname: "/" });
    }
  };
  
  export const goToSignIn = (history, path = null) => {
    if (path === null) {
      path = window.location.pathname;
    }
    localStorage.setItem("signInRedirect", path);
    localStorage.setItem("sourcePath", window.location.pathname);
    history.push({ pathname: "/signin" });
  };
  
  export const goToSignUp = (history, path = null) => {
    if (path === null) {
      path = window.location.pathname;
    }
    localStorage.setItem("signInRedirect", path);
    localStorage.setItem("sourcePath", window.location.pathname);
    history.push({ pathname: "/signup" });
  };
  