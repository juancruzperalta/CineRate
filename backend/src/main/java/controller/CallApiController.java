package controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import service.CallApiService;


@RestController
@RequestMapping("/api")
public class CallApiController{

      @Autowired
      private CallApiService service;

      @GetMapping("/")
      public void obtenerDatosAPI() {
        return service.obtenerDatos();
      }
}