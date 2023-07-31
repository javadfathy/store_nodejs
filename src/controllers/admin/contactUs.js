const Contact = require('../../models/contact')

module.exports.contactUs = (req, res) => {
    Contact.find().then(result => {
        res.render('admin/contactUs/index', {
            pageTitle: 'contact Us',
            isAuth: req.session.isLoggedIn,
            isAdmin: req.session.isAdmin || false,
            contacts: result
        })
    }).catch(err => {
        console.error(err);
    })
}

module.exports.viewContact = (req, res) => {
    const CID = req.params.id
    Contact.findById(CID).then(contact => {
        res.render('admin/contactUs/single-contact', {
            pageTitle: 'View contact',
            isAuth: req.session.isLoggedIn,
            isAdmin: req.session.isAdmin || false,
            contact: contact
        })
    }).catch(err => {
        console.error(err);
    })
}
module.exports.deleteContact = (req, res) => {
    const CID = req.body.cotactId
    Contact.deleteOne({_id: CID}).then(result => {
        res.redirect('/admin/contact-us')
    }).catch(err => {
        console.error(err);
    }) 
}

