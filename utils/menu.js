const menus = [
    {
        name: 'Home',
        path: '/admin/dashboard',
        access: ['SUPERADMIN', 'RESELLER', 'HOTEL', 'USER']
    },{
        name: 'Clienti',
        path: '/admin/customers',
        access: ['SUPERADMIN', 'RESELLER']
    },{
        name: 'Reseller',
        path: '/admin/resellers',
        access: ['SUPERADMIN']
    },
    {
        name: 'Navigatore web',
        path: '/admin/websurfers',
        access: ['SUPERADMIN', 'RESELLER', 'HOTEL', 'USER']
    }, {
        name: 'Ruoli',
        path: '/admin/users',
        access: ['SUPERADMIN', 'RESELLER', 'HOTEL']
    }, {
        name: 'Ticket',
        path: '/admin/tickets',
        access: ['SUPERADMIN', 'RESELLER', 'HOTEL', 'USER']
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
