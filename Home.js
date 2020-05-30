"use strict"

var display = "";
//Create a Home object.
function Home( path, layContent )
{
    //Get page states.
    this.IsVisible = function() { return lay.IsVisible() }
    this.IsChanged = function() { return false }
    
    //Show or hide this page.
    this.Show = function( show )
    {
        if( show ) lay.Animate("FadeIn");
        else lay.Animate( "FadeOut" );
    }
    
    //Create layout for app controls.
    var lay = app.CreateLayout( "Linear", "FillXY" );
    lay.SetBackColor("#59524c");
    layContent.AddChild( lay );
    
    //Add a logo.
    
    var Chave = [7,8,9,"/",4,5,6,"*",1,2,3,"-",0,".","C","+"];
    
    
    //Criando o Display
    var txtDisplay = app.CreateText("", 0.8, 0.1);
    txtDisplay.SetTextSize(42);
    txtDisplay.SetBackColor("#c7a589");
    txtDisplay.SetMargins(0, 0.1, 0, 0.05);
    lay.AddChild(txtDisplay);
    
    
    var linhaBotao1 = app.CreateLayout("linear", "Horizontal");
    for( var b=0; b<4; b++) AddBotao( linhaBotao1, Chave[b] );
    lay.AddChild( linhaBotao1 );
    
    var linhaBotao2 = app.CreateLayout("linear", "Horizontal");
    for(var b=4; b<8;b++) AddBotao(linhaBotao2, Chave[b]);
    lay.AddChild(linhaBotao2);
    
    var linhaBotao3 = app.CreateLayout("linear", "Horizontal");
    for(var b=8; b<12;b++) AddBotao(linhaBotao3, Chave[b]);
    lay.AddChild(linhaBotao3);
    
    var linhaBotao4 = app.CreateLayout("linear", "Horizontal");
    for(var b=12; b<16;b++) AddBotao(linhaBotao4, Chave[b]);
    lay.AddChild(linhaBotao4);
    
    var linhaBotao5 = app.CreateLayout("linear", "Horizontal");
    AddBotao(linhaBotao5, "=")
    lay.AddChild(linhaBotao5);
    
    
    //===============================================================
       
 function AddBotao(linha, nome){                                    //|
 
 if( nome == "=" || nome == "Apagar") var w = 0.8; else w=0.2;
 
 var Botao = app.CreateButton(nome, w, 0.1);
 Botao.SetOnTouch( BotoesToque_OnTouch );
 linha.AddChild( Botao );
}

function BotoesToque_OnTouch(){
    
 app.Vibrate("0,100");
    
   var Botao = this;
   var txt = Botao.GetText();



    //Calculando
   if(txt == "=") ResulCalc();
    
    //Limpando o Display
    else if(txt == "C") display = "";
    
    //Apagando Numero
    else if(txt == "Apagar")  ;

    //Recebendo outros botões
    else display += txt;
    
    
    
    //Atualizando o o Display
    txtDisplay.SetText(display);
    
    
}

function ResulCalc(){
    
    try{
     //Fazendo o calculo do que estiver no display(e vendo erros)
     display = eval( display ).toFixed(2);
    }catch(e){ display = "Erro"}
    
}
    //===============================================================
}




