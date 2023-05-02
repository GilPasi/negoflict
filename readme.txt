add .env file under
code/backend
copy the text and modify it as needed:

//========================================
    //dont change:
        APP_ID = 72cdfd7230074a3dab0aa78408a9ccac 
        APP_CERTIFICATE = 236073be429a4229b3108522c545e5e3 
        ORG_NAME = 71864841
        APP_NAME =1052059
        CUSTOMER_ID = 0f7f01bf832143ce87016b13cdc8b4b2
        SECRET = 46c9763929034ccfbe36909c7fdea6cb
        AGORA_HOST =api.agora.io
        REST_API = a71.chat.agora.io
        WEB_SOCKET = msync-api-71.chat.agora.io
    
    //change this
        SERVER_URL = http://127.0.0.1:8000
        DB_NAME = negoflict
        DB_HOST = localhost
        DB_USER = negoflict
        DB_PASSWORD = password
        CLIENT_SERVER = http://localhost:3000
//========================================

add .env file under
code/frontend
copy the text and modify it as needed:
//========================================
    //dont change
        REACT_APP_AGORA_KEY ="71864841#1052059"
    //change
        REACT_APP_SERVER_URL ="http://localhost:8000"

