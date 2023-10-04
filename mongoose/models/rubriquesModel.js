const mongoose = require('mongoose')

const rubriquesSchema = new mongoose.Schema(
    {
        titre: {
            type: String,
            required: true,
            maxlength: 255,
            minlength: 3
        },
        redaction: {
            type: String,
            required: true,
            maxlength: 10000,
            minlength: 3
        }
    }
)
const rubriquesModel = mongoose.model('rubrique', rubriquesSchema);
module.exports = rubriquesModel;