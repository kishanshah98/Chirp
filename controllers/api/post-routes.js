// const router = require('express').Router();
// const { Post, Comment, User } = require('../../models');
// const withAuth = require('../../utils/auth');

// router.get('/', async (req, res) => {
//     try {
//         const postData = await Post.findAll({
//             attributes: [
//                 'id',
//                 'title',
//                 'content',
//                 'created_at'
//             ],
//             order: [
//                 ['created_at', 'DESC']
//             ],
//             include: [
//                 {
//                     model: Comment,
//                     attributes: ['id', 'comment_content', 'post_id', 'user_id', 'created_at'],
//                     include: {
//                         model: User,
//                         attributes: ['username']
//                     }
//                 },
//                 {
//                     model: User,
//                     attributes: ['username'],
//                 },
//             ]
//         })

//         res.json(postData)

//     } catch (err) {
//         console.log(err);
//         res.status(500).json(err);
//     }
// });

// router.get('/:id', async (req, res) => {
//     try {
//         const postData = await Post.findOne({
//             where: {
//                 id: req.params.id
//             },
//             attributes: [
//                 'id',
//                 'title',
//                 'content',
//                 'created_at'
//             ],
//             include: [
//                 {
//                     model: Comment,
//                     attributes: ['id', 'comment_content', 'post_id', 'user_id', 'created_at'],
//                     include: {
//                         model: User,
//                         attributes: ['username']
//                     }
//                 },
//                 {
//                     model: User,
//                     attributes: ['username'],
//                 },
//             ]
//         })

//         if (!postData) {
//             res.status(404).json({ message: 'There is no post with this id' });
//             return;
//         }

//         res.json(postData)

//     } catch (err) {
//         console.log(err);
//         res.status(500).json(err);
//     }
// });

// router.post('/', async (req, res) => {
//     try {
//         const postData = await Post.create({
//             title: req.body.title,
//             content: req.body.content,
//             user_id: req.session.user_id,
//         });

//         res.json(postData);

//     } catch (err) {
//         console.log(err);
//         res.status(500).json(err);
//     }
// });

// router.put('/:id', async (req, res) => {
//     try {
//         const postData = await Post.update({
//             title: req.body.title,
//             content: req.body.content
//         },
//         {
//             where: {
//                 id: req.params.id
//             }
//         });

//         if (!postData) {
//             res.status(404).json({ message: 'No post found with this id!' });
//             return;
//         }

//         res.json(postData);

//     } catch (err) {
//         console.log(err);
//         res.status(500).json(err);
//     }
// });

// router.delete('/:id', async (req, res) => {
//     try {
//         const postData = await Post.destroy({
//             where: {
//                 id: req.params.id
//             }
//         });

//         if (!postData) {
//             res.status(404).json({ message: 'No post found with this id!' });
//             return;
//         }

//         res.json(postData);

//     } catch (err) {
//         console.log(err);
//         res.status(500).json(err);
//     }
// });

// module.exports = router;

