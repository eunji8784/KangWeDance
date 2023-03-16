package com.ssafy.kang.util;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import java.util.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/utils")
public class UtilController {
 
    private final Environment env;
 
    @GetMapping("/profile")
    public String getProfile() {
        return Arrays.stream(env.getActiveProfiles()).findFirst().orElse("");
    }
}
