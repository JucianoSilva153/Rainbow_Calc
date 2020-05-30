

//Load external scripts.
app.LoadScript( "Home.js" );
app.LoadScript( "About.js" );
app.LoadScript( "Utils.js" );

//Init some global variables.
var appPath = "/sdcard/MyApp";
var curMenu = "Home";
var curPage = null;
var LayChange = false;

var TotCopia
var TotImpressao
var Total
var TotAluno
//Called when application is started.
function OnStart()
{    
    //Lock screen orientation to Portrait.
    app.SetOrientation( "Portrait" );
    
    //Create and set a 'material style' theme.
    CreateTheme();
    
    //Create a local storage folder.
    app.MakeFolder( appPath );
    
	//Create the main app layout with objects vertically centered.
	layMain = app.CreateLayout( "Linear", "FillXY" );
	layMain.SetBackColor( "#ffffff" );
	
	
	CreateActionBar();
  	CreatePageContainer();
	CreateDrawer();
	
	
	//Create page/dialog objects.
    home = curPage = new Home( appPath, layContent );
    about = new About();


	//Add main layout and drawer to app.	
	app.AddLayout( layMain );
	app.AddDrawer( drawerScroll, "Left", drawerWidth );
	
	//List files on menu and show home page.


	home.Show( true, "Home" );
	
	
	
	Calc();
	Resul();
	  //Create main controls and menus.
	
	
	//Detect keyboard showing.
    app.SetOnShowKeyboard( app_OnShowKeyBoard );
    
    //Prevent back key closing the app.
    app.EnableBackKey( false );
}

//Create area for showing page content.
function CreatePageContainer()
{
    layContent = app.CreateLayout( "Frame", "VCenter,FillXY" );
    layContent.SetSize( 1, 0.95 );
   
    layMain.AddChild( layContent );
}
   
//Swap the page content.
function ChangePage( page, title, force )
{ 
    //Check for changes.
    if( !force && curPage.IsChanged() )
    {
        var yesNoSave = app.CreateYesNoDialog( "Discard Changes?" );
	    yesNoSave.SetOnTouch( function(ret){if(ret=="Yes") ChangePage(page,title,true)} );
	    yesNoSave.Show();
        return;
    }
    
    //Fade out current content.
    if( home.IsVisible() ) home.Show( false );
    if( file.IsVisible() ) file.Show( false );
    
    //Fade in new content.
    page.Show( true, title );
    
    //Highlight the chosen menu item in the appropriate list.
    if( curMenuList==lstMenuMain ) lstMenuFiles.SelectItemByIndex(-1);
    else lstMenuMain.SelectItemByIndex(-1);
    curMenuList.SelectItem( title );
    
    //Set title and store current page.
    txtBarTitle.SetText( title );
    curMenu = title;
    curPage = page;
}

//Called when back button is pressed.
function OnBack()
{
  
        var yesNo = app.CreateYesNoDialog( "Fechar?" );
    	yesNo.SetOnTouch( function(result){ if(result=="Yes") app.Exit()} );
    	yesNo.Show();
    
}

//Called when harware menu key pressed.
function OnMenu( name )
{  
   app.OpenDrawer();
}

//Handle soft-keyboard show and hide.
//(Re-size/adjust controls here if required)
function app_OnShowKeyBoard( shown )
{
}

//Create a theme for all controls and dialogs.
function CreateTheme()
{
    theme = app.CreateTheme( "Light" );
    theme.AdjustColor( 35, 0, -10 );
    theme.SetBackColor( "#363b3f" );
    theme.SetBtnTextColor( "#59524c" );
    theme.SetButtonOptions( "custom" );
    theme.SetButtonStyle( "#9ea476","#9ea476",5,"#999999",0,1,"#ff9000" );
    theme.SetCheckBoxOptions( "dark" );
    theme.SetTextEditOptions( "underline" );
    theme.SetDialogColor( "#59524c" );
    theme.SetDialogBtnColor( "#9ea476" );
    theme.SetDialogBtnTxtColor( "#ff666666" );
    theme.SetTitleHeight( 42 );
    theme.SetTitleColor( "#ff888888" ); 
    theme.SetTitleDividerColor( "#ff0099CC" );
    theme.SetTextColor( "#000000" );
    app.SetTheme( theme );
}

