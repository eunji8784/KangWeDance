
DROP TABLE IF EXISTS songMotion
CREATE TABLE IF NOT EXISTS songMotion (
song_motion_idx int,
song_idx int,
motion_type_idx int,
start_time int,
end_time int,
accuracy double,
count_delay int,
count_standard int
)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY '\t'
STORED AS TEXTFILE