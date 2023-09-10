const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
mongoose.plugin(slug);
const Schema = mongoose.Schema;

const Course = new Schema(
	{	
		_id:{type: Number},
		name: { type: String, required: true },
		description: { type: String, maxLength: 600 },
		videoId: { type: String, required: true },
		level: { type: String, maxLength: 255 },
        image: { type: String, maxLength: 255 },
        slug: { type: String, slug: 'name', unique: true },
	},
	{
		_id: false,
		timestamps: true
	}
);
Course.plugin(mongooseDelete, {deletedAt:true, overrideMethods: 'all' })
module.exports = mongoose.model('Course', Course);