//Create an action bar at the top.

function CreateActionBar()
{
    //Create horizontal layout for top bar.
    var layHoriz = app.CreateLayout( "linear", "Horizontal,FillX,Left" );
    layHoriz.SetBackColor( "#aa9d88" );
    layMain.AddChild( layHoriz );
    
    //Create menu (hamburger) icon .
    var txtMenu = app.CreateText( "[fa-bars]", -1,-1, "FontAwesome" );
    txtMenu.SetPadding( 12,10,12,10, "dip" );
    txtMenu.SetTextSize( 28 );
    txtMenu.SetTextColor( "#59524c" );
    txtMenu.SetOnTouchUp( function(){app.OpenDrawer()} );
    layHoriz.AddChild( txtMenu );
    
    //Create layout for title box.
    var layBarTitle = app.CreateLayout( "Linear", "Horizontal" );
    layBarTitle.SetSize( 0.73 );
    layHoriz.AddChild( layBarTitle );
    
    //Create title.
    txtBarTitle = app.CreateText( "Calculadora Normal", -1,-1, "Left" );
    txtBarTitle.SetMargins(0,10,0,0,"dip");
    txtBarTitle.SetTextSize( 22 );
    txtBarTitle.SetTextColor( "#59524c" );
    layBarTitle.AddChild( txtBarTitle );
    
    /*    
    //Create search icon.
    txtSearch = app.CreateText( "[fa-search]", -1,-1, "FontAwesome" );
    txtSearch.SetPadding( 12,2,12,10, "dip" );
    txtSearch.SetTextSize( 24 );
    txtSearch.SetTextColor( "#eeeeee" );
    txtSearch.SetOnTouchUp( function(){app.ShowPopup("Todo!")} );
    layHoriz.AddChild( txtSearch );
    */
}


//Quando o Menu é aberto...
function OnDrawer( side, state )
{
    console.log( side + " : " + state );
}

//MENU
function CreateDrawer()
{
    //Create a layout for the drawer.
	//(Here we also put it inside a scroller to allow for long menus)
	//Aqui temos o menu!!!!!!!!!!!!!!!!!!!!!
	drawerWidth = 0.75;
    drawerScroll = app.CreateScroller( drawerWidth, 1 );
    drawerScroll.SetBackColor( "#59524c" );
	layDrawer = app.CreateLayout( "Linear", "Left" );
	drawerScroll.AddChild( layDrawer );
	
	//Create layout for top of drawer.
	layDrawerTop = app.CreateLayout( "Linear", "VCenter" );
	layDrawerTop.SetBackColor( "#aa9d88" );
	layDrawerTop.SetSize( drawerWidth );
	layDrawer.AddChild( layDrawerTop );
	
	//Add an icon to top layout.
	var img = app.CreateImage( "Img/Rainbow Calc.png", 0.15 );
	img.SetMargins( 0.02,0.02,0.02,0.01 );
	layDrawerTop.AddChild( img );
	
	//Add app name to top layout.
	var txtName = app.CreateText( "Rainbow Calc",-1,-1,"Bold");
	txtName.SetMargins( 0.04,0.01,0.02,0.02 );
	txtName.SetTextColor( "#59524c" );
	txtName.SetTextSize( 14 );
	layDrawerTop.AddChild( txtName );
	
	//Create menu layout.
	var layMenu = app.CreateLayout( "Linear", "Left" );
	layDrawer.AddChild( layMenu );
	
    //Add a list to menu layout (with the menu style option).
    var listItems = "Cálculo Normal::[fa-calculator],Cálculo Escolar::[fa-calculator],Resultados::[fa-check],Sobre::[fa-question-circle]";
    lstMenuMain = app.CreateList( listItems, drawerWidth, -1, "Menu,Expand" );
    lstMenuMain.SetColumnWidths( -1, 0.35, 0.18 );
    lstMenuMain.SelectItemByIndex( 0, true );
    lstMenuMain.SetItemByIndex( 0, "Cálculo Normal" );
    lstMenuMain.SetOnTouch( lstMenu_OnTouch );
    layMenu.AddChild( lstMenuMain );
    curMenuList = lstMenuMain;
    
    //Add seperator to menu layout.
    var sep = app.CreateImage( null, drawerWidth,0.001,"fix", 2,2 );
    sep.SetSize( -1, 1, "px" );
    sep.SetColor( "#cccccc" );
    layMenu.AddChild( sep );
   
	
    //Add a second list to menu layout.
    lstMenuFiles = app.CreateList( "", drawerWidth,-1, "Menu,Expand" );
    lstMenuFiles.SetColumnWidths( -1, 0.35, 0.18 );
    lstMenuFiles.SetIconSize( 24, "dip" );
    lstMenuFiles.SetOnTouch( lstMenu_OnTouch );
    lstMenuFiles.SetOnLongTouch( lstMenu_OnLongTouch );
    layMenu.AddChild( lstMenuFiles );
}

