const mongoose = require('mongoose');

const { DateTime } = require('luxon');

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    first_name: { type: String, required: true, maxLength: 100 },
    family_name: { type: String, required: true, maxLength: 100 },
    date_of_birth: { type: Date },
    date_of_death: { type: Date },
});

// Virtual for author's full name
AuthorSchema.virtual("name").get(function(){
    let fullName = '';
    if (this.first_name && this.family_name) {
        fullName = `${this.family_name}, ${this.first_name}`;
    }

    return fullName;
});

// Virtual for author's URL
AuthorSchema.virtual('url').get(function(){
    return `/catalog/author/${this._id}`;
});

AuthorSchema.virtual('lifespan').get(function(){
    const formattedBirth = this.date_of_birth ? '* ' + DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) : '';
    const formattedDeath = this.date_of_death ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED) : '';
    return formattedBirth + (formattedDeath ? '- ' + formattedDeath : '')
})

// Export model
module.exports = mongoose.model("Author", AuthorSchema);