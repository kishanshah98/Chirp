const User = require('./User');
const Comments = require('./Comments');
const Chirp = require('./Chirp');

User.hasMany(Chirp, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Chirp.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Comments, {
    foreignKey: 'chirp_id',
});
  
Comments.belongsTo(Chirp, {
    foreignKey: 'chirp_id',
});

Comments.belongsTo(User, {
    foreignKey: 'user_id',
});

module.exports = { User, Comments, Chirp };
