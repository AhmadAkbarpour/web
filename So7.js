const { ftruncateSync } = require('fs');
let http=require('http');
let fs=require('fs');
let server =http.createServer(requestHandler);
server.listen(8037);

console.log('server is running');
let headers={
    Text:{'Content-Type':'Text/Plain'},
    html:{'Content-Type':'Text/html'}
};



function page1controler(response){

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


function page2controler(response){

    console.log('page2controler 1');
    fs.readFile('./page2.html','utf-8',function (error,data){
       
          console.log('page2controler 2');

          if(error){
            response.writeHead(200,headers.Text);
            response.write('error 404');
            response.end();
          }
          else{
            response.writeHead(200,headers.html);
            response.write(data);
            response.end();
          }
    });

    console.log('page2controler 3');
    

}


  

    //     response.writeHead(200,headers);
    //     response.write('salam '+request.url);
    //     response.end();
    // 


    


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
        routes[firstpart](response);
    }





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

