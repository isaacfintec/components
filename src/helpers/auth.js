/**
 * @param {Object} user
 * @param {Boolean} isRemember
 * @returns {Boolean}
 * save an authenticated user in localstorage or sessionstorage
 */
export const saveAuthUser = (user, isRemember) => {
  if (!window) return false;

  const storage = isRemember ? 'localStorage' : 'sessionStorage';
  window[storage].setItem('user', JSON.stringify(user));
  return true;
};

/**
 * @returns {Object|null}
 * get an authenticated user in localstorage or sessionstorage
 */
export const getAuthUser = () => {
  let user = null;
  if (window) {
    user = window.localStorage.getItem('user') || window.sessionStorage.getItem('user');
    user = JSON.parse(user);
  }
  return user;
};

/**
 * @returns {Boolean}
 * remove an authenticated user in localstorage or sessionstorage
 */
export const removeAuthUser = () => {
  if (window) {
    window.localStorage.removeItem('user');
    window.sessionStorage.removeItem('user');
    return true;
  }
  return false;
};

/**
 * @returns {Boolean}
 * verify if have an authenticated user
 */
export const isAuth = () => {
  const user = getAuthUser();
  if (user) {
    const { token } = user;
    return Boolean(token);
  }
  return false;
};

/**
 * @returns {Array}
 */
export const getModules = () => {
  const user = getAuthUser();
  if (user) {
    const { permissions } = user;
    return permissions.map((permission) => {
      const { name } = permission.module;
      if (name === 'groups') return 'tickets/groups';
      return name;
    });
  }
  return false;
};

/**
 * @param {String} moduleName
 * @param {String} permissionName
 * @returns {Boolean}
 */
export const havePermission = (moduleName, permissionName) => {
  const user = getAuthUser();
  if (user) {
    const { permissions } = user;
    const foundModule = permissions.find((data) => {
      const { name } = data.module;
      return name === moduleName;
    });

    return foundModule && 'permissions' in foundModule ? Boolean(foundModule.permissions[permissionName]) : false;
  }
  return false;
};
