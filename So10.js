
let http = require('http');
let fs = require('fs');
const { json } = require('stream/consumers');
let port = 8037;
let server = http.createServer(requestHandler);
server.listen(port);
console.log("Server is running on port:" + port)

let headers = {
    text: { 'Content-Type': 'Text/Plain' },
    html: { 'Content-Type': 'Text/Html' },
    jpg: { 'Content-Type': 'image/jpeg' }
};

function write(response, badaneh, type){
    response.writeHead(200, headers[type]);
    response.write(badaneh);
    response.end();
}

function funcx(request, response) {
    console.log('this is x');
    write(response, 'salam xxxxx', 'text');
    // response.writeHead(200, headers.text);
    // response.write('salam xxxxx');
    // response.end();

}

function funcy(request, response) {
    console.log('this is y');
    write(response, 'salam yyyyy', 'text')
    // response.writeHead(200, headers.text);
    // response.write('salam yyyyy');
    // response.end();
}

function page1controllerA(request, response) {
    console.log('this is page1controllerA');
    write(response, 'Salam <b>Be Shoma!</b>', 'text')
    // response.writeHead(200, headers.text);
    // response.write('Salam <b>Be Shoma!</b>');
    // response.end();
}

function page1controllerB(request, response) {
    console.log('this is page1controllerB');
    write(response, 'Salam <b>Be Shoma!</b>', 'html')
    // response.writeHead(200, headers.html);
    // response.write('Salam <b>Be Shoma!</b>');
    // response.end();
}

function page1controllerC(request, response) {
    console.log('this is page1controllerC');
    let page1 = `<html>
    <head>
        <style>
            div{
                width: 200px;
                height: 100px;
                background-color: lightgreen;
                padding: 30px;
            }
        </style>
        <div>
            Page 1 inside js<br>
            Salam <b>Be Shoma!</b>
        </div>
    </head>
    </html>`;

    write(response, page1, 'html')
    // response.writeHead(200, headers.html);
    // response.write(page1);
    // response.end();
}

function page2controllerA(request, response) {
    console.log('page2controllerA 1')
    fs.readFile('./page2.html', 'utf8', function (error, data) {
        console.log('page2controllerA 2');
    })
    console.log('page2controllerA 3')
}

function page2controllerB(request, response) {
    console.log('page2controllerB 1')
    fs.readFile('./page2.html', 'utf8', function (error, data) {
        console.log('page2controllerB 2');
        console.log('page2controllerB 2 error', error);
        console.log('page2controllerB 2 data', data);
    })
    console.log('page2controllerB 3')
}

function page2controllerC(request, response) {
    console.log('page2controllerC 1')
    fs.readFile('./page2.html', function (error, data) {
        console.log('page2controllerC 2');
        write(response, data, 'html');
        // response.writeHead(200, headers.html);
        // response.write(data);
        // response.end();
    })
    console.log('page2controllerC 3')
}

function page2controllerD(request, response) {
    console.log('page2controllerD 1')
    fs.readFile('./page2.html', function (error, data) {
        console.log('page2controllerD 2');
        if(error){
            write(response, 'FILE NOT FOUND.', 'text')
            // response.writeHead(200, headers.text);
            // response.write('FILE NOT FOUND.');
            // response.end();
        }
        else{
            write(response, data, 'html');
            // response.writeHead(200, headers.html);
            // response.write(data);
            // response.end();
        }
    }) 
    console.log('page2controllerD 3')
}

function fileControllerA(request, response) {
    console.log('fileController 1')
    let fileName = request.url.split('/')[2];

    fs.readFile(fileName, function (error, data) {
        console.log('fileController 2');
        if(error){
            write(response, 'FILE NOT FOUND.', 'text');
        }
        else{
            write(response, data, 'html'); 
        }
    })
    console.log('fileController 3')
}

function fileControllerB(request, response) {
    console.log('fileController 1')
    let fileName = request.url.split('/')[2];
    let extention = fileName.split('.')[1];

    fs.readFile(fileName, function (error, data) {
        console.log('fileController 2');
        if(error){
            write(response, 'FILE NOT FOUND.', 'text');
        }
        else{
            write(response, data, extention); 
        }
    })
    console.log('fileController 3')
}


function InsertToFile(request,response,data){
    console.log("this is InsertToFile");

    fs.writeFile('message.txt',data,'utf8',function(error){
     
        if(error){

            write(response,'fs error','text');
        }
        else{
            write(response,'data saved','text');
        }

    });
}


function InsertToFileC(request,response,data){

    console.log(" this InsertToFile C :  " , data);

    fs.readFile('message.txt',function(error,fileData){

        if(error){
            write(response,'file not found','text');
        }
        else{
            console.log(typeof fileData);
            fileData=JSON.parse(fileData);
            console.log(typeof fileData);
            fileData.data.push(JSON.parse(data));
            console.log(fileData);
            fileData=JSON.stringify(fileData);

            fs.writeFile('message.txt',fileData,'utf8',function(error){

                if(error){
                    write(response,'fs error','text');
                }
                else{
                    write(response,'data saved','text');
                }
            });
        }
    });
}

let routes = {
    x: funcx,
    y: funcy,
    page1a: page1controllerA,
    page1b: page1controllerB,
    page1c: page1controllerC,
    page2a: page2controllerA,
    page2b: page2controllerB,
    page2c: page2controllerC,
    page2d: page2controllerD,
    file: fileControllerB,
    insert:InsertToFile,
    insertc:InsertToFileC
}


let data="";

function requestHandler(request, response) {
    let firstPart = request.url.split('/')[1];

    if (firstPart !== 'favicon.ico') {

        console.log('______________________________________________________')
        console.log('url       ', request.url);
        console.log('splitted  ', request.url.split('/'));
        console.log('firstPart ', firstPart);



        
        request.on('data',function(chunc){
            
              data+=chunc;
        });

        request.on('end',function(){

            console.log("data:   " + data);

            try{
                routes[firstPart](request, response,data);
            }
            catch(error){
                console.log('CATCHED ERROR', error);
                write(response, 'ERROR... ROUTE NOT FOUND.', 'text');
            }
        });


       
    }
}




