var express = require('express'); // require Express
var router = express.Router();   // setup usage of the Express router engine


/* PostgreSQL and PostGIS module and connection setup */
const { Client, Query } = require('pg')

// Setup connection
var username = "postgres" // sandbox username
var password = "root" // read only privileges on our table
var host = "localhost:5432"
var database = "cambridge" // database name
var conString = "postgres://"+username+":"+password+"@"+host+"/"+database; // Your Database Connection

// Set up your database query to display GeoJSON
var test = `SELECT row_to_json(fc) FROM ( SELECT 'FeatureCollection' 
As type, array_to_json(array_agg(f)) As features FROM (SELECT 'Feature' As type, 
ST_AsGeoJSON(lg.geom)::json As geometry, 
row_to_json((id, "NAME")) As properties FROM test As lg) As f) As fc`;

/* GET Postgres JSON data */
router.get('/data', function (req, res) {
  var client = new Client(conString);
  client.connect();
  var query = client.query(new Query(test));
  query.on("row", function (row, result) {
      result.addRow(row);
  });
  query.on("end", function (result) {
      res.send(result.rows[0].row_to_json);
      res.end();
  });
})


var town  = `SELECT id,  "NAME" from public.test`;
router.get('/add', function (req,res) {
    var client = new Client(conString);
    client.connect();
    var query = client.query(new Query(town));
    var add=[];
    query.on('row', function(row) {
        add.push(row);
    });
    query.on('end', function() {
       // console.log(add);
      return res.json(add);
    }); 

  
});

var taluka  = `SELECT     DISTINCT  "Taluk"   from public.test`;
//var taluka =  `SELECT    "NAME"  FROM test  WHERE "Taluk" =  'Basavakalyan' ;`
router.get('/taluka', function (req,res) {
    var client = new Client(conString);
    client.connect();
    var query = client.query(new Query(taluka));
    var add=[];
    query.on('row', function(row) {
        add.push(row);
    });
    query.on('end', function() {
       // console.log(add);
      return res.json(add);
    }); 

  
});

router.get('/upto/:id',function(req, res){
 var add=req.params.id; 
    //Geting id from request parameter
     console.log("taluk name",add);
 var demo = `Select "NAME"  FROM test  WHERE "Taluk" ='${add}'`;
 //console.log(demo);
 var a=[];
   var client = new Client(conString);
    client.connect();
    var query = client.query(new Query(demo));

          query.on('row', function(row) {
            a.push(row);
        });
        query.on('end', function() {
           // console.log("fgdfgdfg",a);
         // return res.json();
          return  res.json(a);
        });
       });

// Select the taluka and open whole village 
router.get('/Done/:name',function(req, res){

    var add= [];
    console.log('select',add);

 var done = `Select "NAME"  FROM test  WHERE "Taluk" = 'id' `;
    var client = new Client(conString);
    client.connect();
    var query = client.query(new Query(done));

 
   // console.log(demo);
          query.on('row', function(row) {
            add.push(row);
        });
        query.on('end', function() {
           console.log(add);
         // return res.json();
          return  res.json(add);
        });
});


/* GET Postgres JSON data */
router.get('/mapTalukaPolygons/:id', function (req, res) {

    
  // var add= 'Homnabad';
  var add= req.params.id;
    console.log('short',add);

var testmap = `SELECT row_to_json(fc) FROM 
( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f))
 As features FROM (SELECT 'Feature' As type, ST_AsGeoJSON(lg.geom)::json As geometry,
  row_to_json((id, "NAME")) As properties FROM test As lg WHERE "Taluk" = '${add}' ) As f) As fc`;

var client = new Client(conString);
  client.connect();
  var query = client.query(new Query(testmap));
 query.on("row", function (row, result) {
      result.addRow(row);

  });
  query.on("end", function (result) {
      res.send(result.rows[0].row_to_json);
      res.end();
  });
})



    





/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

module.exports = router;