//Handle menu item selection.
function lstMenu_OnTouch( title, body, type, index )
{
    
    if( title=="Sobre" ) {
        about.Show();
        app.CloseDrawer( "Left" );
        return;
    }
    
    if(title == "Cálculo Escolar"){
    
    
    
    home.Show(false, "Home");
    layCalc.Show();
    layResul.SetVisibility("Hide");
    txtBarTitle.SetText("Cálculo Escolar");
        
    }else if( title == "Cálculo Normal" ){
    home.Show(true, "Home");
    layCalc.SetVisibility("Hide"); 
    layResul.SetVisibility("Hide");
    txtBarTitle.SetText("Cálculo Normal");
    }else if(title == "Resultados"){
     home.Show(false, "Home");
     layCalc.SetVisibility("Hide");
     layResul.Show();
     txtBarTitle.SetText("Resultados de Cálculo");
    }
  
  app.CloseDrawer( "Left" );

}

//Handle menu long press.
function lstMenu_OnLongTouch( title, body, type, index )
{
    curMenuList = this;
    curMenu = title;
    
    
    //Show options dialog.
    var sOps = "Rename,Delete" 
    lstOps = app.CreateListDialog( "Actions", sOps, "AutoCancel" );
    lstOps.SetOnTouch( lstOps_Select ); 
    lstOps.Show();
}

//Handle menu item selection.
function lstOps_Select( item )
{
    if( item=="Delete" ) 
    {
        var msg = "Are you sure you want to delete '" + curMenu + "' ?"
        yesNo = app.CreateYesNoDialog( msg );
        yesNo.SetOnTouch( yesNoDelete_OnTouch );
        yesNo.Show();
    }
    else if( item=="Rename" ) {
        app.ShowTextDialog( "Rename Program", curMenu, OnRename );
    }
}

//Handle delete 'are you sure' dialog.
function yesNoDelete_OnTouch( result )
{
    if( result=="Yes" ) 
    {
        //Delete the file and refresh list.
        app.DeleteFolder( appPath+"/" + curMenu );
        ShowFiles();
        ChangePage( home, "Home" );
    }
}

//Called after user enters renamed program.
function OnRename( name )
{
    //Check up name.
	if( !isValidFileName(name) ) {
		alert( "Name contains invalid characters!" );
		app.ShowTextDialog( "Rename Program", curMenu, "OnRename" );
		return;
	}
	
    //Check if already exists.
    var fldr = appPath+"/"+name;
    if( app.FolderExists( fldr ) ) {
        app.Alert( "App already exists!" );
    }
    else {
        //Rename the .json data file.
        var oldfile = appPath+"/"+curMenu+"/"+curMenu+".json";
        var newfile = appPath+"/"+curMenu +"/"+name+".json";
        if( app.FileExists( oldfile ) ) app.RenameFile( oldfile, newfile );
        
        //Rename folder and refresh list.
        app.RenameFile( appPath+"/"+curMenu, appPath+"/"+name );
        ShowFiles();
        ChangePage( file, name );
    }
}


