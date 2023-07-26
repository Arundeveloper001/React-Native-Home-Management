const express = require('express');
const router = express.Router();
const employee = require("../modals/Employee")
const reviews = require("../modals/Ratings")

router.post('/reviews/:id', async (req, res) => {
    const result = await employee.findById({ _id: req.params.id})
    const id = req.params.id
    const name = result.name
    const rating = req.body.rating
    const comment = req.body.comment
    // console.log("rating===================>",rating)
    let data = {
        user_id: id,
        rating:rating,
        name:name,
        comment:comment
    }
    console.log("data",data)
    const review = await reviews.create(data)
    res.status(200).send(review)
})



// router.post('/reviews/:id', async (req, res) => {
//     // console.log("req",req.params.id);
//     const { rating } = req.body

//     if (!req.params.id) {
//         res.statusMessage = "Some required missing..."
//         return res.status(201).json({
//             error: 'Some required missing...'
//         })
//     }
//      const result = await employee.findById({ _id: req.params.id})
//     console.log("result=====>",result);
//         if (result) {
//             // const alreadyReviewed = result.reviews.find (
//             //     (r) => r.toString() === req._id.toString()
//             //     )
//             //     console.log("alreadyReviewed",alreadyReviewed)

//             // if (alreadyReviewed) {
//             //     res.status(400)
//             //     throw new Error('Product already reviewed')
//             // }

//             const review = {
//                 name: req.name,
//                 rating: Number(rating),
//                 user: req._id,
//             }
//     console.log("review",review);
//     // result.push(review)

//             // product.numReviews = product.reviews.length

//             // product.rating =
//             //     product.reviews.reduce((acc, item) => item.rating + acc, 0) /
//             //     product.reviews.length

//             // await product.save()
//             res.status(201).json({ message: 'Review added' })
//         } else {
//             res.status(404)
//             throw new Error('Product not found')
//         }
// })


module.exports = router;