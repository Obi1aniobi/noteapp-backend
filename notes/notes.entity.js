const EntitySchema = require("typeorm").EntitySchema


module.exports =  new EntitySchema({
    name: "notes", // Will use table name `post` as default behaviour.
    tableName: "notes", // Optional: Provide `tableName` property to override the default behaviour for table name.
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        note: {
            type: "text",
        },
        createdDate: {
            type: "date",
            default: "now()"
        },
        updatedDate: {
            type: "date",
            default: "now()"
        },
    },
    relations: {
        user: {
            target: "users",  // the name given in the users entity.js
            type: "many-to-one", //every note can have only one author
        },
    },
})