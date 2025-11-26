package com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.service.CallApiService;


@RestController
@RequestMapping("/api")
public class CallApiController{

      @Autowired
      private CallApiService service;

      @GetMapping
      public ResponseEntity<String> obtenerDatosAPI() {
        return service.obtenerDatos();
      }

}