package com.example.demo;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(value="/api")

public class Controller {

	public Controller() {
		
	}
@CrossOrigin(origins="http://localhost:4200")
	
	
	 @GetMapping("/image/{name}")
	 public String move(@PathVariable("name") String name) throws IOException {
		File sourceFile=new File("C:\\Users\\msi\\Downloads\\"+name);
		File destinationFile=new File("C:\\robotique\\"+name	);
		System.out.println(name);

		Files.copy(sourceFile.toPath(), destinationFile.toPath(),StandardCopyOption.REPLACE_EXISTING);
		System.out.println(name);
		if (sourceFile.delete()) {
			System.out.println("Supprimé");
		} 
		else {
			System.out.println("Non Supprimé");
		}
		
	 return name;
	 }

}
