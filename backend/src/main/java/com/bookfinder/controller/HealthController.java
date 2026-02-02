package com.bookfinder.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")  // 👈 TEMP: allow all
public class HealthController {

    @GetMapping("/health")
    public String health() {
        return "OK";
    }
}

