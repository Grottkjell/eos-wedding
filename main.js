const express = require('express');
const path = require('path');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const fs = require("fs");

const app = express();
const router = express.Router();
const port = 80;
router.use(express.json());

const dir = path.join(__dirname, '/static');
app.use('/', express.static(dir));

const databasePath = path.join(__dirname, "database.json");
let db = low(new FileSync(databasePath));
db.defaults({ wishlist: [] }).write();

router.get("/wishlist", function (req, res) {
    res.send({
        wishlist: getWishlist(),
    });
});
router.put("/update/:id", function (req, res) {
    selectWish(req.params.id)
    res.send(req.params);
});
app.use("/api", router);

app.use("/images", function (req, res) {
    const { currentPageNumber, imagesPerPage } = req.query;
    const
        begin = +currentPageNumber * +imagesPerPage,
        end = (+currentPageNumber + 1) * +imagesPerPage,
        images = fs.readdirSync("static/images/from-the-wedding")
        ;
    images.sort();
    const selectedImages = begin < images.length ? images.slice(begin, end) : images;
    const returnedImages = {
        totalNrOfImages: images.length,
        images: selectedImages
    };
    console.log(returnedImages);
    res.send(returnedImages);
});

app.use(function (err, req, res, next) {
    /**
     * TODO: Do some logging to file also.
     */
    res.status(500);
    res.send(err.toString());
});
app.listen(port, function () {
    console.log(`Starting application on port ${port}`);
});


function selectWish(id) {
    db.get("wishlist")
      .find({ id: id })
        .assign({ selected: true })
      .write();
}

function getWishlist() {
    return db.get("wishlist").value();
}

