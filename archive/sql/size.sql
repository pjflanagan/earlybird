SELECT table_schema                                        "DB Name",
   Round(Sum(data_length + index_length) / 1024, 1) "DB Size in kB" 
FROM   information_schema.tables
GROUP  BY table_schema;
