
DROP TABLE IF EXISTS scoreRecord
CREATE TABLE IF NOT EXISTS scoreRecord (
score_record_idx int,
play_record_idx int,
motion_type_idx int,count int,time int,count_standard int,score int)ROW FORMAT DELIMITEDFIELDS TERMINATED BY '\t'STORED AS TEXTFILE