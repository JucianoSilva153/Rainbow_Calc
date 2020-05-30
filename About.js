"use strict"

function About()
{
    //Show about dialog.
    this.Show = function()
    {
        dlgPub.Show();
    }

    //Handle contact via email button.
    this.btnContact_OnTouch = function()
    {
         app.SendMail( "jucianodasilvasilvaa@gmail.com");
    }
    
    //Create dialog window.
    var dlgPub = app.CreateDialog( "Sobre o Rainbow Calc" );
    dlgPub.SetBackColor("#9ea476");
    dlgPub.SetTitleColor("#59524c");
    var layPub = app.CreateLayout( "linear", "vertical,fillxy" );
    layPub.SetPadding( 0.05, 0.05, 0.05, 0 );
    layPub.SetBackColor("#59524c");
    
    var layImg = app.CreateLayout("linear", "Horizontal, VCenter, FillXY");
    layPub.AddChild(layImg)
    //Add an icon to top layout.
    var img = app.CreateImage( "Img/1.png", 0.2 );
    img.SetPosition( drawerWidth*0.06, 0.04 );
    layImg.AddChild( img );
    
    var img = app.CreateImage( "Img/Rainbow Calc.png", 0.2 );
    img.SetPosition( drawerWidth*0.06, 0.04 );
    layImg.AddChild( img );
    
    //Create a text with formatting.
    var text = "<p>Rainbow Calc Versão Mobile(1.0)<br>" + 
        "Calculadora de Trabalhos escolares <br></p>" + 
        "<p> [fa-facebook] <font color=#3a58df> <a href=http://www.facebook.com/projectosj>Facebook | Projectos J</a> <br><br></p>" + 
        "<p>[fa-youtube] <font color=#e14d43> <a href=http://youtube.com> Youtube | Nerds By Juciano Silva</a></p>";
    var txt = app.CreateText( text, 0.8, -1, "Html,Link, FontAwesome" );
    txt.SetPadding( 0.03, 0.03, 0.03, 0 );
    txt.SetTextSize( 18 );
    txt.SetTextColor( "#c7a589" );
    layPub.AddChild( txt );
    
    
    //Add dialog layout and show dialog.
    dlgPub.AddLayout( layPub );
}


