CREATE TABLE IF NOT EXISTS statisticRecord (
play_time int, 
arm int,
leg int, 
flexibility int, 
body int, 
aerobic int,
height int,
balance int 
)
PARTITIONED BY(child_idx int, parent_idx int);

//성능 최적화를 위한 파일포맷 ocr로 변경
ALTER TABLE statisticRecord SET FILEFORMAT ORC;