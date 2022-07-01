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
    foreignKey: 'user_id',
});

Comments.belongsTo(User, {
    foreignKey: 'user_id',
});

Comments.belongsTo(Chirp, {
    foreignKey: 'chirp_id',
    onDelete: 'CASCADE'
});

Chirp.hasMany(Comments, {
    foreignKey: 'chirp_id'
})

module.exports = { User, Comments, Chirp };