function Calc()
{
    
 	//Create a layout with objects vertically centered.
    layCalc = app.CreateLayout( "linear", "VCenter, FillXY" );	
    layCalc.SetBackColor("#59524c");
    
  
    
    BotaoCalc = app.CreateButton("[fa-check] Calcular", 0.7, 0.3, "FontAwesome");
    BotaoCalc.SetTextSize(22);
    BotaoCalc.SetTextColor("#59524c");
    BotaoCalc.SetOnTouch( Calculando_OnTouch);
    layCalc.AddChild(BotaoCalc);
    

    var txtIntegrantes = app.CreateTextEdit("",0.8, 0.06, "numbers,Center" );
    txtIntegrantes.SetHint("Integrantes");
    txtIntegrantes.SetBackColor("#c7a589");
    txtIntegrantes.SetTextColor("#e14d43");
    txtIntegrantes.SetMargins(0,0,0,0.02);
    txtIntegrantes.SetPadding(0,0,0);
    layCalc.AddChild(txtIntegrantes);
    
    var txtCopiaFolha = app.CreateTextEdit("", 0.8, 0.06, "numbers, Center");
    txtCopiaFolha.SetHint("Cópia p/ Folha");
    txtCopiaFolha.SetBackColor("#c7a589");
    txtCopiaFolha.SetTextColor("#e14d43");
    txtCopiaFolha.SetMargins(0,0,0,0.02);
    layCalc.AddChild(txtCopiaFolha);
    
    var txtEncardenacao = app.CreateTextEdit("", 0.8, 0.06, "numbers, Center");
    txtEncardenacao.SetHint("Valor Encardenação");
    txtEncardenacao.SetBackColor("#c7a589");
    txtEncardenacao.SetTextColor("#e14d43");    
    txtEncardenacao.SetMargins(0,0,0,0.02);
    layCalc.AddChild(txtEncardenacao);
    
    var txtTotalPagina = app.CreateTextEdit("", 0.8, 0.06, "numbers, Center");
    txtTotalPagina.SetHint("Nº de páginas");
    txtTotalPagina.SetBackColor("#c7a589");
    txtTotalPagina.SetTextColor("#e14d43");    
    txtTotalPagina.SetMargins(0,0,0,0.02);
    layCalc.AddChild(txtTotalPagina);
    
    var txtImpressao = app.CreateTextEdit("", 0.8, 0.06, "numbers, Center");
    txtImpressao.SetHint("Valor Impressão");
    txtImpressao.SetBackColor("#c7a589");
    txtImpressao.SetTextColor("#e14d43");    
    txtImpressao.SetMargins(0,0,0,0.02);
    layCalc.AddChild(txtImpressao);
    
    var txtImpressaoCapa = app.CreateTextEdit("", 0.8, 0.06, "numbers, Center");
    txtImpressaoCapa.SetHint("Impressão da capa");
    txtImpressaoCapa.SetBackColor("#c7a589");
    txtImpressaoCapa.SetTextColor("#e14d43");    
    txtImpressaoCapa.SetMargins(0,0,0,0.02);
    layCalc.AddChild(txtImpressaoCapa);

layCalc.SetVisibility("Hide");

	//Add layout to app.	
	layContent.AddChild( layCalc );

function Calculando_OnTouch(){
    
    var Integrantes = txtIntegrantes.GetText();
    var CopiaFolha = txtCopiaFolha.GetText();
    var Encardenacao = txtEncardenacao.GetText();
    var TotalPagina = txtTotalPagina.GetText();
    var Impressao = txtImpressao.GetText();
    var ImpressaoCapa = txtImpressaoCapa.GetText();
    
    
 
    if (Integrantes == "" || CopiaFolha == "" || Encardenacao == "" || TotalPagina == "" || Impressao == "" || ImpressaoCapa == ""){
     
       app.Alert("Preencha Todos Os Campos", "Erro");
       
     
    }else{
        
    app.ShowProgressBar( "Calculando...", 0 );
    for(i = 0; i <= 100; i++){
     app.UpdateProgressBar(i);
    }
    app.HideProgressBar();
    app.ShowPopup("Cálculo Efetuado, Vá para a aba de Resultados","Bottom,Short");
    
    TotCopia = eval(eval(CopiaFolha * TotalPagina) * (Integrantes));
    TotImpressao = eval( eval(Impressao * TotalPagina) + eval(ImpressaoCapa));
    Total = eval(eval(TotCopia + TotImpressao) + eval(Encardenacao));
    TotAluno = eval(Total / Integrantes);

    ResulImpressaoCapa.SetText("Impressão Capa: " + ImpressaoCapa + "KZ");
    ResulTotalPagina.SetText("Páginas do Trabalho: " + TotalPagina);
    ResulEncardenacao.SetText("Encardenação: " + Encardenacao + "KZ");
    ResulIntegrantes.SetText("Cada Integrante pagará: " + TotAluno + "KZ");
    ResulCopiaFolha.SetText("O valor das copias é: " + TotCopia + "KZ");
    ResulImpressao.SetText("O valor da Impressão: " + TotImpressao + "KZ");
        
    }
    
  
 }

    




}




