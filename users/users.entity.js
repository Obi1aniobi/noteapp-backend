const EntitySchema = require("typeorm").EntitySchema


module.exports =  new EntitySchema({
    name: "users", // Will use table name `post` as default behaviour.
    tableName: "users", // Optional: Provide `tableName` property to override the default behaviour for table name.
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        username: {
            type: "varchar",
        },
        email: {
            type: "text",
        },
        password: {
            type: "text",
        },
    },
    
})
