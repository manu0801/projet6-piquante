const Sauce = require('../models/Sauces');
const fs = require('fs');

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
    .then(() => res.status(201).json({ message: 'sauce enregistrée'}))
    .catch(error => res.status(400).json({ error }));
};
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
    { ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body};
    Sauce.updateOne({ _id: req.params.id}, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'sauce modifiée'}))
    .catch(error => res.status(400).json({ error }));
};
exports.deleteSauce = (req,res,next) => {
    Sauce.findOne({_id: req.params.id})
    .then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
        sauce.deleteOne({ _id: req.params.id})
        .then(() => res.status(200).json({ message: 'sauce supprimée'}))
        .catch(error => res.status(400).json({ error })); 
        });
    })
    .catch(error => res.status(500).json({ error}));
    
};
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id})
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
};
exports.getAllSauce = (req, res, next) => {
    Sauce.find()
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(400).json({ error }));
};