const { ftruncateSync } = require('fs');
let http=require('http');
let fs=require('fs');
const { text } = require('stream/consumers');
let server =http.createServer(requestHandler);
server.listen(8037);

console.log('server is running');
let headers={
    Text:{'Content-Type':'Text/Plain'},
    html:{'Content-Type':'Text/html'}
};



function page1controler(request,response){

    response.writeHead(200,headers.html)
    response.write(
        `<html>
        <head>
        <style>
        div{

            width:200px;
            height:200px;
            background-color:green;
        }
        </style>
        </head>
          <body>
          <div>
            salam <strong>be shoma</strong>
          </div>
          </body>
        </html>`
    );

   

    response.end();

}


function page2controler(request,response){

    console.log('page2controler 1');
    let fileName=request.url.split('/')[2]; 
    let ex=fileName.split('.')[1];
    
console.log(fileName);
   
    fs.readFile(fileName,'utf-8',function (error,data){
       
          console.log('page2controler 2');

          if(error){
            write(response,'text','not found');
          }
          else{
           write(response,ex,data);
          }
    });

    console.log('page2controler 3');
    

}




    let routes={
        x: funcx,
        y: funcy,
        page1:page1controler,
        page2:page2controler

    }





function requestHandler (request,response){
    
    console.log('request url: ', request.url);
    let x=request.url.split('/'); 
    console.log('splitted url: ',x);
    let firstpart=x[1];
    console.log('firstpart: ',firstpart);

    if(firstpart !== 'favicon.ico')
    {
        try{
        routes[firstpart](request,response);
        }
        catch(error)
        {
            console.log('error : ' , error);
            write(response,'text','error not found');
        }
    }

}



function write (response , Type , data)
{
    response.writeHead(200, headers[Type]);
    response.write(data);
    response.end();
}




    
function funcx() {
    console.log('this is x');
    response.writeHead(200, headers);
    response.write('salam xxxxx 3');
    response.end();
  }

  function funcy() {
    console.log('this is y');
    response.writeHead(200, headers);
    response.write('salam yyyyy 3');
    response.end();
  }

