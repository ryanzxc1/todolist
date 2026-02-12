package com.example.back.common;

public interface ResponseCode {

    //HTTP Status 200
    String SUCCESS = "SU";
    //HTTP Status 400
    String VALIDATION_FAILED= "VF";
    String DUPLICATE_EMAIL = "DE";
    String DUPLICATE_NICKNAME = "DN";
    
    String NOT_EXIST_USER = "NU";
    String NOT_EXIST_TODO = "NT";
    //HTTP Status 401   
    String SIGN_IN_FAIL="SF";
    String AUTHORIZATION_FAIL="AF";
    //HTTP Status 403
    String NO_PERMISSION="NP";
    //HTTP Status 500
    String DATABASE_ERROR="DBE";
}