const allRoles = {
    user: [],
    admin: ['getUsers', 'manageUsers', 'manageEvents', 'manageArticles', 'manageMadness', 'manageSpaces'],
    dashboardAdmin: ['manageEvents', 'manageArticles', 'manageMadness', 'manageSpaces'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
    roles,
    roleRights,
};
