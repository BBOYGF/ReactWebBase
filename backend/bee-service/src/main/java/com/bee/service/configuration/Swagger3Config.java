package com.bee.service.configuration;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.oas.annotations.EnableOpenApi;
import springfox.documentation.service.*;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;

import java.util.ArrayList;
import java.util.List;

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
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo())
                .enable(true)
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.bee.service.controller"))
                .paths(PathSelectors.any())
                .build()
                .securityContexts(securityContexts())
                .securitySchemes(securitySchemes());
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("小蜜蜂")
                .description("小蜜蜂商业智能接口调试界面")
                .contact(new Contact("XXXX", "http:localhost:8080/doc.html", "xxxx@xxxx.com"))
                .version("1.0")
                .build();
    }
    private List<SecurityScheme> securitySchemes()
    {
        //设置请求头信息
        List<SecurityScheme> result=new ArrayList<>();
        ApiKey apiKey=new ApiKey("Authorization","Authorization","Header");
        result.add(apiKey);
        return result;
    }
    private List<SecurityContext> securityContexts(){
        //设置需要登录认证的路径
        List<SecurityContext> result=new ArrayList<>();
        result.add(getContextByPath("/hello/.*"));
        return result;
    }
    private SecurityContext getContextByPath(String pathRegex) {
        return springfox.documentation.spi.service.contexts.SecurityContext.builder()
                .securityReferences(defaultAuth())
                .forPaths(PathSelectors.regex(pathRegex))
                .build();
    }
    private List<SecurityReference> defaultAuth() {
        List<SecurityReference> result =new ArrayList<>();
        AuthorizationScope authorizationScope=new AuthorizationScope("global","accessEverything");
        AuthorizationScope[] authorizationScopes=new AuthorizationScope[1];
        result.add(new SecurityReference("Authorization",authorizationScopes));
        return result;
    }
}
