
DROP TABLE IF EXISTS palyRecord
CREATE TABLE IF NOT EXISTS playRecord (
play_record_idx int,
child_idx int,
song_idx int,
play_mode int,
record_date String
)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY '\t'
STORED AS TEXTFILE
LOCATION 'warehouse/playRecord'