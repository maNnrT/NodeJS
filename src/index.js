const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
const morgan = require('morgan');
const route = require('./routes');
const db = require('./config/db');
const methodOverride = require('method-override')
const SortMiddleware = require('./app/middlewares/SortMiddleware')
// Connect to db
db.connect();

const app = express();
const port = 3000;
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(SortMiddleware)
app.use(methodOverride('_method'))
//HTTP logger
// app.use(morgan('combined'))
//Template engine
app.engine(
	'hbs',
	engine({
		extname: '.hbs',
		helpers: {
			sum: (a, b) => a + b,
			sortable: (field, sort) => {
				const sortType = field === sort.column ?sort.type: 'default'
				const icons= {
					default: 'fa-solid fa-sort',
					asc: 'fa-solid fa-sort-up',
					desc: 'fa-solid fa-sort-down'
					
				}
				const types = {
					default: 'desc',
					asc: 'desc',
					desc: 'asc'
					
				}
				const icon = icons[sortType]
				const type = types[sortType]
				return `<a href="?_sort&column=${field}&type=${type}"><i class="${icon}"></i></a>`
			}
		},
	})
);
app.set('view engine', 'hbs');
app.set(
	'views',
	path.join(__dirname, 'resources', 'views')
);

//Route inti
route(app);

app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});
