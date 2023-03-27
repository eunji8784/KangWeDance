
CREATE TABLE IF NOT EXISTS bodyRecord (
body_record_idx int,
child_idx int,
weight double,
height double,
bmi double,
today_calrories double,
record_date string
)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY '\t'
STORED AS TEXTFILE