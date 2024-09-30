const allRoles = {
    user: [],
    admin: ['getUsers', 'manageUsers', 'manageEvents', 'manageArticles', 'manageMadness'],
    dashboardAdmin: ['manageEvents', 'manageArticles', 'manageMadness'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
    roles,
    roleRights,
};
