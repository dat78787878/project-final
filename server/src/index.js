const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const db = require("./db");
const app = express();
const port = process.env.PORT || 80;
const Comment = require("./model/Comment");
const Hotel = require("./model/Hotel");

const { spawn } = require("child_process");
var fs = require("fs");

app.use(cors());

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
  })
);

db.connect();
app.listen(port, () => {
  console.log("app running on port " + port);
});

// const CrawlHotel = async () => {
//   const child = spawn("scrapy", ["crawl", "list"], {
//     cwd: "D:/ki1_nam5/project/hotel/",
//   });

//   child.stdout.on("data", (data) => {
//     console.log(`stdout: ${data}`);
//   });

//   child.stderr.on("data", (data) => {
//     console.log(`stderr: ${data}`);
//   });

//   child.on("error", (error) => console.log(`error: ${error.message}`));

//   child.on("close", (code) => {
//     console.log(`Crawling data closed with code ${code}`);
//   });
// };

app.post(
  "/api/v1/crawlData",
  (req, res, next) => {
    const child1 = spawn("scrapy", ["crawl", "example", "-O", "comment.json"], {
      cwd: process.cwd() + "/comment/",
    });

    child1.stdout.on("data", (data) => {
      console.log(`stdout: ${data}`);
    });

    child1.stderr.on("data", (data) => {
      console.log(`stderr: ${data}`);
    });

    child1.on("error", (error) => console.log(`error: ${error.message}`));

    child1.on("close", (code) => {
      console.log(`Crawling data comment closed with code ${code}`);
      next();
    });
  },
  (req, res, next) => {
    const child2 = spawn("python", ["import_comment.py"], {
      cwd: process.cwd() + "/processing_data/",
    });

    child2.stdout.on("data", (data) => {
      console.log(`stdout: ${data}`);
    });

    child2.stderr.on("data", (data) => {
      console.log(`stderr: ${data}`);
    });

    child2.on("error", (error) => console.log(`error: ${error.message}`));

    child2.on("close", (code) => {
      console.log(`data closed with code ${code}`);
      next();
    });
  },
  (req, res, next) => {
    const child = spawn("scrapy", ["crawl", "list"], {
      cwd: process.cwd() + "/hotel/",
    });

    child.stdout.on("data", (data) => {
      console.log(`stdout: ${data}`);
    });

    child.stderr.on("data", (data) => {
      console.log(`stderr: ${data}`);
    });

    child.on("error", (error) => console.log(`error: ${error.message}`));

    child.on("close", (code) => {
      console.log(`Crawling data closed with code ${code}`);
      next();
    });
  },

  async (req, res) => {
    // var filePath = 'D:/ki1_nam5/project/comment/comment.json';
    // if (fs.existsSync(filePath)) {
    //  await fs.unlinkSync(filePath);
    //   console.log('Deleted file completed');
    // }
    // else {
    //  console.log('not found file');
    // }
    setTimeout(function () {
      Hotel.count({}, function (err, count) {
        Hotel.find((err, hotel) => {
          if (err) console.log(err);
          else {
            res.json({
              hotels: hotel,
              total_pages: Math.ceil(count / 10),
              success: true,
            });
          }
        })
          .limit(10)
          .skip(10 * (req.query.page - 1));
      });
    }, 10000);
  }
);

app.post(
  "/api/v1/analysData",
  (req, res, next) => {
    const child = spawn("python", ["test_underthesea.py"], {
      cwd: process.cwd() + "/processing_data/",
    });

    child.stdout.on("data", (data) => {
      console.log(`stdout: ${data}`);
    });

    child.stderr.on("data", (data) => {
      console.log(`stderr: ${data}`);
    });

    child.on("error", (error) => console.log(`error: ${error.message}`));

    child.on("close", (code) => {
      console.log(`Analys data closed with code ${code}`);
      next();
    });
  },
  (req, res, next) => {
    const child = spawn("python", ["NMF.py"], {
      cwd: process.cwd() + "/processing_data/",
    });

    child.stdout.on("data", (data) => {
      console.log(`stdout: ${data}`);
    });

    child.stderr.on("data", (data) => {
      console.log(`stderr: ${data}`);
    });

    child.on("error", (error) => console.log(`error: ${error.message}`));

    child.on("close", (code) => {
      console.log(`Analys data closed with code ${code}`);
      next();
    });
  },
  async (req, res) => {
    setTimeout(function () {
      res.json({
        success: true,
      });
    }, 10000);
  }
);

app.get("", (req, res) => {
  res.json("hello");
});
//get all hotel
app.get("/api/v1/hotel", (req, res) => {
  if (req.query.page > -1) {
    if (req.query.q?.search) {
      const query = new RegExp(req.query.q?.search, "i");
      Hotel.count({}, function (err, count) {
        Hotel.find(
          {
            $or: [{ hotel_name: query }, { hotel_addr: query }],
          },
          (err, hotel) => {
            if (err) console.log(err);
            else {
              res.json({
                hotels: hotel,
                total_pages: Math.ceil(count / 10),
                success: true,
              });
            }
          }
        )
          .limit(10)
          .skip(10 * (req.query.page - 1));
      });
    } else {
      Hotel.count({}, function (err, count) {
        Hotel.find((err, hotel) => {
          if (err) console.log(err);
          else {
            res.json({
              hotels: hotel,
              total_pages: Math.ceil(count / 10),
              success: true,
            });
          }
        })
          .limit(10)
          .skip(10 * (req.query.page - 1));
      });
    }
  } else {
    Hotel.count({}, function (err, count) {
      Hotel.find((err, hotel) => {
        if (err) console.log(err);
        else {
          res.json({
            hotels: hotel,
            total_pages: Math.ceil(count / 10),
            success: true,
          });
        }
      });
    });
  }
});
//get all comment
app.get("/api/v1/comment", (req, res) => {
  if (req.query.page > -1) {
    Comment.count({}, function (err, count) {
      Comment.find((err, comment) => {
        if (err) console.log(err);
        else {
          res.json({
            comments: comment,
            total_pages: Math.ceil(count / 10),
            success: true,
          });
        }
      })
        .limit(10)
        .skip(10 * (req.query.page - 1));
    });
  } else {
    Comment.count({}, function (err, count) {
      Comment.find((err, comment) => {
        if (err) console.log(err);
        else {
          res.json({
            comments: comment,
            total_pages: Math.ceil(count / 10),
            success: true,
          });
        }
      });
    });
  }
});

//detail hotel
app.get("/api/v1/hotel/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  Hotel.aggregate([
    { $match: { hotel_name: id } },
    {
      $lookup: {
        from: "comments",
        localField: "hotel_name",
        foreignField: "hotel_name",
        as: "list_comment",
      },
    },
  ]).exec((err, result) => {
    if (err) {
      console.log("error", err);
    }
    if (result) {
      res.json({ detailHotel: result[0], success: true });
    }
  });
});

// app.get("/profile/:id", (req, res) => {
//   const id = req.params.id;
//   Profile.findById(id, (err, profile) => {
//     res.json(profile);
//   });
// });

// app.get("/hotel", (req, res) => {

//   Hotel.aggregate([
//     {
//       $lookup: {
//         from: "classes",
//         localField: "idClass",
//         foreignField: "_id",
//         as: "class",
//       },
//     },
//   ]).exec((err, result) => {
//     if (err) {
//       console.log("error", err);
//     }
//     if (result) {
//       res.json(result.splice(5*(req.query.page-1), 5));
//     }
//   });
// });
