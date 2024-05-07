*** Settings ***
Library    Browser
Documentation    A test suite for valid login
Resource    login-variables.resource
Default Tags    Should Pass

*** Variables ***
${url}    https://hyte24.northeurope.cloudapp.azure.com/index.html
${ROOT_URL}    https://hyte24.northeurope.cloudapp.azure.com

*** Test Cases ***
# Should PASS
 Invalid student login 
    New Page    ${url}
    Type Secret    input#username    $kubios_username_wrong
    Type Secret    input#password    $kubios_password_wrong
    Take Screenshot    EMBED
    Click    css=#userLoginForm .loginuser
    Wait For Load State    networkidle    timeout=3s
    Take Screenshot    EMBED
    Wait For Condition     Url   should end with    index.html
    Close Page

# Should pass
Invalid professional login
    New Page    ${url}
    Type Secret    input#username    $wrong_username
    Type Secret    input#password    $wrong_password
        Take Screenshot    EMBED
    Click    css=#userLoginForm .loginuser
    Wait For Load State    networkidle    timeout=3s
    Take Screenshot    EMBED
    Wait For Condition     Url   should end with    index.html
    Close Page

Valid student login
    New Page    ${url}
    Type Secret    input#username    $kubios_username
    Type Secret    input#password    $kubios_password
    Take Screenshot    EMBED
    Click    css=#userLoginForm .loginuser
    Wait For Condition    Url    should end with    home.html
    Take Screenshot    EMBED
    Close Page    CURRENT

Valid professional login
    New Page    ${url}
    Click    id=professionalLoginBtn
    Type Secret    id=professional_username    $username
    Type Secret    input#professional_password    $password
    Take Screenshot    EMBED
    Click    css=#professionalLoginForm .loginuser
    Wait For Condition    Url    should end with    professional.html
    Take Screenshot    EMBED
    Close Page    CURRENT