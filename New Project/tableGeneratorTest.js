var tableGeneratorTest = function(){
    
    this.getCell = function(doc,dimensions,coordinates,color,Tcolor,fillMode,field,align){ 
        
        doc.setLineWidth(0.5);
        var a = dimensions['a'];
        var b = dimensions['b'];

        var x = coordinates['x'];
        var y = coordinates['y'];
        
        var aligns = {}; 
        var fontSize = 8;
        var letterH = doc.getStringUnitWidth(field['text'])*fontSize/doc.internal.scaleFactor;;
        WordH = letterH.toFixed(2);
        
        doc.setFillColor(color['R'],color['G'],color['B']);
        doc.setTextColor(Tcolor['R'],Tcolor['G'],Tcolor['B']);
        doc.rect(x, y, b, a, fillMode);
        
        
        doc.setFontSize(fontSize);
        aligns['middle'] = (b - WordH ) /2
        aligns['left']   = 1 ;
        aligns['right']  =b ;
        margin = aligns[align];
        
        doc.text(x+margin, y+a-0.5, field['text']);
        
        return  doc;
    };
    
    this.getRow = function(doc,parameters){
        var columnsQt   = parameters['columnsQt'];
        var dimensions  = parameters['dimensions'];
        var coordinates = parameters['coordinates'];
        var color       = parameters['color'];
        var Tcolor      = parameters['Tcolor'];
        var fillMode    = parameters['fillMode'];
        var fields      = parameters['text'];
        
        var positionS= Number(coordinates['x']);
        
        for (var i = 1; i <= columnsQt; i++) {
            positionS += Number(fields[i-1]['Width']);
            dimensions['b']  = fields[i-1]['Width'];
            
            //clone the object // unwanted reference.
            var coordinatesTmp = JSON.parse(JSON.stringify(coordinates));
            coordinatesTmp['x'] = coordinates['x'];
            doc = this.getCell(doc,dimensions,coordinatesTmp,color,Tcolor,fillMode,fields[i-1],'middle');
            coordinates['x'] = positionS;
        }
        return doc;
    };
    
    
    this.getTable = function(doc,parameters){ 
        
        var rowsQt = parameters['rowsQt'] 
        var A = parameters.dimensions['a'];
        
        for (var i = 1; i <= rowsQt; i++) { 
            parameters.dimensions['a'];
            doc = this.getRow(doc,parameters);      
        }
        return doc;
         
    };
    
    
    //testing helpers
    this.cell = function(doc,a,b,x,y,color,Tcolor,fillMode,text,align){
        var dimensions = {};
        dimensions['a'] = a;
        dimensions['b'] = b;

        var coordinates = {};
        coordinates['x'] = x;
        coordinates['y'] = y;
        doc = this.getCell(doc,dimensions,coordinates,color,Tcolor,fillMode,text,'middle'); 
        
        return doc;
        
    }
    this.row = function(doc,a,b,x,y,color,Tcolor,fillMode,columnsQt,fields){
        var dimensions = {};
        dimensions['a'] = a;
        dimensions['b'] = b;

        var coordinates = {};
        coordinates['x'] = x;
        coordinates['y'] = y;
        
        var parameters = {};
        parameters['columnsQt']   = columnsQt;
        parameters['fillMode']    = fillMode;
        parameters['dimensions']  = dimensions;
        parameters['coordinates'] = coordinates;
        parameters['color']       = color;
        parameters['Tcolor']      = Tcolor;
        parameters['text']        = fields;
        
        doc = this.getRow(doc,parameters);  
        
        return doc;
        
    }
    this.test = function(doc){
        doc.text(50, 50, 'This is a exmaple of jsPDF');
        return doc;
    }
    

    
    this.scratchFotTest = function(doc,testQt){
        
        var imgData = "data:image/jpeg;base64,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";
        var gray       = {'R':75,'G':75,'B':75 };
        var lightGray  = {'R':100,'G':100,'B':100 };
        var white      = {'R':255,'G':255,'B':255 }; 
        var black      = {'R':0,'G':0,'B':0 }; 
        var OnlyBorder = "D";
        var FillWhole  = "FD";
        var columnsQt  = 12;
        var a = 4;
        var b = 10;
        var ca = 7;
        var tableW = columnsQt * b + 70;
        tableGen = this;

        var text  ={
                    'text':'1.23',
                    'H-align':'middle',
                };
        var team      = {
                    'text':'Sheffield-Bristol C',
                    'H-align':'middle',
                };

        var leagueName = {
                    'text':'Inghilterra - League One',
                    'H-align':'middle',
                };
        var date  = {
                    'text':"Sat 9 Aug 2014",
                    'H-align':'middle',
                };

        var SportName = {
                    'text':"calcio",
                    'H-align':'left',
                };
        
        
        var doc = new jsPDF('portrait','mm');
        
        for (var i = 1; i <= testQt; i++) { 
            
                
        var pY = 0; //position y
        var PX = 0; //position x
                doc.addImage(imgData, 'JPEG', 15, 14, 30, 8); 
                doc.setFontSize(22);
                doc.text(60, pY+=20, 'This is a exmaple of jsPDF file');

                doc = tableGen.cell(doc,ca,tableW,10,pY+=10,gray,black,FillWhole,SportName);   
                doc = tableGen.row(doc,a,b,10,pY+=ca,gray,black,OnlyBorder,columnsQt,columnNames);
                doc = tableGen.cell(doc,ca,tableW,10,pY+=a,white,black,OnlyBorder,date); 
                doc = tableGen.row(doc,a,b,b,pY+=ca,gray,black,OnlyBorder,columnsQt,fields);

                doc = tableGen.row(doc,a,b,10,pY+=ca,gray,black,OnlyBorder,columnsQt,fields);

                doc = tableGen.row(doc,a,b,b,pY+=a,gray,black,OnlyBorder,columnsQt,fields);
                doc = tableGen.row(doc,a,b,b,pY+=a,gray,black,OnlyBorder,columnsQt,fields);


                doc = tableGen.cell(doc,ca,tableW,10,pY+=ca,white,black,OnlyBorder,leagueName); 
                doc = tableGen.row(doc,a,b,b,pY+=ca,gray,black,OnlyBorder,columnsQt,fields);
                doc = tableGen.cell(doc,ca,tableW,10,pY+=a,white,black,OnlyBorder,date); 
                doc = tableGen.row(doc,a,b,b,pY+=ca,gray,black,OnlyBorder,columnsQt,fields);
                doc = tableGen.row(doc,a,b,b,pY+=a,gray,black,OnlyBorder,columnsQt,fields);
                doc = tableGen.row(doc,a,b,b,pY+=a,gray,black,OnlyBorder,columnsQt,fields);
                doc = tableGen.row(doc,a,b,b,pY+=a,gray,black,OnlyBorder,columnsQt,fields);
                doc = tableGen.row(doc,a,b,b,pY+=a,gray,black,OnlyBorder,columnsQt,fields);
                doc = tableGen.row(doc,a,b,b,pY+=a,gray,black,OnlyBorder,columnsQt,fields);
                doc = tableGen.row(doc,a,b,b,pY+=a,gray,black,OnlyBorder,columnsQt,fields);


                doc = tableGen.cell(doc,ca,tableW,10,pY+=ca,white,black,OnlyBorder,leagueName); 
                doc = tableGen.row(doc,a,b,10,pY+=ca,gray,black,OnlyBorder,columnsQt,fields);
                doc = tableGen.cell(doc,ca,tableW,10,pY+=a,white,black,OnlyBorder,date); 
                doc = tableGen.row(doc,a,b,10,pY+=ca,gray,black,OnlyBorder,columnsQt,fields);
                doc = tableGen.row(doc,a,b,10,pY+=a,gray,black,OnlyBorder,columnsQt,fields);
                doc = tableGen.row(doc,a,b,10,pY+=a,gray,black,OnlyBorder,columnsQt,fields);
                doc = tableGen.row(doc,a,b,10,pY+=a,gray,black,OnlyBorder,columnsQt,fields);
                doc = tableGen.row(doc,a,b,10,pY+=a,gray,black,OnlyBorder,columnsQt,fields);
                doc = tableGen.row(doc,a,b,10,pY+=a,gray,black,OnlyBorder,columnsQt,fields);
            
            
                doc = tableGen.cell(doc,ca,tableW,10,pY+=ca,white,black,OnlyBorder,leagueName); 
                doc = tableGen.row(doc,a,b,10,pY+=ca,gray,black,OnlyBorder,columnsQt,fields);
                doc = tableGen.cell(doc,ca,tableW,10,pY+=a,white,black,OnlyBorder,date); 
                doc = tableGen.row(doc,a,b,10,pY+=ca,gray,black,OnlyBorder,columnsQt,fields);
                doc = tableGen.row(doc,a,b,10,pY+=a,gray,black,OnlyBorder,columnsQt,fields);
                doc = tableGen.row(doc,a,b,10,pY+=a,gray,black,OnlyBorder,columnsQt,fields);
                doc = tableGen.row(doc,a,b,10,pY+=a,gray,black,OnlyBorder,columnsQt,fields);
                doc = tableGen.row(doc,a,b,10,pY+=a,gray,black,OnlyBorder,columnsQt,fields);
                doc = tableGen.row(doc,a,b,10,pY+=a,gray,black,OnlyBorder,columnsQt,fields);
            
            
            
                doc = tableGen.cell(doc,ca,tableW,10,pY+=ca,white,black,OnlyBorder,leagueName); 
                doc = tableGen.row(doc,a,b,10,pY+=ca,gray,black,OnlyBorder,columnsQt,fields);
                doc = tableGen.cell(doc,ca,tableW,10,pY+=a,white,black,OnlyBorder,date); 
                doc = tableGen.row(doc,a,b,10,pY+=ca,gray,black,OnlyBorder,columnsQt,fields);
                doc = tableGen.row(doc,a,b,10,pY+=a,gray,black,OnlyBorder,columnsQt,fields);
                doc = tableGen.row(doc,a,b,10,pY+=a,gray,black,OnlyBorder,columnsQt,fields);
                doc = tableGen.row(doc,a,b,10,pY+=a,gray,black,OnlyBorder,columnsQt,fields);
                doc = tableGen.row(doc,a,b,10,pY+=a,gray,black,OnlyBorder,columnsQt,fields);
                doc = tableGen.row(doc,a,b,10,pY+=a,gray,black,OnlyBorder,columnsQt,fields);
                
                
                if (i < testQt ){
                   doc.addPage();
                }
         }; 
        
        return doc;
    };
    
    
}