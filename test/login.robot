*** Settings ***
Library    Browser
Documentation    Valid login testsuite.
Resource    login-variables.resource

*** Variables ***
${url}    http://127.0.0.1:5500/frontend/index.html

*** Test Cases ***
Login wrong username and password
    New Browser    firefox
    New Page    ${url}
    # add selectors??
    Fill Secret    id=username    $wrong_username
    Fill Secret    id=password    $wrong_password
    Click    "Kirjaudu"
    LocalStorage Get Item    key==token
    Close Browser

login correct username and wrong password
    New Browser    firefox
    New Page    ${url}
    # add selectors??
    Fill Secret    id=username    $username
    Fill Secret    id=password    $wrong_password
    Click    "Kirjaudu"
    LocalStorage Get Item    key==token
    Close Browser

Login correct password wrong username
    New Browser    firefox
    New Page    ${url}
    # add selectors??
    Fill Secret    id=username    $wrong_username
    Fill Secret    id=password    $password
    Click    "Kirjaudu"
    LocalStorage Get Item    key==token
    Close Browser

login correct username and password
    New Browser    firefox
    New Page    ${url}
    # add selectors ??
    Fill Secret    id=username    $username
    Fill Secret    id=password    $password
    Click    "Kirjaudu"
    LocalStorage Get Item    key==token
    Close Browser

