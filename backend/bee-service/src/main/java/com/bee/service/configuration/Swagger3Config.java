package com.bee.service.configuration;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.oas.annotations.EnableOpenApi;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

/**
 * swagger配置类
 *
 * @author guofan
 * @date 2022/6/22
 */
@Configuration
@EnableOpenApi
public class Swagger3Config {
    //规定扫描那些包下面为我们swagger文档
    @Bean
    public Docket createRestApi() {
        return new Docket(DocumentationType.OAS_30)
                .apiInfo(apiInfo())
                .enable(true)
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.bee.service.controller"))
//                .paths(PathSelectors.any())
                .build();
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("小蜜蜂")
                .description("小蜜蜂商业智能接口调试界面")
                .contact(new Contact("XXXX", "http:localhost:8080/doc.html", "xxxx@xxxx.com"))
                .version("1.0")
                .build();
    }



}
