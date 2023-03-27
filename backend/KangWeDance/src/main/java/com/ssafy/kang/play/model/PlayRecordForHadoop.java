package com.ssafy.kang.play.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class PlayRecordForHadoop {
	String recordDate;
	int PlayrecordIdx;
	int childIdx;
	int songIdx;
	int playMode;

}
