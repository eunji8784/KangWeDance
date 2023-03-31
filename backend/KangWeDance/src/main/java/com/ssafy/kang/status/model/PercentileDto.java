package com.ssafy.kang.status.model;

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
public class PercentileDto {
	int weight;
	int height;
	int percentile_1th;
	int percentile_3th;
	int percentile_5th;
	int percentile_10th;
	int percentile_15th;
	int percentile_25th;
	int percentile_50th;
	int percentile_75th;
	int percentile_85th;
	int percentile_90th;
	int percentile_95th;
	int percentile_97th;
	int percentile_99th;
}
