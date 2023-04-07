const {Customer, Reseller} = require('../database');


function findCustomerFromReseller(customerID){
   Customer.findAll({where: id= customerID}).then(function (customer) {
    if (customer){
        Reseller.findAll({where: id = customer.ResellerId}).then(function(reseller){
            if(reseller){
                console.log(reseller);
            }
        })
    }
   })

}
module.exports = findCustomerFromReseller;