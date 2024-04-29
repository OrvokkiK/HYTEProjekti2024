*** Settings ***
Library    Browser
# Documentation    A test suite for valid login
Resource    login-variables.resource


*** Test Cases ***
Denied Regular Login with wrong password
    New Page    http://localhost:5173/
    Type Secret    input#username    $kubios_username
    Type Secret    input#password    $kubios_password_wrong
    Click    id=loginstudent
     ${token}=    LocalStorage Get Item    token
    # Log To Console    ${token}
    Should Not Contain    ${token}
    Close Page


Denied Regural Login with wrong username
    New Page    http://localhost:5173/
    Type Secret    input#username    $kubios_username_wrong
    Type Secret    input#password    $kubios_password
    Click    id=loginstudent    left


Denied Professional Login with wrong password
    New Page    http://localhost:5173/
    Type Secret    input#username    $username
    Type Secret    input#password    $password_wrong
    Click    id=loginstudent    left


Denied Professional Login with wrong username
    New Page    http://localhost:5173/
    Type Secret    input#username    $username_wrong
    Type Secret    input#password    $password
    Click    id=loginstudent    left

Valid Regular (student) Login
    New Page    http://localhost:5173/
    Type Secret    input#username    $kubios_username
    Type Secret    input#password    $kubios_password
    Click    id=loginstudent    left
    
    Set Browser Timeout    2 seconds
    # Get Attribute    id=graph    None
    # Get URL    ends    /home.html
    Local Storage Get Item    Key    ==    token
    ${token}=    LocalStorage Get Item    token
    Should Not Be Empty    ${token}
    Close Page    CURRENT

Valid Professional (hpc/admin) login
    New Page    http://localhost:5173/
    Click    id=professionalLoginBtn
    Type Secret    id=professional_username    $username
    Type Secret    input#professional_password    $password
    Click    id=loginprofessional
    ${object} =    Execute JavaScript    return ${Data}.token
    Log    Token: ${object}
    # ${console_logs}=    Get Console Log
    # Should Contain    ${console_logs}    Kirjautuminen onnistui!
    # Local Storage Get Item    Key    ==    Bearer
     ${token}=    LocalStorage Get Item    token.data
    Log To Console    ${token}
    # Should Not Be Empty    ${token.Data}
    # Get Text     equal    "Kirjautuminen onnistui!"
    # GET URL    equal    http://localhost:5173/home-hcp.html
    Close Page    CURRENT
