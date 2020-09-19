
exports.up = function(knex) {
    return knex.schema.createTable("users", tbl => {
        tbl.increments()
        tbl.string("name", 120)
          .unique()
          .notNullable()
        tbl.string("password", 120)
          .notNullable()
    })
  
      .createTable("students", tbl => {
          tbl.increments()
          tbl.integer("professor_id")
              .unsigned()
              .references("users.id")
              .onUpdate("CASCADE")
              .onDelete("CASCADE")
          tbl.string("name", 120)
              .notNullable()
          tbl.string("password")
              .notNullable()
      })
  
      .createTable("projects", tbl => {
          tbl.increments()
          tbl.integer("student_id")
              .unsigned()
              .references("students.id")
              .onUpdate("CASCADE")
              .onDelete("CASCADE")
          tbl.integer("professor_id")
              .unsigned()
              .references("users.id")
              .onUpdate("CASCADE")
              .onDelete("CASCADE")
          tbl.string("project_name", 225)
              .notNullable()
          tbl.text("description", 400)
              .notNullable()
          tbl.datetime("due_date")
          tbl.boolean("completed")
      })
  
      .createTable("messages", tbl => {
          tbl.increments()
          tbl.integer("professor_id")
              .unsigned()
              .references("users.id")
              .onUpdate("CASCADE")
              .onDelete("CASCADE")
          tbl.integer("student_id")
              .unsigned()
              .references("students.id")
              .onUpdate("CASCADE")
              .onDelete("CASCADE")
          tbl.string("title", 120)
              .notNullable()
          tbl.text("body", 1000)
              .notNullable()
          tbl.datetime("send_time")
          tbl.boolean("sent")
      })
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists("users")
      .dropTableIfExists("students")  
      .dropTableIfExists("projects")
      .dropTableIfExists("messages")
  };