const menus = [
    {
        name: 'Home',
        path: '/admin/dashboard',
        access: ['SUPERADMIN', 'ADMIN', 'HOTEL', 'USER']
    },{
        name: 'Clienti',
        path: '/admin/customers',
        access: ['SUPERADMIN', 'ADMIN']
    },{
        name: 'Reseller',
        path: '/admin/resellers',
        access: ['SUPERADMIN']
    },
    {
        name: 'Naviatore web',
        path: '/admin/websurfers',
        access: ['SUPERADMIN', 'ADMIN', 'HOTEL', 'USER']
    }, {
        name: 'Ruoli',
        path: '/admin/users',
        access: ['SUPERADMIN', 'ADMIN', 'HOTEL']
    }, {
        name: 'Ticket',
        path: '/admin/tickets',
        access: ['SUPERADMIN', 'ADMIN', 'HOTEL', 'USER']
    }, {
        name: 'Radius',
        path: '/admin/radius',
        access: ['SUPERADMIN']
    }
];

function menuMiddleware(req, res, next) {
    const userRole = req.session.user.role;
    const selectedMenu = req.path;
    const filteredMenus = menus.filter(menu => {
        if (menu.access.includes(userRole) || menu.path === '/') {
            if (menu.path === selectedMenu) {
                menu.active = true;
            }
            return true;
        } else {
            return false;
        }
    });
    res.locals.menus = filteredMenus;
    next();
};

module.exports = menuMiddleware;