function randomNumber(max){ 
    
    Math.floor(Math.random() * (max + 1));
 
 return max;
}

//Hide the progress bar.
function Hide()
{
    app.HideProgressBar();
}




function Resul(){
 
 layResul = app.CreateLayout("linear","VCenter,FillXY");
 layResul.SetBackColor("#59524c");
 
 layResul2 = app.CreateLayout("linear","VCenter");
 layResul2.SetBackColor("#c7a589");
 layResul2.SetMargins(0,0,0,0.05);
 layResul.AddChild(layResul2);

 
    ResulIntegrantes = app.CreateTextEdit("",0.8, 0.09, "Center, ReadOnly, NoKeyboard" );
    ResulIntegrantes.SetHint("Sem Resultado");
    ResulIntegrantes.SetBackColor("#c7a589");
    ResulIntegrantes.SetTextColor("#e14d43");
    ResulIntegrantes.SetMargins(0,0,0,0.02);
    ResulIntegrantes.SetPadding(0,0,0);
    layResul.AddChild(ResulIntegrantes);

    ResulCopiaFolha = app.CreateTextEdit("", 0.8, 0.09, "Center, ReadOnly, NoKeyboard");
    ResulCopiaFolha.SetHint("Sem Resultado");
    ResulCopiaFolha.SetBackColor("#c7a589");
    ResulCopiaFolha.SetTextColor("#e14d43");
    ResulCopiaFolha.SetMargins(0,0,0,0.02);
    layResul.AddChild(ResulCopiaFolha);
    
    ResulEncardenacao = app.CreateTextEdit("", 0.5, 0.09, "Center, ReadOnly, NoKeyboard");
    ResulEncardenacao.SetHint("Sem Resultado");
    ResulEncardenacao.SetBackColor("#59524c");
    ResulEncardenacao.SetTextColor("#69a8bb");    
    ResulEncardenacao.SetMargins(0.05,0.02,0.05,0.02);
    layResul2.AddChild(ResulEncardenacao);
    
   ResulTotalPagina = app.CreateTextEdit("", 0.5, 0.09, "Center, ReadOnly, NoKeyboard");
   ResulTotalPagina.SetHint("Sem resultado");
   ResulTotalPagina.SetBackColor("#59524c");
   ResulTotalPagina.SetTextColor("#e14d43");    
   ResulTotalPagina.SetMargins(0,0,0,0.02);
   layResul2.AddChild(ResulTotalPagina);
    
    ResulImpressao = app.CreateTextEdit("", 0.8, 0.09, "Center, ReadOnly, NoKeyboard");
    ResulImpressao.SetHint("Sem Resultado");
    ResulImpressao.SetBackColor("#c7a589");
    ResulImpressao.SetTextColor("#e14d43");    
    ResulImpressao.SetMargins(0,0,0,0.02);
    layResul.AddChild(ResulImpressao);
    
   ResulImpressaoCapa = app.CreateTextEdit("", 0.5, 0.09, "Center, ReadOnly, NoKeyboard");
   ResulImpressaoCapa.SetHint("Sem Resultado");
   ResulImpressaoCapa.SetBackColor("#59524c");
   ResulImpressaoCapa.SetTextColor("#69a8bb");    
   ResulImpressaoCapa.SetMargins(0,0,0,0.02);
   layResul2.AddChild(ResulImpressaoCapa);
    
      LayButton = app.CreateLayout("linear" ,"Horizontal, VCenter, ReadOnly, NoKeyboard");
      ResulButton = app.CreateButton("[fa-check] OK", null,null, "FontAwesome");
      ResulButton.SetTextColor("#59524c");
      ResulButton.SetOnTouch(btnOK_OnTouch)
      LayButton.AddChild(ResulButton);
    
    
 
 layResul.SetVisibility("Hide");
 layContent.AddChild(layResul);
 layResul.AddChild(LayButton);
    
}

function btnOK_OnTouch(){
    home.Show(false, "Home");
    layCalc.Show();
    layResul.SetVisibility("Hide");
    txtBarTitle.SetText("Cálculo Escolar");   
}